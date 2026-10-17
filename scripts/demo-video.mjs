// Records a narrated feature walkthrough of Panchang Sky to demo/panchang-sky-demo.mp4.
// Needs the dev server running (npm run dev) and Google Chrome installed.
// Usage: npm run demo
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_URL = process.env.DEMO_URL ?? 'http://localhost:5173';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = process.env.FFMPEG ?? execFileSync('python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();
const W = 1920;
const H = 1080;
const OUT_DIR = fileURLToPath(new URL('../demo/', import.meta.url));
const RAW = join(tmpdir(), 'panchang-sky-demo-raw.webm');
const OUT = join(OUT_DIR, 'panchang-sky-demo.mp4');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const OVERLAY_CSS = `
#demo-cursor { position: fixed; z-index: 10000; width: 26px; height: 26px; margin: -4px 0 0 -4px; pointer-events: none;
  transition: left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1); left: 50%; top: 50%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 2l7 19 2.5-7.5L20 11z' fill='white' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,.6)); }
#demo-cursor.drag { transition: none; }
.demo-ripple { position: fixed; z-index: 9999; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%;
  border: 3px solid #ffb347; pointer-events: none; animation: demo-rip .6s ease-out forwards; }
@keyframes demo-rip { from { transform: scale(.3); opacity: 1 } to { transform: scale(1.4); opacity: 0 } }
#demo-cap { position: fixed; z-index: 9998; left: 50%; bottom: 175px; transform: translateX(-50%); max-width: 1000px;
  padding: 14px 22px; border-radius: 14px; background: rgba(8,10,24,.9); border: 1px solid rgba(255,179,71,.55);
  box-shadow: 0 10px 40px rgba(0,0,0,.5); color: #f3efff; font: 500 21px/1.4 Inter, system-ui, sans-serif; text-align: center;
  opacity: 0; transition: opacity .45s; pointer-events: none; }
#demo-cap.on { opacity: 1; }
#demo-cap b { color: #ffc56b; font-weight: 600; display: block; font-size: 15px; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 4px; }
#demo-title { position: fixed; inset: 0; z-index: 10001; display: grid; place-content: center; text-align: center; gap: 14px;
  background: radial-gradient(ellipse at center, #1b1636 0%, #06070e 70%); color: #fff; opacity: 0; transition: opacity .8s; pointer-events: none;
  font-family: Marcellus, Georgia, serif; }
#demo-title.on { opacity: 1; }
#demo-title .sun { width: 110px; height: 110px; margin: 0 auto 8px; border-radius: 50%;
  background: radial-gradient(circle, #ffe08a 0 38%, #ff8a3d 72%, transparent 74%); box-shadow: 0 0 80px rgba(255,170,60,.6); }
#demo-title h1 { margin: 0; font-size: 76px; font-weight: 400; }
#demo-title h2 { margin: 0; font: 600 30px 'Noto Sans Devanagari', sans-serif; color: #ffb347; }
#demo-title p { margin: 6px 0 0; font: 400 24px Inter, sans-serif; color: #b9b5d6; max-width: 1100px; }
`;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', `--window-size=${W},${H}`, '--hide-scrollbars'],
    defaultViewport: { width: W, height: H },
  });
  const page = await browser.newPage();
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.querySelector('.item.sel'), { timeout: 30000 });
  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.evaluate(() => {
    for (const [id, html] of [['demo-cursor', ''], ['demo-cap', ''], ['demo-title', '']]) {
      const d = document.createElement('div');
      d.id = id;
      d.innerHTML = html;
      document.body.appendChild(d);
    }
  });

  // ── helpers ───────────────────────────────────────────────
  let cur = { x: W / 2, y: H / 2 };
  const moveTo = async (x, y, wait = 750) => {
    cur = { x, y };
    await page.evaluate((x, y) => Object.assign(document.getElementById('demo-cursor').style, { left: `${x}px`, top: `${y}px` }), x, y);
    await sleep(wait);
  };
  const ripple = (x, y) =>
    page.evaluate((x, y) => {
      const r = document.createElement('div');
      r.className = 'demo-ripple';
      Object.assign(r.style, { left: `${x}px`, top: `${y}px` });
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    }, x, y);
  const centerOf = async (handle) => {
    const b = await handle.boundingBox();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  };
  const click = async (selectorOrHandle, after = 900) => {
    const h = typeof selectorOrHandle === 'string' ? await page.waitForSelector(selectorOrHandle, { visible: true }) : selectorOrHandle;
    await h.evaluate((el) => el.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
    await sleep(150);
    const c = await centerOf(h);
    await moveTo(c.x, c.y);
    await ripple(c.x, c.y);
    await page.mouse.click(c.x, c.y);
    await sleep(after);
  };
  const caption = async (title, text, hold = 4500) => {
    await page.evaluate((title, text) => {
      const c = document.getElementById('demo-cap');
      c.innerHTML = `<b>${title}</b>${text}`;
      c.classList.add('on');
    }, title, text);
    await sleep(hold);
  };
  const hideCaption = () => page.evaluate(() => document.getElementById('demo-cap').classList.remove('on'));
  const titleCard = async (html, hold) => {
    await page.evaluate((html) => {
      const t = document.getElementById('demo-title');
      t.innerHTML = html;
      t.classList.add('on');
    }, html);
    await sleep(hold);
    await page.evaluate(() => document.getElementById('demo-title').classList.remove('on'));
    await sleep(900);
  };
  const listItem = async (text) => {
    const handle = await page.evaluateHandle((text) =>
      [...document.querySelectorAll('.item')].find((i) => i.querySelector('.t')?.textContent.includes(text)), text);
    const el = handle.asElement();
    if (!el) throw new Error(`list item not found: ${text}`);
    await el.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'smooth' }));
    await sleep(900);
    return el;
  };
  const search = async (q) => {
    await click('#search', 300);
    await page.evaluate(() => {
      const s = document.getElementById('search');
      s.value = '';
      s.dispatchEvent(new Event('input'));
    });
    await page.type('#search', q, { delay: 90 });
    await sleep(700);
  };
  const clearSearch = async () => {
    await page.evaluate(() => {
      const s = document.getElementById('search');
      s.value = '';
      s.dispatchEvent(new Event('input'));
    });
    await sleep(400);
  };
  const waitIdle = () => page.waitForFunction(() => !document.getElementById('loading').classList.contains('on'), { timeout: 30000 });
  const drag = async (from, to, steps = 60, ms = 1600) => {
    await moveTo(from.x, from.y, 500);
    await page.evaluate(() => document.getElementById('demo-cursor').classList.add('drag'));
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    for (let i = 1; i <= steps; i++) {
      const x = from.x + ((to.x - from.x) * i) / steps;
      const y = from.y + ((to.y - from.y) * i) / steps;
      await page.mouse.move(x, y);
      await page.evaluate((x, y) => Object.assign(document.getElementById('demo-cursor').style, { left: `${x}px`, top: `${y}px` }), x, y);
      await sleep(ms / steps);
    }
    await page.mouse.up();
    await page.evaluate(() => document.getElementById('demo-cursor').classList.remove('drag'));
    cur = to;
  };
  const scrollDetails = (top) => page.evaluate((top) => document.getElementById('details').scrollTo({ top, behavior: 'smooth' }), top);
  const stage = async () => centerOf(await page.$('#viewport'));

  // ── recording ─────────────────────────────────────────────
  if (existsSync(RAW)) rmSync(RAW);
  const recorder = await page.screencast({ path: RAW, ffmpegPath: FFMPEG, fps: 30 });

  // 1. Title
  await titleCard(`<div class="sun"></div><h1>Panchang Sky</h1><h2>पंचांग आकाश</h2>
    <p>See the sky behind every Hindu festival, vrat and ekadashi — computed live from the positions of the Sun, Moon and planets.</p>`, 4200);

  // 2. Overview
  await caption('The layout', 'Festivals of the year on the left · a live 3D sky in the centre · the reason for each date on the right.', 5000);
  await caption('Everything is calculated', 'Tithi, nakshatra, lunar months, Adhik maas and sankrantis are computed from astronomy — no lookup tables. Default place: Pune.', 5000);

  // 3. Diwali in the zodiac wheel
  await click(await listItem('Diwali'), 1400);
  await caption('Diwali — Lakshmi Puja · 8 Nov 2026', 'Amavasya prevailing in pradosh kaal. The Sun and Moon sit together in Tula — the tithi arc between them is almost 360°.', 5500);
  const s = await stage();
  await drag({ x: s.x - 250, y: s.y + 120 }, { x: s.x + 220, y: s.y - 60 });
  await caption('Rotate, zoom, explore', 'Drag to orbit the Bhachakra — 12 rashis, 27 nakshatras and all nine grahas, placed at their true sidereal (Lahiri) longitudes.', 4500);
  await click('[data-preset="top"]', 1000);
  await scrollDetails(420);
  await caption('Why this day', 'The right panel explains the rule, the Moon–Sun angle, and the Sun and Moon positions with nakshatra, devata and dignity.', 5000);
  await scrollDetails(0);

  // 4. Solar system view
  await click('[data-view="helio"]', 1500);
  await caption('Solar System view', 'Heliocentric orbits with sight-lines from Earth: the Sun appears in Tula, the Moon beside it — the new Moon of Diwali.', 5000);
  await drag({ x: s.x - 200, y: s.y }, { x: s.x + 150, y: s.y - 80 }, 50, 1400);
  await sleep(800);

  // 5. Sky from Pune
  await click('[data-view="sky"]', 1500);
  await caption('Sky from Pune', 'The real horizon view at that moment — ecliptic, rashi markers, yogatara stars, Dhruva and the Saptarishi.', 5000);
  await click(await listItem('Karva Chauth'), 1600);
  await caption('Karva Chauth · moonrise', 'The fast ends at moonrise on Krishna Chaturthi. The view turns to the rising Moon in the east — lit on the correct side.', 5500);

  // 6. Playback
  await click('[data-view="geo"]', 1200);
  await page.select('#speed', '21600000');
  await click('#play', 300);
  await caption('Time machine', 'Press play: 6 hours per second. Watch the Moon race ahead of the Sun — every 12° is a new tithi.', 6500);
  await click('#play', 600);
  const tl = await (await page.$('#timeline')).boundingBox();
  // grab the lunar-month band (it scrubs time); the period bars below it select their period
  await drag({ x: tl.x + tl.width * 0.2, y: tl.y + 27 }, { x: tl.x + tl.width * 0.75, y: tl.y + 27 }, 70, 2600);
  await caption('The year at a glance', 'The timeline shows lunar months (Adhik Jyeshtha hatched), periods like Chaturmas and Pitru Paksha, and every festival.', 5000);

  // 7. Ganesh + Gauri
  await search('gauri');
  await click(await listItem('Gauri Avahan'), 1400);
  await caption('Maharashtrian festivals', 'Jyeshtha Gauri is set by nakshatra, not tithi: the Moon in Anuradha brings Gauri home, Jyeshtha for puja, Mula for visarjan.', 5500);

  // 8. Ekadashi
  await search('prabodhini');
  await click(await listItem('Kartiki'), 1400);
  await scrollDetails(520);
  await caption('Ekadashi rules', 'Smarta and Vaishnava dates, kshaya and vriddhi Ekadashi, and the parana time after Hari Vasara — all worked out.', 5500);
  await scrollDetails(0);

  // 9. Holika: tradition toggle
  await search('holika');
  await click(await listItem('Holika'), 1200);
  await caption('Tradition matters · Amanta', 'Holika Dahan 2026: Bhadra lasts past midnight, so Maharashtrian practice lights it on 2 March in Bhadra Puchha.', 5000);
  await click('[data-system="purnimanta"]', 300);
  await waitIdle();
  await sleep(900);
  await caption('Purnimanta', 'Switch to the North Indian convention and the same sky gives 3 March — just as the published panchangs show.', 5000);
  await click('[data-system="amanta"]', 300);
  await waitIdle();
  await clearSearch();

  // 10. Graha & Kumbh
  await click('.chip[data-cat="graha"]', 800);
  await search('simha');
  await click(await listItem('Simhastha'), 1400);
  await caption('Graha events & Kumbh', 'Gochar, vakri and asta of every planet. Guru enters Simha on 1 Nov 2026 — the Nashik–Trimbakeshwar Simhastha begins.', 5500);
  await clearSearch();
  await click('.chip[data-cat="graha"]', 600);

  // 11. Marathi
  await click('[data-lang="mr"]', 1500);
  await caption('मराठी', 'One tap switches the whole app — list, 3D labels, explanations and panchang terms — to Marathi.', 5500);

  // 12. Avakahada
  await click('[data-dtab="avakahada"]', 1500);
  await caption('अवकहडा चक्र', 'For any moment or birth time: rashi, nakshatra, charan, naamakshar, gana, nadi, yoni, lagna, paya and dasha balance.', 5000);
  await scrollDetails(900);
  await caption('नामाक्षर चक्र', 'All 108 syllables with each nakshatra’s devata and aradhya vriksha — the current charan highlighted.', 5000);
  await scrollDetails(0);
  await click('[data-lang="en"]', 1200);

  // 13. Guna Milan
  await click('[data-dtab="milan"]', 1200);
  await caption('Guna Milan', 'Enter the bride’s and groom’s birth details for the 36-point Ashtakoot match.', 3500);
  for (const [who, date, time] of [['bride', '1996-03-14', '06:45'], ['groom', '1993-11-02', '21:10']]) {
    await click(`[data-who="${who}"][data-f="date"]`, 300);
    await page.evaluate((who, date, time) => {
      for (const [f, v] of [['date', date], ['time', time]]) {
        const el = document.querySelector(`[data-who="${who}"][data-f="${f}"]`);
        el.value = v;
        el.dispatchEvent(new Event('change'));
      }
    }, who, date, time);
    await sleep(500);
  }
  await click('#milan-go', 1500);
  await scrollDetails(330);
  await caption('20 / 36 · acceptable', 'Every koota with both partners’ values, plus Nadi, Bhakoot and Gana dosha with cancellations, and Mangal dosha for each.', 6000);
  await scrollDetails(800);
  await sleep(2500);

  // 14. Muhurat
  await scrollDetails(0);
  await click('[data-dtab="muhurat"]', 1200);
  await caption('Muhurat finder', 'Vivah, griha pravesh, vehicle and property muhurats for the year — excluding Chaturmas, Guru/Shukra asta, Adhik maas, Bhadra and Rahu kaal.', 5500);
  await click('[data-mt="griha"]', 1200);
  await click('.mu-win', 1500);
  await caption('Tap a window', 'Each window lists its nakshatra and tithi; tap it and the sky jumps to that moment.', 4500);

  // 14b. Why? tab
  await scrollDetails(0);
  await click('[data-dtab="why"]', 1200);
  await caption('Why? — the reasons behind the rules', 'Twenty questions answered as stories, with the shastras, Ayurveda and the sky behind each answer.', 5000);
  await click('[data-toggle="pitru-paksha"]', 1200);
  await scrollDetails(260);
  await caption('Why Pitru Paksha only when the Sun is in Kanya?', 'Bhaskaracharya places the ancestors on the far side of the Moon — so Amavasya is their noon. Every claim is labelled and sourced.', 6500);
  await scrollDetails(900);
  await sleep(2500);
  await click('.why-sky', 1800);
  await caption('Show in sky', 'One tap jumps to Sarvapitri Amavasya: the Moon on the Sun’s line, the Sun in Kanya — the eureka you can see.', 5500);
  await click('[data-dtab="festival"]', 800);
  await hideCaption();
  await sleep(500);

  // 15. Printable calendar
  await click('#print-cal', 1500);
  await caption('Printable calendar', 'Kalnirnay-style A4 month sheets — tithi, nakshatra and festivals for every day. Print it or save as PDF.', 4500);
  await page.evaluate(() => document.getElementById('print-view').scrollTo({ top: 7400, behavior: 'smooth' }));
  await sleep(3500);
  await hideCaption();
  await click('#pc-close', 1000);
  await click('[data-dtab="festival"]', 800);

  // 16. Close
  await hideCaption();
  await titleCard(`<div class="sun"></div><h1>Panchang Sky</h1><h2>पंचांग आकाश</h2>
    <p>99% match with published 2026 Pune panchang dates · English & मराठी · 2000–2050 · 13 cities</p>
    <p style="margin-top:18px;color:#ffb347">Created by Pranav Dnyaneshwar Kulkarni · प्रणव ज्ञानेश्वर कुलकर्णी</p>`, 4500);

  await recorder.stop();
  await browser.close();

  // Re-encode to a widely playable H.264 MP4.
  execFileSync(FFMPEG, ['-y', '-i', RAW, '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
  console.log(`\nSaved ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
