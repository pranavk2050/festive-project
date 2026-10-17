// Three.js views of the sky at one instant:
//   helio — the solar system from outside, with sight-lines from Earth to the sidereal zodiac
//   geo   — Bhachakra: Earth-centred zodiac wheel with rashis, nakshatras and the tithi angle
//   sky   — what an observer at the chosen place actually sees above the horizon
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { Graha, Ms } from '../astro/ephemeris.ts';
import { makeObserver, norm360 } from '../astro/ephemeris.ts';
import { type SkyState, orbitPath, horizonProjector } from './sky.ts';
import { RASHI_SYMBOLS, NAK } from '../panchang/constants.ts';
import { nm, t as tr, lang } from '../i18n.ts';
import { STARS, SAPTARISHI_LINES } from '../data/stars.ts';
import type { Place } from '../data/locations.ts';

export type ViewMode = 'helio' | 'geo' | 'sky';

const D2R = Math.PI / 180;
const GLYPH: Record<Graha, string> = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂', Jupiter: '♃', Saturn: '♄', Rahu: '☊', Ketu: '☋',
};
export const GRAHA_COLOR: Record<Graha | 'Earth', number> = {
  Sun: 0xffc53d, Moon: 0xe6e8f0, Mercury: 0xb4a89a, Venus: 0xf3e1b4, Mars: 0xe0603a, Jupiter: 0xd9b48a,
  Saturn: 0xe8d18f, Rahu: 0x7a6cff, Ketu: 0xb06cff, Earth: 0x4a90e2,
};

/** ecliptic (x toward ♈, y, z toward N pole) → three.js (x, up = ecliptic north, -z) */
const ecl = (x: number, y: number, z: number) => new THREE.Vector3(x, z, -y);
const eclLon = (lonDeg: number, r: number, h = 0) => new THREE.Vector3(r * Math.cos(lonDeg * D2R), h, -r * Math.sin(lonDeg * D2R));
/** horizon alt/az → three.js with north = -z, east = +x, up = +y */
const horiz = (alt: number, az: number, r: number) =>
  new THREE.Vector3(r * Math.cos(alt * D2R) * Math.sin(az * D2R), r * Math.sin(alt * D2R), -r * Math.cos(alt * D2R) * Math.cos(az * D2R));

/** Static labels whose text depends on the UI language; re-rendered by SkyScene.refreshLanguage(). */
const localized: { el: HTMLElement; text: () => string }[] = [];

function label(text: string | (() => string), cls = ''): CSS2DObject {
  const el = document.createElement('div');
  el.className = `lbl ${cls}`;
  if (typeof text === 'function') {
    localized.push({ el, text });
    el.innerHTML = text();
  } else el.innerHTML = text;
  return new CSS2DObject(el);
}

function glowTexture(inner: string, outer: string): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.25, inner);
  grd.addColorStop(1, outer);
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function bandTexture(colors: string[]): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 64;
  const g = c.getContext('2d')!;
  for (let i = 0; i < 64; i++) {
    g.fillStyle = colors[Math.floor((Math.sin(i * 0.9) * 0.5 + 0.5) * colors.length) % colors.length];
    g.fillRect(0, i, 4, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function planetMaterial(g: Graha | 'Earth'): THREE.Material {
  if (g === 'Jupiter') return new THREE.MeshStandardMaterial({ map: bandTexture(['#d9b48a', '#b98c5e', '#efe0c8', '#c9a27a']), roughness: 0.9 });
  if (g === 'Saturn') return new THREE.MeshStandardMaterial({ map: bandTexture(['#e8d18f', '#d6b973', '#f1e3b6']), roughness: 0.9 });
  if (g === 'Earth') return new THREE.MeshStandardMaterial({ color: GRAHA_COLOR.Earth, emissive: 0x0a2350, roughness: 0.7 });
  return new THREE.MeshStandardMaterial({ color: GRAHA_COLOR[g], roughness: 0.85 });
}

function circleLine(r: number, color: number, opacity = 0.35, segments = 256, dashed = false): THREE.Line {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) pts.push(eclLon((i / segments) * 360, r));
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = dashed
    ? new THREE.LineDashedMaterial({ color, transparent: true, opacity, dashSize: 0.3, gapSize: 0.2 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  const l = new THREE.Line(geo, mat);
  if (dashed) l.computeLineDistances();
  return l;
}

/** Flat annulus sector in the ecliptic plane from lon a to lon b (degrees). */
function sector(r0: number, r1: number, a: number, len: number, color: number, opacity: number): THREE.Mesh {
  const geo = new THREE.RingGeometry(r0, r1, Math.max(8, Math.ceil(len / 2)), 1, a * D2R, len * D2R);
  geo.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false }));
  return m;
}

