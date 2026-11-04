// Renders the project covers (src/assets/projects/<name>.webp, 1600×840) from HTML,
// so they share one art direction with the site: the canvas, the cyan glow, Geist.
// Client stores and this site use real screenshots (run capture.js first);
// the open-source projects are UI mockups written below.
//
//   npm i --no-save puppeteer-core
//   node scripts/covers/render.js [name]          # e.g. node scripts/covers/render.js atelier
//   node scripts/covers/render.js --preview        # also writes .shots/_sheet.png (all covers)
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.join(__dirname, "..", "..");
const SHOTS = path.join(__dirname, ".shots");
const OUT = path.join(ROOT, "src", "assets", "projects");
const url = (p) => pathToFileURL(p).href;
const font = (f) => url(path.join(ROOT, "public", "fonts", f));
const shot = (name, kind) => url(path.join(SHOTS, `${name}-${kind}.png`));

const CSS = `
@font-face{font-family:Geist;font-weight:400;src:url(${font("geist-sans-400.woff2")})}
@font-face{font-family:Geist;font-weight:600;src:url(${font("geist-sans-600.woff2")})}
@font-face{font-family:"Geist Mono";font-weight:400;src:url(${font("geist-mono-400.woff2")})}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:100vh;overflow:hidden;position:relative;background:#0a0a0b;color:#ededef;font:400 14px/1.4 Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;letter-spacing:-.005em}
.mono{font-family:"Geist Mono",ui-monospace,monospace;letter-spacing:0}
.muted{color:#8d8d96}.dim{color:#5c5c66}.ac{color:#4cc9ff}.ok{color:#7ee0b8}.warn{color:#f2c46d}.bad{color:#ff8a80}
.b{font-weight:600}
.stage{position:absolute;inset:0;overflow:hidden}
.glow{position:absolute;inset:0;background:
  radial-gradient(55% 65% at 50% -5%,rgba(76,201,255,.16),transparent 70%),
  radial-gradient(35% 45% at 92% 105%,rgba(76,201,255,.07),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;background-position:-1px -1px;
  -webkit-mask-image:radial-gradient(70% 85% at 50% 10%,#000 20%,transparent 75%)}
.fade{position:absolute;left:0;right:0;bottom:0;height:70px;background:linear-gradient(rgba(10,10,11,0),#0a0a0b);z-index:20}

.win{position:absolute;border-radius:14px;background:#111113;border:1px solid #2a2a30;overflow:hidden;
  box-shadow:0 60px 120px -30px rgba(0,0,0,.95),0 0 0 1px rgba(0,0,0,.5),0 0 80px -20px rgba(76,201,255,.18)}
.win::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;z-index:3;background:linear-gradient(90deg,transparent 5%,rgba(76,201,255,.7) 50%,transparent 95%)}
.bar{height:38px;display:flex;align-items:center;gap:7px;padding:0 14px;background:#141416;border-bottom:1px solid #222226;position:relative}
.dot{width:10px;height:10px;border-radius:50%;background:#2c2c32}
.addr{position:absolute;left:50%;transform:translateX(-50%);height:22px;min-width:260px;padding:0 14px;border-radius:6px;background:#0c0c0e;border:1px solid #232327;
  font:400 11px/22px "Geist Mono",monospace;color:#8d8d96;text-align:center;white-space:nowrap}
.addr i{display:inline-block;width:7px;height:8px;border:1.5px solid #5c5c66;border-radius:2px;margin-right:7px;vertical-align:-1px}
.win img{display:block;width:100%}

.phone{position:absolute;border-radius:34px;padding:7px;background:#19191c;border:1px solid #34343a;z-index:10;
  box-shadow:0 50px 100px -20px rgba(0,0,0,.95),0 0 0 1px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.06)}
.phone img{display:block;width:100%;border-radius:27px}
.phone::after{content:"";position:absolute;top:15px;left:50%;transform:translateX(-50%);width:70px;height:20px;border-radius:12px;background:#000}

.float{position:absolute;z-index:10;border-radius:12px;background:rgba(24,24,27,.92);border:1px solid #303036;padding:16px;
  box-shadow:0 40px 80px -20px rgba(0,0,0,.95),0 0 0 1px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05)}
.float::before{content:"";position:absolute;left:12px;right:12px;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(76,201,255,.5),transparent)}

.eyebrow{font:400 10.5px "Geist Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#8d8d96}
.h1{font-size:24px;font-weight:600;letter-spacing:-.03em;line-height:1.15}
.h2{font-size:16px;font-weight:600;letter-spacing:-.02em}
.small{font-size:12px}.xs{font-size:11px}
.row{display:flex;align-items:center}.col{display:flex;flex-direction:column}
.between{justify-content:space-between}.g4{gap:4px}.g6{gap:6px}.g8{gap:8px}.g10{gap:10px}.g12{gap:12px}.g16{gap:16px}.g20{gap:20px}
.f1{flex:1}
.panel{background:#161618;border:1px solid #242428;border-radius:10px}
.chip{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 9px;border-radius:999px;border:1px solid #2c2c32;font:400 10.5px "Geist Mono",monospace;color:#a6a6ae;white-space:nowrap}
.chip.ok{color:#7ee0b8;border-color:rgba(126,224,184,.28);background:rgba(126,224,184,.07)}
.chip.ac{color:#4cc9ff;border-color:rgba(76,201,255,.3);background:rgba(76,201,255,.08)}
.chip.warn{color:#f2c46d;border-color:rgba(242,196,109,.28);background:rgba(242,196,109,.07)}
.chip.bad{color:#ff8a80;border-color:rgba(255,138,128,.28);background:rgba(255,138,128,.07)}
.led{width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
.btn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 14px;border-radius:8px;background:#4cc9ff;color:#06141b;font-weight:600;font-size:12.5px;white-space:nowrap;box-shadow:0 6px 24px -6px rgba(76,201,255,.6)}
.btn.ghost{background:transparent;border:1px solid #2c2c32;color:#ededef;box-shadow:none}
.input{height:34px;border-radius:8px;border:1px solid #2a2a30;background:#0f0f11;padding:0 12px;display:flex;align-items:center;font-size:12.5px;color:#ededef}
.label{font-size:11px;color:#8d8d96;margin-bottom:6px}
.skel{height:7px;border-radius:4px;background:#26262b}
.track{height:6px;border-radius:3px;background:#222226;overflow:hidden}.track>div{height:100%;border-radius:3px;background:#4cc9ff}
table{width:100%;border-collapse:collapse;font-size:12.5px}
th{font:400 10px "Geist Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:#6b6b74;text-align:left;padding:0 12px 10px;border-bottom:1px solid #232327}
td{padding:11px 12px;border-bottom:1px solid #1c1c20;white-space:nowrap}
td.n,th.n{text-align:right;font-family:"Geist Mono",monospace}
.side{width:190px;border-right:1px solid #1f1f23;padding:20px 14px;background:#0f0f11}
.nav{display:flex;align-items:center;gap:10px;height:32px;padding:0 10px;border-radius:7px;color:#8d8d96;font-size:12.5px}
.nav.on{background:rgba(76,201,255,.08);color:#ededef;box-shadow:inset 2px 0 0 #4cc9ff}
.nav b{width:14px;height:14px;border-radius:4px;border:1.5px solid currentColor;opacity:.7}
.logo{display:flex;align-items:center;gap:9px;font-weight:600;font-size:14px;margin:0 6px 22px}
.logo i{width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#4cc9ff,#1d6f94);box-shadow:0 0 16px rgba(76,201,255,.4)}
.code{font:400 12.5px/1.8 "Geist Mono",monospace;color:#c9c9d0;white-space:pre}
.k{color:#4cc9ff}.s{color:#7ee0b8}.c{color:#5c5c66}.f{color:#f2c46d}
.stat{padding:14px 16px}.stat .v{font-size:22px;font-weight:600;letter-spacing:-.03em;margin-top:6px}
.avatar{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:600;flex:none}
`;