function starfield(n: number, r: number): THREE.Points {
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1;
    const th = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    pos.set([r * s * Math.cos(th), r * u, r * s * Math.sin(th)], i * 3);
    const b = 0.4 + Math.random() * 0.6;
    col.set([b, b, b * (0.9 + Math.random() * 0.2)], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 1.2, sizeAttenuation: false, vertexColors: true }));
}

const fmtDeg = (d: number) => {
  const x = norm360(d) % 30;
  const deg = Math.floor(x);
  const min = Math.floor((x - deg) * 60);
  return `${deg}°${String(min).padStart(2, '0')}′`;
};

interface View {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  update(s: SkyState): void;
}

export interface SceneOptions {
  labels: boolean;
  nakshatras: boolean;
  sightlines: boolean;
  ground: boolean;
}

export class SkyScene {
  private renderer: THREE.WebGLRenderer;
  private labels: CSS2DRenderer;
  private controls: OrbitControls;
  private views: Record<ViewMode, View>;
  private mode: ViewMode = 'geo';
  private place: Place;
  private state: SkyState | null = null;
  opts: SceneOptions = { labels: true, nakshatras: true, sightlines: true, ground: true };
  // sky-view look direction
  private yaw = 180;
  private pitch = 20;
  private fov = 70;
  private skyFocus: Graha | null = null;
  /** keep the focused graha centred while time animates */
  followFocus = false;

  constructor(private host: HTMLElement, place: Place) {
    this.place = place;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(this.renderer.domElement);
    this.labels = new CSS2DRenderer();
    this.labels.domElement.className = 'label-layer';
    host.appendChild(this.labels.domElement);

    this.views = { helio: this.buildHelio(), geo: this.buildGeo(), sky: this.buildSky() };
    this.controls = new OrbitControls(this.views.geo.camera, this.labels.domElement);
    this.controls.enableDamping = true;
    this.installSkyLook();
    new ResizeObserver(() => this.resize()).observe(host);
    this.resize();
    this.setView('geo');
    const loop = () => {
      requestAnimationFrame(loop);
      if (this.mode !== 'sky') this.controls.update();
      this.render();
    };
    loop();
  }

  setPlace(p: Place) {
    this.place = p;
    if (this.state) this.update(this.state);
  }

  setView(m: ViewMode) {
    for (const [k, v] of Object.entries(this.views)) {
      if (k !== m) v.scene.traverse((o) => { if (o instanceof CSS2DObject) o.element.style.display = 'none'; });
    }
    this.mode = m;
    const v = this.views[m];
    this.controls.object = v.camera;
    this.controls.enabled = m !== 'sky';
    this.controls.target.set(0, 0, 0);
    this.resize();
    if (this.state) v.update(this.state);
  }

  get view() {
    return this.mode;
  }

  /** Re-render every language-dependent label after the UI language changes. */
  refreshLanguage() {
    for (const l of localized) l.el.innerHTML = l.text();
    if (this.state) this.update(this.state);
  }

  setOptions(o: Partial<SceneOptions>) {
    Object.assign(this.opts, o);
    this.host.classList.toggle('no-labels', !this.opts.labels);
    this.host.classList.toggle('no-nak', !this.opts.nakshatras);
    if (this.state) this.update(this.state);
  }

  update(s: SkyState) {
    this.state = s;
    this.views[this.mode].update(s);
  }

  /** Camera presets for helio/geo; for sky view, point at a graha. */
  preset(p: 'top' | 'side' | 'tilt') {
    const cam = this.views[this.mode].camera;
    const d = this.mode === 'helio' ? 55 : 26;
    if (p === 'top') cam.position.set(0, d, 0.001);
    if (p === 'side') cam.position.set(0, 1.5, d);
    if (p === 'tilt') cam.position.set(d * 0.55, d * 0.6, d * 0.6);
    cam.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
  }

  lookAt(g: Graha | null) {
    this.skyFocus = g;
    if (g && this.state) {
      const st = this.state.grahas[g];
      this.yaw = st.az;
      this.pitch = Math.max(8, Math.min(60, st.alt + 5));
    }
    this.applySkyCamera();
  }

  private installSkyLook() {
    const el = this.labels.domElement;
    let drag: { x: number; y: number } | null = null;
    el.addEventListener('pointerdown', (e) => {
      if (this.mode !== 'sky') return;
      drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      if (!drag || this.mode !== 'sky') return;
      const k = this.fov / this.host.clientHeight;
      this.yaw = norm360(this.yaw - (e.clientX - drag.x) * k);
      this.pitch = Math.max(-30, Math.min(89, this.pitch + (e.clientY - drag.y) * k));
      drag = { x: e.clientX, y: e.clientY };
      this.applySkyCamera();
    });
    el.addEventListener('pointerup', () => (drag = null));
    el.addEventListener('wheel', (e) => {
      if (this.mode !== 'sky') return;
      e.preventDefault();
      this.fov = Math.max(15, Math.min(110, this.fov * (e.deltaY > 0 ? 1.08 : 0.93)));
      this.applySkyCamera();
    }, { passive: false });
  }

  private applySkyCamera() {
    const cam = this.views.sky.camera;
    cam.fov = this.fov;
    cam.updateProjectionMatrix();
    cam.position.set(0, 0, 0);
    cam.lookAt(horiz(this.pitch, this.yaw, 10));
  }

  private resize() {
    const w = this.host.clientWidth;
    const h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.labels.setSize(w, h);
    for (const v of Object.values(this.views)) {
      v.camera.aspect = w / h;
      v.camera.updateProjectionMatrix();
    }
  }

  private render() {
    const v = this.views[this.mode];
    this.renderer.render(v.scene, v.camera);
    this.labels.render(v.scene, v.camera);
  }

  // ── Zodiac rings shared by helio & geo views ─────────────────────────
  private zodiac(parent: THREE.Object3D, r0: number, r1: number, nak0: number, nak1: number) {
    const ring = new THREE.Group();
    const rashiLabels: CSS2DObject[] = [];
    for (let i = 0; i < 12; i++) {
      ring.add(sector(r0, r1, i * 30, 30, i % 2 ? 0x2a2150 : 0x3b2a63, 0.55));
      const b = new THREE.Line(new THREE.BufferGeometry().setFromPoints([eclLon(i * 30, r0), eclLon(i * 30, r1)]),
        new THREE.LineBasicMaterial({ color: 0xffc36b, transparent: true, opacity: 0.6 }));
      ring.add(b);
      const l = label(() => `<b>${RASHI_SYMBOLS[i]}</b> ${nm.rashi(i)}`, 'rashi');
      l.position.copy(eclLon(i * 30 + 15, (r0 + r1) / 2));
      ring.add(l);
      rashiLabels.push(l);
    }
    const nak = new THREE.Group();
    nak.userData.nak = true;
    for (let i = 0; i < 27; i++) {
      const a = (i * 360) / 27;
      nak.add(sector(nak0, nak1, a, 360 / 27, i % 2 ? 0x16233f : 0x1d2e52, 0.6));
      const l = label(() => nm.nakshatra(i), 'nak');
      l.position.copy(eclLon(a + 180 / 27, (nak0 + nak1) / 2));
      nak.add(l);
    }
    ring.add(nak);
    parent.add(ring);
    return { ring, nak, rashiLabels };
  }

  // ── Heliocentric view ────────────────────────────────────────────────
  private buildHelio(): View {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05060d);
    scene.add(starfield(2500, 400));
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.set(28, 34, 38);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    scene.add(new THREE.PointLight(0xfff2d0, 3.2, 0, 0));