const frame = (body, { addr, x = 120, y = 64, w = 960, h = 620, cls = "" } = {}) => `
<div class="win ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
  <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span>${addr ? `<span class="addr"><i></i>${addr}</span>` : ""}</div>
  ${body}
</div>`;

// Real desktop screenshot in a browser window plus the mobile one in a phone, overlapping
const device = (name, addr) => `
${frame(`<img src="${shot(name, "desktop")}">`, { addr, x: 70, y: 62, w: 860, h: 580 })}
<div class="phone" style="left:868px;top:112px;width:252px"><img src="${shot(name, "mobile")}"></div>`;

const app = (body, opts) => frame(`<div class="row" style="height:calc(100% - 38px);align-items:stretch">${body}</div>`, opts);

const TALL = { "carhartt-tall": 1050 };

const COVERS = {
  carhartt: () => device("carhartt", "b2b.carhartt-wip.com"),
  "carhartt-tall": () => `
${frame(`<img src="${shot("carhartt", "desktop")}">`, { addr: "b2b.carhartt-wip.com", x: 60, y: 76, w: 960, h: 640 })}
<div class="phone" style="left:850px;top:400px;width:290px"><img src="${shot("carhartt", "mobile")}"></div>
<div class="float" style="left:60px;top:770px;width:700px;padding:20px 22px">
  <div class="row between"><span class="h2">Integrations</span><span class="chip ok"><span class="led"></span>all connected</span></div>
  ${[["Microsoft Entra ID", "Single sign-on for retail partners", "SSO"], ["Amplience", "Product imagery and content over the DAM CDN", "REST"], ["Inventory & pricing", "Tiered prices, catalogue permissions, stock sync", "REST"]]
    .map(([n, d, t]) => `<div class="row g12" style="margin-top:14px;padding-top:14px;border-top:1px solid #26262b"><span class="led ok"></span><span class="b small" style="width:170px">${n}</span><span class="small muted f1">${d}</span><span class="chip ac">${t}</span></div>`).join("")}
</div>`,
  anita: () => device("anita", "www.anita.com"),
  edwin: () => device("edwin", "edwin-europe.com"),
  portfolio: () => device("portfolio", "mehdi-aichouch.vercel.app"),
  cafea: () => device("cafea", "cafea-espresso.vercel.app"),

  atelier: () => `
${app(`
  <aside class="side">
    <div class="logo"><i></i>Atelier</div>
    ${["Tableau de bord", "Commandes", "Paie", "Msrouf", "Caisse", "Dépenses", "Rapports"].map((n) => `<div class="nav ${n === "Paie" ? "on" : ""}"><b></b>${n}</div>`).join("")}
    <div class="mono xs dim" style="margin:26px 10px 0">FR · العربية · EN · ES</div>
  </aside>
  <main class="f1 col g16" style="padding:24px 28px">
    <div class="row between">
      <div><div class="eyebrow">Semaine 44</div><div class="h1" style="margin-top:6px">Paie de la semaine</div></div>
      <span class="chip ac"><span class="led"></span>Caisse · 18 450 DH</span>
    </div>
    <div class="row g12">
      ${[["Paie brute", "6 700 DH", ""], ["Msrouf", "− 1 250 DH", "warn"], ["Payé", "3 900 DH", "ok"], ["Reste à payer", "1 550 DH", "ac"]]
        .map(([l, v, c]) => `<div class="panel stat f1"><div class="xs muted">${l}</div><div class="v ${c}">${v}</div></div>`).join("")}
    </div>
    <div class="panel" style="padding:14px 4px 4px">
      <table>
        <tr><th>Artisan</th><th>Métier</th><th class="n">Brut</th><th class="n">Msrouf</th><th class="n">Reste</th><th>Statut</th></tr>
        ${[["Ahmed", "Tissage", "1 500", "− 400", "1 100", "ok", "Payé"], ["Youssef", "Cuivre", "1 300", "− 250", "1 050", "warn", "En attente"], ["Rachid", "Babouches", "1 200", "− 600", "600", "warn", "En attente"], ["Fatima", "Broderie", "1 350", "0", "1 350", "ok", "Payé"]]
          .map(([a, m, b, s, r, c, st]) => `<tr><td class="b">${a}</td><td class="muted">${m}</td><td class="n">${b}</td><td class="n warn">${s}</td><td class="n">${r}</td><td><span class="chip ${c}">${st}</span></td></tr>`).join("")}
      </table>
    </div>
    <div class="row g10"><span class="btn">Payer la semaine</span><span class="btn ghost">+ Msrouf</span></div>
  </main>`, { addr: "atelier.app/paie" })}
<div class="float" style="left:40px;top:440px;width:230px">
  <div class="row between"><span class="small b">Rapports</span><span class="chip">13</span></div>
  <div class="xs muted" style="margin-top:4px">Caisse · 8 semaines</div>
  <div class="row g6" style="align-items:flex-end;height:84px;margin-top:14px">
    ${[42, 58, 50, 71, 64, 80, 68, 92].map((v, i) => `<div class="f1" style="height:${v}%;border-radius:3px;background:${i === 7 ? "#4cc9ff" : "rgba(76,201,255,.25)"}"></div>`).join("")}
  </div>
</div>`,

  "job-bot": () => `
${frame(`
  <div style="padding:22px 26px" class="col g16">
    <div class="code"><span class="k">$</span> python run.py --report
<span class="c">↳</span> scrape   <span class="dim">7 job boards ················</span> <span class="b">42 ads</span>
<span class="c">↳</span> filter   <span class="dim">dedupe + rules ··············</span> <span class="b">18 kept</span>
<span class="c">↳</span> match    <span class="dim">deterministic scoring ·······</span> <span class="b">5 above 60</span>
<span class="c">↳</span> verify   <span class="dim">recruiter contacts ··········</span> <span class="ok">3 verified</span>
<span class="c">↳</span> draft    <span class="dim">free LLM ····················</span> <span class="ac">3 drafts ready</span></div>
    <div class="col g10" style="width:640px">
      ${[["Magento 2 Developer", "Remote · EU", 88, "ok", "Strong match"], ["PHP / Symfony Developer", "Paris · Hybrid", 62, "ac", "Contact verified"], ["Senior Platform Engineer", "US only", 21, "bad", "Skipped"]]
        .map(([t, l, s, c, tag]) => `<div class="panel row g16" style="padding:12px 16px">
          <div class="f1"><div class="small b">${t}</div><div class="xs muted" style="margin-top:2px">${l}</div></div>
          <span class="chip ${c}">${tag}</span>
          <div style="width:120px" class="track"><div style="width:${s}%;background:${c === "bad" ? "#5c5c66" : c === "ok" ? "#7ee0b8" : "#4cc9ff"}"></div></div>
          <div class="mono small ${c === "bad" ? "dim" : c}" style="width:34px;text-align:right">${s}%</div>
        </div>`).join("")}
    </div>
  </div>`, { addr: "job-bot — zsh" })}
<div class="float" style="left:800px;top:250px;width:290px">
  <div class="row g8"><span class="led ok"></span><span class="small b">GitHub Actions</span><span class="chip" style="margin-left:auto">schedule</span></div>
  <div class="code xs" style="margin-top:12px;line-height:1.9"><span class="c">on:</span>
  <span class="k">schedule</span>:
    - cron: <span class="s">"0 7 * * 1-5"</span></div>
  <div class="row between xs" style="margin-top:12px;padding-top:12px;border-top:1px solid #2a2a30"><span class="ok">✓ Daily run passed</span><span class="mono muted">2m 41s</span></div>
</div>`,

  echallenge: () => `
${frame(`
  <div style="padding:26px 30px" class="col g16">
    <div class="row between">
      <div><div class="eyebrow">Question 12 / 20</div><div class="h1" style="margin-top:6px">Java Fundamentals</div></div>
      <span class="chip warn" style="height:28px;font-size:13px;padding:0 12px"><span class="led"></span>12:47</span>
    </div>
    <div class="track"><div style="width:60%"></div></div>
    <div class="panel" style="padding:18px 20px;font-size:16px" class="b">Which annotation marks a Spring Data JPA repository?</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${["@Component", "@Repository", "@Service", "@Controller"].map((o) => {
        const on = o === "@Repository";
        return `<div class="row g12 mono" style="height:48px;padding:0 16px;border-radius:10px;font-size:13px;border:1px solid ${on ? "#4cc9ff" : "#26262b"};background:${on ? "rgba(76,201,255,.08)" : "#141416"};color:${on ? "#4cc9ff" : "#c9c9d0"}">
          <span style="width:14px;height:14px;border-radius:50%;border:1.5px solid currentColor;display:grid;place-items:center">${on ? '<span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>' : ""}</span>${o}</div>`;
      }).join("")}
    </div>
    <div class="row between"><span class="btn ghost">← Previous</span><span class="chip ok">JWT · Spring Security</span><span class="btn">Next →</span></div>
  </div>`, { addr: "echallenge.app/exam/java-fundamentals" })}
<div class="float" style="left:40px;top:448px;width:240px">
  <div class="small b">Book a slot</div><div class="xs muted" style="margin-top:2px">Thursday, Nov 6</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:12px">
    ${["09:00", "10:30", "14:00", "15:30", "17:00", "18:30"].map((t, i) => `<div class="mono xs" style="height:28px;display:grid;place-items:center;border-radius:6px;border:1px solid ${i === 1 ? "#4cc9ff" : "#2a2a30"};color:${i === 1 ? "#06141b" : i === 4 ? "#5c5c66" : "#c9c9d0"};background:${i === 1 ? "#4cc9ff" : "transparent"};${i === 4 ? "text-decoration:line-through" : ""}">${t}</div>`).join("")}
  </div>
</div>`,

  "freespace-blog": () => `
${frame(`
  <div class="row between" style="padding:16px 28px;border-bottom:1px solid #1f1f23">
    <span class="b" style="font-size:15px">Free Space</span>
    <div class="row g20 small muted"><span style="color:#ededef">Latest</span><span>Topics</span><span>Writers</span><span class="avatar" style="background:#1d3a48;color:#4cc9ff">MA</span></div>
  </div>
  <div style="padding:22px 28px" class="col g16">
    <div style="position:relative;height:200px;border-radius:12px;overflow:hidden;border:1px solid #26262b;background:
      radial-gradient(60% 120% at 85% 20%,rgba(76,201,255,.45),transparent 60%),radial-gradient(50% 90% at 60% 110%,rgba(126,224,184,.25),transparent 60%),linear-gradient(120deg,#0f1a20,#14141a)">
      <div style="position:absolute;left:24px;bottom:22px;right:24px">
        <span class="chip ac">★ Featured</span>
        <div class="h1" style="margin-top:10px;font-size:26px">Getting started with Django 6</div>
        <div class="small muted" style="margin-top:6px">A practical walkthrough of the new async views and ORM improvements · 6 min read</div>
      </div>
      <div class="row g6" style="position:absolute;right:24px;bottom:26px"><span style="width:18px;height:4px;border-radius:2px;background:#ededef"></span><span style="width:6px;height:4px;border-radius:2px;background:#5c5c66"></span><span style="width:6px;height:4px;border-radius:2px;background:#5c5c66"></span></div>
    </div>
    <div class="row g16">
      ${[["Python", "Nested comments with the ORM", "One-level replies, prefetch_related and annotations.", "48", "12"], ["Tailwind", "Infinite scroll without a framework", "IntersectionObserver plus AJAX pagination.", "31", "8"]]
        .map(([tag, t, d, l, c]) => `<div class="panel f1" style="padding:16px 18px"><span class="chip">${tag}</span><div class="h2" style="margin-top:10px">${t}</div><div class="small muted" style="margin-top:4px">${d}</div>
          <div class="row g16 xs muted mono" style="margin-top:12px"><span class="bad">♥ ${l}</span><span>💬 ${c}</span></div></div>`).join("")}
    </div>
  </div>`, { addr: "freespace.blog" })}
<div class="float" style="left:870px;top:112px;width:280px">
  <div class="xs muted mono">COMMENTS · 12</div>
  ${[["SK", "Great breakdown, the async ORM part saved me.", 0], ["MA", "Thanks! A follow-up on signals is coming.", 1]]
    .map(([a, t, n]) => `<div class="row g10" style="margin-top:12px;margin-left:${n * 24}px;align-items:flex-start"><span class="avatar" style="width:24px;height:24px;background:${n ? "#1d3a48" : "#2a2a30"};color:${n ? "#4cc9ff" : "#c9c9d0"};font-size:10px">${a}</span><div class="xs" style="color:#c9c9d0">${t}<div class="dim" style="margin-top:3px">Reply · ♥ ${n ? 4 : 9}</div></div></div>`).join("")}
</div>`,

  "jee-products": () => `
${frame(`
  <div style="padding:24px 28px" class="col g16">
    <div class="row between"><div><div class="eyebrow">Produits</div><div class="h1" style="margin-top:6px">Catalogue des produits</div></div><span class="btn">+ Ajouter</span></div>
    <div class="input" style="width:340px;color:#6b6b74">⌕&nbsp; Rechercher par mot-clé…</div>
    <div class="panel" style="padding:14px 4px 4px">
      <table>
        <tr><th>ID</th><th>Désignation</th><th class="n">Prix</th><th class="n">Quantité</th><th style="text-align:right">Actions</th></tr>
        ${[["1", "Ordinateur portable HP", "8 500 DH", "12"], ["2", "Imprimante Canon", "1 200 DH", "34"], ["3", "Écran Dell 27\"", "2 900 DH", "8"], ["4", "Clavier mécanique", "650 DH", "57"]]
          .map(([i, d, p, q]) => `<tr><td class="mono dim">${i}</td><td class="b">${d}</td><td class="n ac">${p}</td><td class="n">${q}</td><td style="text-align:right"><span class="chip">Éditer</span> <span class="chip bad">Supprimer</span></td></tr>`).join("")}
      </table>
    </div>
  </div>`, { addr: "localhost:8080/products" })}
<div class="float" style="left:760px;top:458px;width:340px">
  <div class="row between"><span class="mono xs muted">ProductDaoImpl.java</span><span class="chip">JDBC</span></div>
  <div class="code xs" style="margin-top:10px;line-height:1.75"><span class="k">public</span> List&lt;Product&gt; <span class="f">search</span>(String kw) {
  <span class="k">var</span> ps = conn.prepareStatement(
    <span class="s">"SELECT * FROM products WHERE name LIKE ?"</span>);
  ps.setString(<span class="ac">1</span>, <span class="s">"%"</span> + kw + <span class="s">"%"</span>);</div>
</div>`,

  freespace: () => `
${app(`
  <div class="f1 col g16" style="padding:24px 26px;border-right:1px solid #1f1f23">
    <div class="row between"><div><div class="eyebrow">Building A · Floor 1</div><div class="h1" style="margin-top:6px">Floor plan</div></div>
      <div class="row g8"><span class="chip ok">Available</span><span class="chip bad">Occupied</span><span class="chip ac">Reserved</span></div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
      ${[["101", "ok", "Meeting room"], ["102", "bad", "Open space"], ["103", "ac", "Studio"], ["201", "ok", "Conference A"], ["202", "ok", "Phone booth"], ["203", "bad", "Workshop"]]
        .map(([r, c, t], i) => {
          const col = { ok: "126,224,184", bad: "255,138,128", ac: "76,201,255" }[c];
          return `<div style="height:96px;border-radius:10px;padding:14px;border:1px solid rgba(${col},${i === 3 ? 0.9 : 0.3});background:rgba(${col},${i === 3 ? 0.14 : 0.06})" class="col between">
            <span class="mono small" style="color:rgb(${col})">Room ${r}</span><span class="xs muted">${t}</span></div>`;
        }).join("")}
    </div>
    <div class="row g12">${[["12", "Available", "ok"], ["7", "Occupied", "bad"], ["3", "Reserved", "ac"]].map(([v, l, c]) => `<div class="panel stat f1"><div class="xs muted">${l}</div><div class="v ${c}">${v}</div></div>`).join("")}</div>
  </div>
  <div style="width:330px;padding:24px 24px" class="col g12">
    <div class="h2">Book a space</div>
    <div><div class="label">Space</div><div class="input">Conference A · Room 201</div></div>
    <div class="row g10"><div class="f1"><div class="label">Date</div><div class="input mono">2025-03-18</div></div><div class="f1"><div class="label">Time</div><div class="input mono">10:00 – 12:00</div></div></div>
    <div><div class="label">Booked by</div><div class="input">Mehdi Aichouch</div></div>
    <span class="btn" style="justify-content:center;margin-top:6px;height:38px">Confirm booking</span>
  </div>`, { addr: "freespace.local/booking" })}`,

  requestify: () => `
${app(`
  <aside class="side">
    <div class="logo"><i></i>Requestify</div>
    ${["Dashboard", "Requests", "Approvals", "Teams", "Settings"].map((n) => `<div class="nav ${n === "Dashboard" ? "on" : ""}"><b></b>${n}</div>`).join("")}
  </aside>
  <main class="f1 col g16" style="padding:24px 28px">
    <div class="row between"><div><div class="eyebrow">Overview</div><div class="h1" style="margin-top:6px">Requests</div></div><span class="btn">+ New request</span></div>
    <div class="row g12">${[["Total", "124", ""], ["Approved", "98", "ok"], ["Pending", "26", "warn"]].map(([l, v, c]) => `<div class="panel stat f1"><div class="xs muted">${l}</div><div class="v ${c}">${v}</div></div>`).join("")}</div>
    <div class="panel" style="padding:14px 4px 4px">
      <table>
        <tr><th>ID</th><th>Title</th><th>Requester</th><th>Status</th><th class="n">Date</th></tr>
        ${[["#0412", "Equipment request", "S. Amrani", "ok", "Approved", "Jan 15"], ["#0413", "Leave request", "Y. Benali", "warn", "Pending", "Jan 18"], ["#0414", "Budget approval", "K. Idrissi", "ok", "Approved", "Jan 20"], ["#0415", "Software licence", "M. Tazi", "bad", "Rejected", "Jan 21"]]
          .map(([i, t, r, c, s, d]) => `<tr><td class="mono dim">${i}</td><td class="b">${t}</td><td class="muted">${r}</td><td><span class="chip ${c}">${s}</span></td><td class="n muted">${d}</td></tr>`).join("")}
      </table>
    </div>
  </main>`, { addr: "requestify.app/dashboard" })}
<div class="float" style="left:40px;top:330px;width:250px">
  <div class="row between"><span class="small b">Leave request</span><span class="mono xs dim">#0413</span></div>
  ${[["Submitted", "Y. Benali", "ok"], ["Manager review", "Approved", "ok"], ["HR approval", "Waiting", "warn"]]
    .map(([t, s, c], i) => `<div class="row g10" style="margin-top:12px"><span class="${c}" style="width:16px;height:16px;border-radius:50%;border:1.5px solid currentColor;display:grid;place-items:center;font-size:9px">${c === "ok" ? "✓" : i + 1}</span><div class="xs"><div>${t}</div><div class="${c}" style="margin-top:1px">${s}</div></div></div>`).join("")}
</div>`,

  slackbot: () => `
${app(`
  <aside class="side" style="width:200px">
    <div class="logo">Engineering</div>
    <div class="xs dim mono" style="margin:0 10px 8px">CHANNELS</div>
    ${["general", "daily-standup", "deployments", "random"].map((n) => `<div class="nav ${n === "daily-standup" ? "on" : ""}"># ${n}</div>`).join("")}
  </aside>
  <main class="f1 col" style="padding:20px 26px">
    <div class="row between" style="padding-bottom:14px;border-bottom:1px solid #1f1f23"><span class="h2"># daily-standup</span><span class="chip ok"><span class="led"></span>StandupBot online</span></div>
    ${[["SB", "StandupBot", "9:00", "Good morning team! Time for your daily stand-up. Reply in the thread before 10:00.", true],
       ["MA", "Mehdi", "9:04", "<b class='ok'>Yesterday</b> fixed the auth bug<br><b class='ac'>Today</b> API integration<br><b class='warn'>Blockers</b> none", false],
       ["SB", "StandupBot", "10:00", "Thanks everyone! 6/6 updates in. Summary posted, see you tomorrow.", true]]
      .map(([a, n, t, m, bot]) => `<div class="row g12" style="margin-top:18px;align-items:flex-start">
        <span class="avatar" style="width:34px;height:34px;border-radius:9px;background:${bot ? "linear-gradient(135deg,#4cc9ff,#1d6f94)" : "#2a2a30"};color:${bot ? "#06141b" : "#ededef"}">${a}</span>
        <div><div class="small"><span class="b">${n}</span>${bot ? ' <span class="chip" style="height:16px;font-size:9px;padding:0 5px">APP</span>' : ""} <span class="dim xs mono">${t}</span></div><div class="small" style="margin-top:4px;color:#c9c9d0;line-height:1.6">${m}</div></div></div>`).join("")}
  </main>`, { addr: "slack.com/app · #daily-standup" })}
<div class="float" style="left:830px;top:390px;width:300px">
  <div class="mono xs muted">standup_bot.py</div>
  <div class="code xs" style="margin-top:8px;line-height:1.75"><span class="k">@app.event</span>(<span class="s">"message"</span>)
<span class="k">def</span> <span class="f">handle_standup</span>(event):
    <span class="k">if</span> is_standup_time():
        collect_update(event)
schedule.every().weekday.at(<span class="s">"09:00"</span>)</div>
</div>`,

  library: () => `
${frame(`
  <div style="padding:24px 28px" class="col g16">
    <div class="row between"><div><div class="eyebrow">Library</div><div class="h1" style="margin-top:6px">Dashboard</div></div><div class="input" style="width:260px;color:#6b6b74">⌕&nbsp; Search books, members…</div></div>
    <div class="row g12">${[["Books in catalog", "243", ""], ["Active borrowings", "31", "ac"], ["Overdue", "5", "bad"], ["Members", "128", ""]].map(([l, v, c]) => `<div class="panel stat f1"><div class="xs muted">${l}</div><div class="v ${c}">${v}</div></div>`).join("")}</div>
    <div class="panel" style="padding:14px 4px 4px">
      <table>
        <tr><th>Title</th><th>Author</th><th>Status</th><th style="width:300px"></th></tr>
        ${[["Clean Code", "Robert C. Martin", "ok", "Available"], ["The Pragmatic Programmer", "Hunt & Thomas", "ac", "Borrowed"], ["Design Patterns", "Gang of Four", "bad", "Overdue"], ["Refactoring", "Martin Fowler", "ok", "Available"]]
          .map(([t, a, c, s]) => `<tr><td class="b">${t}</td><td class="muted">${a}</td><td><span class="chip ${c}">${s}</span></td><td></td></tr>`).join("")}
      </table>
    </div>
  </div>`, { addr: "library.local/dashboard" })}
<div class="float" style="left:830px;top:388px;width:290px">
  <div class="row between"><span class="mono xs muted">docker compose ps</span><span class="chip ok">4 up</span></div>
  ${[["app", "php:8.2-fpm"], ["nginx", "nginx:alpine · :80"], ["db", "mysql:8"], ["mailer", "mailpit"]]
    .map(([n, i]) => `<div class="row g10 mono xs" style="margin-top:10px"><span class="led ok"></span><span style="width:52px">${n}</span><span class="dim">${i}</span></div>`).join("")}
</div>`,

  "attribute-import": () => `
${app(`
  <aside class="side" style="width:84px;padding:18px 0;background:#141416" class="col">
    ${["Dashboard", "Sales", "Catalog", "Stores", "System"].map((n) => `<div class="col" style="align-items:center;gap:6px;padding:10px 0;${n === "Stores" ? "background:rgba(76,201,255,.08);box-shadow:inset 2px 0 0 #4cc9ff;color:#ededef" : "color:#6b6b74"}"><span style="width:18px;height:18px;border-radius:5px;border:1.5px solid currentColor"></span><span style="font-size:9.5px">${n.toUpperCase()}</span></div>`).join("")}
  </aside>
  <main class="f1 col g16" style="padding:22px 28px">
    <div><div class="mono xs dim">Stores › Attributes › Import</div><div class="h1" style="margin-top:6px">Import attribute options</div></div>
    <div class="row g16" style="align-items:flex-start">
      <div class="col g12" style="width:300px">
        <div><div class="label">Attribute</div><div class="input row between">color <span class="muted xs">Visual Swatch ▾</span></div></div>
        <div><div class="label">CSV file</div><div class="input mono" style="border-style:dashed;color:#4cc9ff">color_options.csv</div></div>
        <div class="row g10"><span class="btn ghost">Check data</span><span class="btn">Import</span></div>
      </div>
      <div class="panel f1 code xs" style="padding:14px 16px;line-height:1.85"><span class="ok">✓ Validation passed · 6 options ready</span>
<span class="dim">INFO</span>  color · Red     <span class="dim">#FF0000</span>  created
<span class="dim">INFO</span>  color · Blue    <span class="dim">#0000FF</span>  created
<span class="warn">WARN</span>  color · Green   <span class="dim">exists</span>   skipped
<span class="dim">INFO</span>  color · Yellow  <span class="dim">#FFD700</span>  created
<span class="ok">✓ Import complete · 5 created, 1 skipped</span></div>
    </div>
  </main>`, { addr: "admin.store.local/admin/attributeimport" })}
<div class="float" style="left:420px;top:420px;width:470px;padding:14px 4px 4px">
  <div class="mono xs muted" style="padding:0 12px 10px">color_options.csv</div>
  <table style="font-size:11.5px">
    <tr><th>attribute_code</th><th>store_view</th><th>value</th><th>hex_code</th><th class="n">sort</th></tr>
    ${[["color", "default", "Red", "#FF0000", "1"], ["color", "fr", "Rouge", "#FF0000", "1"], ["color", "default", "Blue", "#0000FF", "2"]]
      .map(([a, s, v, h, o]) => `<tr><td class="mono">${a}</td><td class="muted">${s}</td><td>${v}</td><td class="mono"><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${h};margin-right:6px"></span>${h}</td><td class="n">${o}</td></tr>`).join("")}
  </table>
</div>`,

  "magento-features": () => `
${frame(`
  <div style="padding:22px 26px" class="code"><span class="k">$</span> robo up
<span class="dim">Starting services…</span>
<span class="ok">✓</span> php       <span class="dim">started</span>
<span class="ok">✓</span> nginx     <span class="dim">started</span>
<span class="ok">✓</span> varnish   <span class="dim">started</span>
<span class="ok">✓</span> redis     <span class="dim">started</span>
<span class="ok">✓</span> rabbitmq  <span class="dim">started</span>
Magento installed at <span class="ac">https://magento.local</span>

<span class="k">$</span> robo module:init Aichouch_ProductRelations
<span class="ok">✓</span> Module scaffolded · setup:upgrade · cache:flush

<span class="k">$</span> robo lint
PHPCS <span class="dim">(Magento2 standard)</span> + PHPStan level 8
<span class="ok">✓ No issues found in app/code</span></div>`, { addr: "magento-features — zsh", x: 90, w: 700 })}
<div class="float" style="left:730px;top:120px;width:380px;padding:18px">
  <div class="row between"><span class="h2">Docker stack</span><span class="chip ok"><span class="led"></span>healthy</span></div>
  ${[["varnish", "varnish:7.4", ":80"], ["nginx", "nginx:1.25", ":8080"], ["php", "php:8.3-fpm", "9000"], ["db", "mariadb:10.6", ":3306"], ["opensearch", "opensearch:2.12", ":9200"], ["redis", "redis:7.2", ":6379"], ["rabbitmq", "rabbitmq:3.13", ":5672"]]
    .map(([n, i, p]) => `<div class="row g10 small" style="margin-top:12px;padding-top:12px;border-top:1px solid #26262b"><span class="led ok"></span><span class="b" style="width:92px">${n}</span><span class="mono xs muted f1">${i}</span><span class="mono xs ac">${p}</span></div>`).join("")}
</div>`,
};

const page = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="stage"><div class="glow"></div><div class="grid"></div>${inner}<div class="fade"></div></div></body></html>`;

(async () => {
  const args = process.argv.slice(2);
  const preview = args.includes("--preview");
  const only = args.find((a) => !a.startsWith("--"));
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--allow-file-access-from-files", "--hide-scrollbars"] });
  const tab = await browser.newPage();
  await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 4 / 3 });
  const tmp = path.join(SHOTS, "_cover.html");
  const done = [];

  for (const [name, render] of Object.entries(COVERS)) {
    if (only && !name.startsWith(only)) continue;
    // Tall variants are for the featured bento card, which is roughly square on desktop
    await tab.setViewport({ width: 1200, height: TALL[name] || 630, deviceScaleFactor: 4 / 3 });
    fs.writeFileSync(tmp, page(render()));
    await tab.goto(url(tmp), { waitUntil: "load" });
    await tab.evaluate(() => document.fonts.ready);
    const file = path.join(OUT, `${name}.webp`);
    await tab.screenshot({ path: file, type: "webp", quality: 84 });
    done.push(file);
    console.log(`${name}.webp  ${(fs.statSync(file).size / 1024).toFixed(0)} kB`);
  }

  if (preview) {
    const sheet = path.join(SHOTS, "_sheet.html");
    fs.writeFileSync(sheet, `<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(3,600px);gap:6px">${done.map((f) => `<img src="${url(f)}" style="width:600px;display:block">`).join("")}</body>`);
    await tab.setViewport({ width: 1812, height: 400, deviceScaleFactor: 1 });
    await tab.goto(url(sheet), { waitUntil: "load" });
    await tab.screenshot({ path: path.join(SHOTS, "_sheet.png"), fullPage: true });
  }
  await browser.close();
})();