    const compress = (v: [number, number, number]) => {
      const r = Math.hypot(...v);
      const k = (6 * Math.pow(r, 0.55)) / r;
      return ecl(v[0] * k, v[1] * k, v[2] * k);
    };

    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.5, 48, 24), new THREE.MeshBasicMaterial({ color: 0xffd060 }));
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,210,120,0.9)', 'rgba(255,150,40,0)'), blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.set(9, 9, 1);
    sun.add(glow);
    const sunLbl = label(() => `☉ ${nm.graha('Sun')}`, 'graha');
    sunLbl.position.set(0, 2.2, 0);
    sun.add(sunLbl);
    scene.add(sun);

    const bodies = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'] as const;
    const size: Record<string, number> = { Mercury: 0.28, Venus: 0.42, Earth: 0.45, Mars: 0.34, Jupiter: 1.05, Saturn: 0.9 };
    const meshes = {} as Record<(typeof bodies)[number], THREE.Mesh>;
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    for (const b of bodies) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(size[b], 32, 16), planetMaterial(b));
      if (b === 'Saturn') {
        const rg = new THREE.RingGeometry(1.2, 1.9, 64);
        const ringMesh = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0xd8c38c, side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
        ringMesh.rotation.x = -Math.PI / 2 + 0.47;
        m.add(ringMesh);
      }
      const l = label(() => (b === 'Earth' ? `🜨 ${nm.earth()}` : `${GLYPH[b]} ${nm.graha(b)}`), b === 'Earth' ? 'graha earth' : 'graha');
      l.position.set(0, size[b] + 0.6, 0);
      m.add(l);
      meshes[b] = m;
      scene.add(m);
    }
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 12), planetMaterial('Moon'));
    const moonLbl = label('☽', 'graha small');
    moonLbl.position.set(0, 0.4, 0);
    moon.add(moonLbl);
    scene.add(moon);

    const R0 = 27;
    const { ring } = this.zodiac(scene, R0, 29.5, 29.8, 31.3);
    let orbitsFor = -1;

    const sight = new THREE.Group();
    scene.add(sight);
    const mkSight = (color: number) => {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color, dashSize: 0.6, gapSize: 0.35, transparent: true, opacity: 0.9 }));
      const tag = label('', 'sight');
      sight.add(l, tag);
      return { l, tag };
    };
    const sSun = mkSight(0xffc53d);
    const sMoon = mkSight(0xdfe6ff);

    const setSight = (s: { l: THREE.Line; tag: CSS2DObject }, from: THREE.Vector3, dir: THREE.Vector3, text: string) => {
      // intersect ray with the zodiac circle (in the ecliptic plane)
      const d = new THREE.Vector3(dir.x, 0, dir.z).normalize();
      const f = new THREE.Vector3(from.x, 0, from.z);
      const b = f.dot(d);
      const c = f.lengthSq() - R0 * R0;
      const t = -b + Math.sqrt(b * b - c);
      const end = f.clone().addScaledVector(d, t);
      s.l.geometry.setFromPoints([from, end]);
      s.l.computeLineDistances();
      s.tag.position.copy(end.clone().multiplyScalar(0.94));
      s.tag.element.innerHTML = text;
    };

    return {
      scene,
      camera,
      update: (s) => {
        ring.rotation.y = s.ayanamsa * D2R; // sidereal 0° sits ayanamsa degrees past the equinox
        const yr = new Date(s.ms).getUTCFullYear();
        if (orbitsFor !== yr) {
          orbitsFor = yr;
          orbitGroup.clear();
          for (const b of bodies) {
            const pts = orbitPath(b, s.ms, 256).map(compress);
            orbitGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
              new THREE.LineBasicMaterial({ color: b === 'Earth' ? 0x4a90e2 : 0x8a8fb0, transparent: true, opacity: b === 'Earth' ? 0.7 : 0.3 })));
          }
        }
        for (const b of bodies) meshes[b].position.copy(compress(s.helio[b]));
        const E = meshes.Earth.position;
        const mg = s.moonGeo;
        const md = ecl(mg[0], mg[1], mg[2]).normalize();
        moon.position.copy(E).addScaledVector(md, 1.1);
        sight.visible = this.opts.sightlines;
        const sunDir = E.clone().negate();
        const G = s.grahas;
        const inR = (r: number) => (lang() === 'mr' ? `<b>${nm.rashi(r)}</b> राशीत` : `in <b>${nm.rashi(r)}</b>`);
        setSight(sSun, E, sunDir, `☉ ${inR(Math.floor(G.Sun.sid / 30))} ${fmtDeg(G.Sun.sid)}`);
        setSight(sMoon, E, md, `☽ ${inR(Math.floor(G.Moon.sid / 30))} · ${nm.nakshatra(Math.floor(G.Moon.sid / (360 / 27)))}`);
        ring.traverse((o) => { if (o.userData.nak) o.visible = this.opts.nakshatras; });
      },
    };
  }

  // ── Geocentric zodiac wheel ──────────────────────────────────────────
  private buildGeo(): View {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070814);
    scene.add(starfield(2000, 300));
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 20, 14);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const sunLight = new THREE.DirectionalLight(0xffffff, 3);
    scene.add(sunLight, sunLight.target);

    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), planetMaterial('Earth'));
    const el = label(() => nm.earth(), 'graha earth');
    el.position.set(0, 1.5, 0);
    earth.add(el);
    scene.add(earth);

    // Classical geocentric order of the grahas by speed.
    const radius: Record<Graha, number> = { Moon: 3, Mercury: 4, Venus: 5, Sun: 6.2, Mars: 7.2, Jupiter: 8.1, Saturn: 9, Rahu: 6.2, Ketu: 6.2 };
    const size: Record<Graha, number> = { Moon: 0.32, Mercury: 0.2, Venus: 0.28, Sun: 0.6, Mars: 0.24, Jupiter: 0.45, Saturn: 0.4, Rahu: 0.18, Ketu: 0.18 };
    for (const g of ['Moon', 'Mercury', 'Venus', 'Sun', 'Mars', 'Jupiter', 'Saturn'] as Graha[]) {
      scene.add(circleLine(radius[g], g === 'Sun' ? 0xffc53d : 0x5a6190, g === 'Sun' ? 0.5 : 0.25));
    }
    const meshes = {} as Record<Graha, THREE.Mesh>;
    const tags = {} as Record<Graha, CSS2DObject>;
    for (const g of Object.keys(radius) as Graha[]) {
      let mat: THREE.Material;
      if (g === 'Sun') mat = new THREE.MeshBasicMaterial({ color: 0xffd060 });
      else if (g === 'Rahu' || g === 'Ketu') mat = new THREE.MeshBasicMaterial({ color: GRAHA_COLOR[g] });
      else mat = planetMaterial(g);
      const m = new THREE.Mesh(new THREE.SphereGeometry(size[g], 32, 16), mat);
      if (g === 'Sun') {
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,210,120,0.8)', 'rgba(255,150,40,0)'), blending: THREE.AdditiveBlending, depthWrite: false }));
        glow.scale.set(3.2, 3.2, 1);
        m.add(glow);
      }
      const t = label('', `graha ${g === 'Rahu' || g === 'Ketu' ? 'node' : ''}`);
      t.position.set(0, size[g] + 0.35, 0);
      m.add(t);
      tags[g] = t;
      meshes[g] = m;
      scene.add(m);
    }
    const nodeAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
      new THREE.LineDashedMaterial({ color: 0x8a7cff, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity: 0.6 }));
    scene.add(nodeAxis);

    const { ring } = this.zodiac(scene, 10.2, 11.8, 12, 13.2);
    // Sayana 0° (vernal equinox) marker to show the ayanamsa offset.
    const eq = new THREE.Line(new THREE.BufferGeometry().setFromPoints([eclLon(0, 9.6), eclLon(0, 13.6)]),
      new THREE.LineBasicMaterial({ color: 0x6fd3ff, transparent: true, opacity: 0.8 }));
    const eqL = label(() => tr('scene.equinox'), 'eq');
    eqL.position.copy(eclLon(0, 14.2));
    scene.add(eq, eqL);
    const ayL = label('', 'eq');
    scene.add(ayL);

    // Tithi dial on the Moon's orbit: 30 slots of 12° starting at the Sun.
    const dial = new THREE.Group();
    scene.add(dial);
    const slots: THREE.Mesh[] = [];
    for (let k = 0; k < 30; k++) {
      const m = sector(2.55, 3.45, k * 12 + 0.4, 11.2, k < 15 ? 0xf6e7b0 : 0x5260a8, k < 15 ? 0.12 : 0.18);
      slots.push(m);
      dial.add(m);
    }
    const arcGroup = new THREE.Group();
    scene.add(arcGroup);
    const tithiTag = label('', 'tithi');
    scene.add(tithiTag);

    return {
      scene,
      camera,
      update: (s) => {
        ring.rotation.y = s.ayanamsa * D2R;
        ring.traverse((o) => { if (o.userData.nak) o.visible = this.opts.nakshatras; });
        ayL.position.copy(eclLon(s.ayanamsa / 2, 14.2, -0.6));
        ayL.element.innerHTML = tr('scene.ayanamsa', { a: s.ayanamsa.toFixed(2) });
        for (const g of Object.keys(radius) as Graha[]) {
          const st = s.grahas[g];
          const r = radius[g];
          meshes[g].position.copy(eclLon(st.lon, r, r * Math.sin(st.lat * D2R) * 2.5));
          const retro = st.speed < 0 && g !== 'Rahu' && g !== 'Ketu' ? ' <i>℞</i>' : '';
          tags[g].element.innerHTML = `${GLYPH[g]} ${nm.graha(g)}${retro}<br><span>${nm.rashi(Math.floor(st.sid / 30))} ${fmtDeg(st.sid)}</span>`;
        }
        nodeAxis.geometry.setFromPoints([meshes.Rahu.position, meshes.Ketu.position]);
        nodeAxis.computeLineDistances();
        const sp = meshes.Sun.position;
        sunLight.position.copy(sp.clone().normalize().multiplyScalar(50));
        // Tithi dial and arc
        const sunLon = s.grahas.Sun.lon;
        dial.rotation.y = sunLon * D2R;
        const cur = Math.floor(s.elongation / 12);
        slots.forEach((m, k) => ((m.material as THREE.MeshBasicMaterial).opacity = k === cur ? 0.7 : k < 15 ? 0.1 : 0.16));
        arcGroup.clear();
        arcGroup.add(sector(0.0, 2.5, sunLon, Math.max(0.5, s.elongation), s.elongation < 180 ? 0xffe9a8 : 0x6a78d8, 0.22));
        const t = cur + 1;
        tithiTag.position.copy(eclLon(sunLon + s.elongation / 2, 1.8, 0.3));
        tithiTag.element.innerHTML = `${s.elongation.toFixed(1)}°<br><b>${nm.pakshaTithi(t)}</b>`;
      },
    };
  }

  // ── Sky from the observer ────────────────────────────────────────────
  private buildSky(): View {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const R = 100;
    const bg = new THREE.Color();
    scene.background = bg;

    // Ground hemisphere (slightly translucent so objects below the horizon remain findable).
    const ground = new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 64, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x1a2b1c, side: THREE.BackSide, transparent: true, opacity: 0.86, depthWrite: false }));
    ground.renderOrder = 5;
    scene.add(ground);
    const hz: THREE.Vector3[] = [];
    for (let i = 0; i <= 360; i += 2) hz.push(horiz(0, i, R));
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hz), new THREE.LineBasicMaterial({ color: 0x9fb89a, transparent: true, opacity: 0.7 })));
    const cardinals: [string, string, number][] = [
      ['N', 'उत्तर', 0], ['NE', 'ईशान्य', 45], ['E', 'पूर्व', 90], ['SE', 'आग्नेय', 135],
      ['S', 'दक्षिण', 180], ['SW', 'नैऋत्य', 225], ['W', 'पश्चिम', 270], ['NW', 'वायव्य', 315],
    ];
    for (const [en, mrName, az] of cardinals) {
      const l = label(() => (lang() === 'mr' ? mrName : en), az % 90 ? 'cardinal minor' : 'cardinal');
      l.position.copy(horiz(-2.5, az, R));
      scene.add(l);
    }

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    scene.add(sunLight, sunLight.target);
    scene.add(new THREE.AmbientLight(0xffffff, 0.04));

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STARS.length * 3);
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starSizes = STARS.map((s) => Math.max(1.5, 5.5 - s.mag * 1.1));
    const starPts = new THREE.Points(starGeo, new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uAlpha: { value: 1 } },
      vertexShader: `attribute float size; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.); gl_PointSize = size; gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform float uAlpha; void main(){ float d = length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor = vec4(1.,.97,.9, uAlpha*smoothstep(.5,.0,d)); }`,
    }));
    starGeo.setAttribute('size', new THREE.BufferAttribute(new Float32Array(starSizes), 1));
    scene.add(starPts);
    const starLbls = STARS.map((s) => {
      const name = () => (lang() === 'mr' && s.mr ? s.mr : s.name);
      const l = label(() => (s.nakshatra ? `${nm.nakshatra(NAK[s.nakshatra])}<span> · ${s.name}</span>` : name()),
        s.nakshatra ? 'star yogatara' : s.group ? 'star saptarishi' : 'star');
      scene.add(l);
      return l;
    });
    const saptaGeo = new THREE.BufferGeometry();
    const saptaPos = new Float32Array(SAPTARISHI_LINES.length * 6);
    saptaGeo.setAttribute('position', new THREE.BufferAttribute(saptaPos, 3));
    scene.add(new THREE.LineSegments(saptaGeo, new THREE.LineBasicMaterial({ color: 0x9db4ff, transparent: true, opacity: 0.45 })));
    const starIndex = Object.fromEntries(STARS.map((s, i) => [s.name, i]));

    // Ecliptic with rashi ticks and labels
    const eclGeo = new THREE.BufferGeometry();
    const eclPos = new Float32Array(361 * 3);
    eclGeo.setAttribute('position', new THREE.BufferAttribute(eclPos, 3));
    scene.add(new THREE.Line(eclGeo, new THREE.LineBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.55 })));
    const tickGeo = new THREE.BufferGeometry();
    const tickPos = new Float32Array(12 * 6);
    tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPos, 3));
    scene.add(new THREE.LineSegments(tickGeo, new THREE.LineBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.8 })));
    const rashiLbls = RASHI_SYMBOLS.map((sym, i) => {
      const l = label(() => `${sym} ${nm.rashi(i)}`, 'rashi sky');
      scene.add(l);
      return l;
    });

    // Grahas
    const angSize: Record<Graha, number> = { Sun: 2.4, Moon: 2.4, Mercury: 0.5, Venus: 0.8, Mars: 0.6, Jupiter: 0.8, Saturn: 0.7, Rahu: 0.4, Ketu: 0.4 };
    const bodies = {} as Record<Graha, THREE.Object3D>;
    const tags = {} as Record<Graha, CSS2DObject>;
    for (const g of Object.keys(angSize) as Graha[]) {
      const r = (R * angSize[g] * D2R) / 2;
      let obj: THREE.Object3D;
      if (g === 'Sun') {
        obj = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16), new THREE.MeshBasicMaterial({ color: 0xfff1c0 }));
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,230,160,0.95)', 'rgba(255,170,60,0)'), blending: THREE.AdditiveBlending, depthWrite: false }));
        glow.scale.set(r * 9, r * 9, 1);
        obj.add(glow);
      } else if (g === 'Moon') {
        obj = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 24), new THREE.MeshStandardMaterial({ color: 0xf4f1e8, roughness: 1, emissive: 0x1c1f2a }));
      } else if (g === 'Rahu' || g === 'Ketu') {
        obj = new THREE.Object3D();
      } else {
        obj = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)'), color: GRAHA_COLOR[g], depthWrite: false }));
        obj.scale.set(r * 4, r * 4, 1);
      }
      const t = label('', `graha sky ${g === 'Rahu' || g === 'Ketu' ? 'node' : ''}`);
      t.position.set(0, 0, 0);
      obj.add(t);
      tags[g] = t;
      bodies[g] = obj;
      scene.add(obj);
    }

    const skyColor = (sunAlt: number) => {
      const day = new THREE.Color(0x3d7cc9);
      const twi = new THREE.Color(0x2b2a5a);
      const night = new THREE.Color(0x03040c);
      if (sunAlt > 6) return day;
      if (sunAlt > -6) return twi.clone().lerp(day, (sunAlt + 6) / 12);
      if (sunAlt > -18) return night.clone().lerp(twi, (sunAlt + 18) / 12);
      return night;
    };

    return {
      scene,
      camera,
      update: (s) => {
        const obs = makeObserver(this.place.lat, this.place.lon, this.place.height);
        const P = horizonProjector(s.ms, obs);
        const sunAlt = s.grahas.Sun.alt;
        bg.copy(skyColor(sunAlt));
        const starAlpha = sunAlt > 0 ? 0.08 : sunAlt > -12 ? 0.3 + ((-sunAlt) / 12) * 0.7 : 1;
        (starPts.material as THREE.ShaderMaterial).uniforms.uAlpha.value = starAlpha;
        ground.visible = true;
        (ground.material as THREE.MeshBasicMaterial).opacity = this.opts.ground ? 0.9 : 0.45;

        STARS.forEach((st, i) => {
          const h = P.equatorialJ2000(st.ra, st.dec);
          const v = horiz(h.alt, h.az, R * 0.98);
          starPos.set([v.x, v.y, v.z], i * 3);
          starLbls[i].position.copy(v);
          starLbls[i].visible = this.opts.labels && (st.nakshatra ? this.opts.nakshatras : true) && h.alt > -2 && sunAlt < 0;
        });
        starGeo.attributes.position.needsUpdate = true;
        SAPTARISHI_LINES.forEach(([a, b], i) => {
          saptaPos.set(starPos.slice(starIndex[a] * 3, starIndex[a] * 3 + 3), i * 6);
          saptaPos.set(starPos.slice(starIndex[b] * 3, starIndex[b] * 3 + 3), i * 6 + 3);
        });
        saptaGeo.attributes.position.needsUpdate = true;

        for (let i = 0; i <= 360; i++) {
          const h = P.ecliptic(i);
          const v = horiz(h.alt, h.az, R * 0.97);
          eclPos.set([v.x, v.y, v.z], i * 3);
        }
        eclGeo.attributes.position.needsUpdate = true;
        for (let i = 0; i < 12; i++) {
          const lon = i * 30 + s.ayanamsa;
          const a = P.ecliptic(lon, -2.5);
          const b = P.ecliptic(lon, 2.5);
          const va = horiz(a.alt, a.az, R * 0.97);
          const vb = horiz(b.alt, b.az, R * 0.97);
          tickPos.set([va.x, va.y, va.z, vb.x, vb.y, vb.z], i * 6);
          const m = P.ecliptic(lon + 15, -4);
          rashiLbls[i].position.copy(horiz(m.alt, m.az, R * 0.96));
          rashiLbls[i].visible = m.alt > -3;
        }
        tickGeo.attributes.position.needsUpdate = true;

        const sunDir = horiz(sunAlt, s.grahas.Sun.az, 1);
        sunLight.position.copy(sunDir.clone().multiplyScalar(50));
        for (const g of Object.keys(angSize) as Graha[]) {
          const st = s.grahas[g];
          bodies[g].position.copy(horiz(st.alt, st.az, R * 0.9));
          // bodies below the horizon are drawn faintly "through" the ground
          bodies[g].traverse((o) => {
            const m = (o as THREE.Mesh).material as THREE.Material | undefined;
            if (m && !(o instanceof CSS2DObject)) {
              m.transparent = true;
              m.opacity = st.alt < 0 ? (this.opts.ground ? 0.18 : 0.5) : 1;
            }
          });
          const below = st.alt < 0 ? ` <em>${tr('scene.below')}</em>` : '';
          tags[g].element.innerHTML = `${GLYPH[g]} ${nm.graha(g)}${below}`;
          tags[g].element.classList.toggle('dim', st.alt < 0);
          tags[g].position.set(0, (R * angSize[g] * D2R) * 0.9 + 1.2, 0);
        }
        if (this.skyFocus && this.followFocus) {
          const f = s.grahas[this.skyFocus];
          this.yaw = f.az;
          this.pitch = Math.max(8, Math.min(60, f.alt + 5));
        }
        this.applySkyCamera();
      },
    };
  }
}

export type { Ms };
