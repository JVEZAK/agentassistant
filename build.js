// Agent Assistant static site builder — v1.5
// Usage: node build.js  → writes dist/. SITE controls canonicals, sitemap and llms.txt.
const fs = require("fs");
const path = require("path");
const D = require("./src/data.js");

const SITE = process.env.SITE || "https://getagentassistant.com";
const BRAND = "Agent Assistant";
const CSS = fs.readFileSync("src/style.css", "utf8");
const DATA_JS = fs.readFileSync("src/data.js", "utf8");
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@600;700&family=Public+Sans:wght@400;500;600;700;800&display=swap">`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const agentById = id => D.AGENTS.find(a => a.id === id);
const hrs = a => `${a.hours[0]}–${a.hours[1]} hours a week`;
const faq = qa => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

function page({ title, desc, urlPath, ld, body }) {
  const url = SITE + urlPath;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary">
${FONTS}
${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ""}
<style>${CSS}</style>
</head><body><div class="wrap">
<header class="top"><a class="brand" href="/">Agent <span>Assistant</span></a>
<nav class="links"><a href="/#finder">What can AI do for me?</a><a href="/agents/">Assistants</a><a href="/for/">Industries</a><a href="/#audit">Free audit</a></nav></header>
${body}
<footer><span>${BRAND} ${D.VERSION} · updated ${D.DATA_DATE}</span><span>Time savings are estimates and vary by business.</span></footer>
</div></body></html>
`;
}

// ---------- shared blocks ----------
function auditForm(industryId) {
  return `<section class="audit" id="audit">
<div><h2>Get a free 15-minute AI audit</h2>
<p>Tell us how your business runs. We'll come back with the three things worth automating first, what each would cost, and how long setup takes. No jargon, no obligation.</p>
<p class="small">We'll only use your details to reply to you.</p></div>
<form name="audit" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="bot-field">
<input type="hidden" name="form-name" value="audit">
<input type="hidden" name="recommended" id="rec-field" value="">
<p class="hp"><label>Leave this empty <input name="bot-field"></label></p>
<label for="f-name">Your name<input id="f-name" name="name" required autocomplete="name"></label>
<label for="f-biz">Business name<input id="f-biz" name="business" required autocomplete="organization"></label>
<label for="f-ind">Type of business<select id="f-ind" name="industry">${D.INDUSTRIES.map(i => `<option value="${esc(i.name)}"${i.id === industryId ? " selected" : ""}>${esc(i.name)}</option>`).join("")}<option value="Other">Other</option></select></label>
<label for="f-email">Email<input id="f-email" name="email" type="email" required autocomplete="email"></label>
<label for="f-phone">Phone (optional)<input id="f-phone" name="phone" type="tel" autocomplete="tel"></label>
<label for="f-msg">What eats most of your time?<textarea id="f-msg" name="message" rows="3" placeholder="e.g. I miss calls while I'm on jobs and spend Sunday nights writing quotes"></textarea></label>
<button class="btn" type="submit">Request my free audit</button>
</form></section>`;
}
function agentCards(list, rel) {
  return `<div class="grid">${list.map(a => `<div class="card"><h3>${esc(a.name)}</h3><p>${esc(a.short)}. ${esc(a.what)}</p><span class="saves">Saves an estimated ${hrs(a)}</span><a class="more" href="${rel}agents/${a.id}/">How it works →</a></div>`).join("")}</div>`;
}
const industryChips = () => `<div class="chips">${D.INDUSTRIES.map(i => `<a href="/for/${i.id}/">${esc(i.name)}</a>`).join("")}</div>`;
const howItWorks = `<h2>How it works</h2>
<ol class="steps"><li><div><strong>Free audit.</strong> A 15-minute call or form. We find the jobs worth automating first.</div></li>
<li><div><strong>You fill in one simple form.</strong> Your hours, services, prices and how you like to talk to customers.</div></li>
<li><div><strong>We set it up and test it.</strong> You approve access to your phone number, calendar or website, and we do the rest.</div></li>
<li><div><strong>It runs, and you get a monthly report.</strong> Calls answered, jobs booked, reviews gained, time saved.</div></li></ol>`;

// ---------- home ----------
const homeFaq = [
  ["What is an AI agent for a small business?", "It's an assistant that handles one routine job for you automatically, like texting back missed callers, answering website questions, asking for reviews, drafting quotes or chasing late payments. You stay in control and approve anything important."],
  ["Do I need to understand AI to use this?", "No. You answer a few plain questions about your business and we set everything up. You'll see what it does in a simple monthly report."],
  ["Will it sound like a robot?", "It's set up with your business name, your services and the way you talk to customers. Anything it can't answer goes straight to you."],
  ["Which AI assistant should a small business start with?", "Most service businesses get the fastest win from missed-call text-back, because every unanswered call is a job that might go to a competitor. Businesses with lots of website traffic often start with a website chat assistant."]
];
function home() {
  const body = `
<h1>What can AI do for your business? Find out in <mark>60 seconds</mark>.</h1>
<p class="lede">Answer three quick questions. We'll show you the AI assistants that would save you the most time, in plain English, with no tech knowledge needed.</p>
<section class="finder" id="finder" aria-label="AI assistant finder">
<label class="q" for="q-ind"><span>1. What kind of business do you run?</span>
<select id="q-ind"><option value="">Choose one</option>${D.INDUSTRIES.map(i => `<option value="${i.id}">${esc(i.name)}</option>`).join("")}<option value="other">Something else</option></select></label>
<div class="q"><span>2. What wastes your time? <em>(pick any)</em></span><div class="pills">${D.PAINS.map(([k, t]) => `<label class="pill"><input type="checkbox" name="pain" value="${k}">${esc(t)}</label>`).join("")}</div></div>
<div class="q"><span>3. How do most new customers reach you?</span><div class="pills">
<label class="pill"><input type="radio" name="ch" value="phone" checked>Phone calls</label>
<label class="pill"><input type="radio" name="ch" value="web">My website</label>
<label class="pill"><input type="radio" name="ch" value="both">Both</label></div></div>
<div class="results" id="results" aria-live="polite"></div>
</section>
<h2 id="assistants">The assistants we set up</h2>
<p class="lede">Each one does a single job well. Start with one and add more later.</p>
${agentCards(D.AGENTS, "/")}
<h2>Built for your kind of business</h2>
${industryChips()}
${howItWorks}
<h2>Common questions</h2>
${homeFaq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}
${auditForm("")}
<script>${DATA_JS}</script>
<script>
(function(){
  const $=s=>document.querySelector(s), res=$("#results");
  function recommend(){
    const ind=AA.INDUSTRIES.find(i=>i.id===$("#q-ind").value);
    const pains=[...document.querySelectorAll('input[name=pain]:checked')].map(i=>i.value);
    const ch=(document.querySelector('input[name=ch]:checked')||{}).value;
    const score=new Map(AA.AGENTS.map(a=>[a.id,0]));
    if(ind) ind.top.forEach((id,i)=>score.set(id,score.get(id)+3-i));
    AA.AGENTS.forEach(a=>a.pains.forEach(p=>{if(pains.includes(p))score.set(a.id,score.get(a.id)+3)}));
    if(ch==="phone"||ch==="both")score.set("missed-call",score.get("missed-call")+2);
    if(ch==="web"||ch==="both")score.set("website-chat",score.get("website-chat")+2);
    const top=AA.AGENTS.slice().sort((a,b)=>score.get(b.id)-score.get(a.id)).slice(0,3);
    const lo=top.reduce((s,a)=>s+a.hours[0],0), hi=top.reduce((s,a)=>s+a.hours[1],0);
    const who=ind?"your "+ind.one:"your business";
    res.innerHTML='<h3>Your top 3 AI assistants</h3>'+top.map(a=>{
      const hit=AA.PAINS.filter(([k])=>a.pains.includes(k)&&pains.includes(k)).map(([,t])=>t);
      const why=hit.length?"Because you said: “"+hit[0]+"”.":(ind&&ind.top.includes(a.id)?"One of the most useful assistants for "+ind.name.toLowerCase()+".":"A quick win for most small businesses.");
      return '<div class="rec"><strong>'+a.name+'</strong><span>'+a.what+'</span><span class="why">'+why+'</span><span class="saves">Saves an estimated '+a.hours[0]+'–'+a.hours[1]+' hours a week · <a href="/agents/'+a.id+'/">How it works</a></span></div>';
    }).join("")+'<p><strong>Together, these could give '+who+' back an estimated '+lo+'–'+hi+' hours a week.</strong></p><p><a class="btn" href="#audit">Get these set up: free audit</a></p>';
    $("#rec-field").value=top.map(a=>a.name).join(", ");
    if(ind){const s=$("#f-ind");[...s.options].forEach(o=>{if(o.value===ind.name)s.value=o.value})}
  }
  document.querySelector("#finder").addEventListener("change",recommend);
  recommend();
})();
</script>`;
  return page({ title: `${BRAND}: what can AI do for your small business?`, desc: "Answer three quick questions and see which AI assistants would save your small business the most time: missed-call text-back, website chat, review requests, quotes and payment reminders.", urlPath: "/", ld: faq(homeFaq), body });
}

// ---------- agents ----------
function agentsIndex() {
  const body = `<h1>AI assistants for small businesses</h1><p class="lede">Five assistants, each doing one routine job for you. Pick the one that fixes your biggest headache first.</p>${agentCards(D.AGENTS, "/")}${auditForm("")}`;
  return page({ title: `AI assistants for small businesses | ${BRAND}`, desc: "Missed-call text-back, website chat, review requests, quote drafting and payment reminders: what each AI assistant does and how much time it saves.", urlPath: "/agents/", body });
}
function agentPage(a) {
  const inds = D.INDUSTRIES.filter(i => i.top.includes(a.id));
  const answer = `${a.name}: ${a.what} For most small businesses it saves an estimated ${hrs(a)}.`;
  const body = `<p class="crumb"><a href="/agents/">Assistants</a> / ${esc(a.name)}</p>
<h1>${esc(a.name)}: ${esc(a.short.toLowerCase())}</h1>
<p class="answer">${esc(answer)}</p>
<h2>How it works</h2><ol class="steps">${a.steps.map(s => `<li><div>${esc(s)}</div></li>`).join("")}</ol>
<h2>What we need from you</h2><ul class="plain">${a.needs.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
<p class="note">You approve access to your own accounts during setup, and you can switch the assistant off any time.</p>
${inds.length ? `<h2>Popular with</h2><div class="chips">${inds.map(i => `<a href="/for/${i.id}/">${esc(i.name)}</a>`).join("")}</div>` : ""}
<h2>Other assistants</h2>${agentCards(D.AGENTS.filter(x => x !== a), "/")}
${auditForm("")}`;
  return page({ title: `${a.name} for small businesses | ${BRAND}`, desc: answer.slice(0, 300), urlPath: `/agents/${a.id}/`, ld: faq([[`What does a ${a.name.toLowerCase()} do for a small business?`, answer]]), body });
}

// ---------- industries ----------
function industriesIndex() {
  const body = `<h1>AI assistants by industry</h1><p class="lede">See which assistants make the biggest difference for businesses like yours.</p>${industryChips()}${auditForm("")}`;
  return page({ title: `AI assistants by industry | ${BRAND}`, desc: "Which AI assistants help plumbers, HVAC companies, electricians, landscapers, roofers, cleaners, dental offices, auto shops, salons and restaurants the most.", urlPath: "/for/", body });
}
function industryPage(i) {
  const top = i.top.map(agentById);
  const lo = top.reduce((s, a) => s + a.hours[0], 0), hi = top.reduce((s, a) => s + a.hours[1], 0);
  const answer = `The three AI assistants that help ${i.name.toLowerCase()} most are ${top.map(a => a.noun).join(", ").replace(/, ([^,]*)$/, " and $1")}. Together they could save a typical ${i.one} an estimated ${lo}–${hi} hours a week, without hiring anyone.`;
  const body = `<p class="crumb"><a href="/for/">Industries</a> / ${esc(i.name)}</p>
<h1>AI assistants for ${esc(i.name.toLowerCase())}</h1>
<p class="answer">${esc(answer)}</p>
<h2>Sound familiar?</h2><ul class="plain">${i.pains.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
<h2>What we'd set up first</h2>
${top.map((a, n) => `<div class="rec"><strong>${n + 1}. ${esc(a.name)}</strong><span>${esc(a.what)}</span><span class="saves">Saves an estimated ${hrs(a)} · <a href="/agents/${a.id}/">How it works</a></span></div>`).join("")}
${howItWorks}
<h2>Other industries</h2>${industryChips()}
${auditForm(i.id)}`;
  return page({ title: `AI assistants for ${i.name.toLowerCase()}: save hours every week | ${BRAND}`, desc: answer.slice(0, 300), urlPath: `/for/${i.id}/`, ld: faq([[`What AI tools help ${i.name.toLowerCase()} the most?`, answer]]), body });
}
function thanks() {
  const body = `<h1>Thanks, we've got it.</h1><p class="lede">We'll look at how your business runs and reply within one business day with the three things worth automating first.</p><p><a class="btn ghost" href="/">Back to the homepage</a></p>`;
  return page({ title: `Thanks | ${BRAND}`, desc: "Your free AI audit request was received.", urlPath: "/thanks/", body }).replace("<head>", '<head><meta name="robots" content="noindex">');
}

// ---------- write ----------
function write(rel, content) { const p = path.join("dist", rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, content); }
fs.rmSync("dist", { recursive: true, force: true });
const urls = ["/"];
write("index.html", home());
write("agents/index.html", agentsIndex()); urls.push("/agents/");
D.AGENTS.forEach(a => { write(`agents/${a.id}/index.html`, agentPage(a)); urls.push(`/agents/${a.id}/`); });
write("for/index.html", industriesIndex()); urls.push("/for/");
D.INDUSTRIES.forEach(i => { write(`for/${i.id}/index.html`, industryPage(i)); urls.push(`/for/${i.id}/`); });
write("thanks/index.html", thanks());
if (fs.existsSync("static")) for (const f of fs.readdirSync("static")) fs.copyFileSync(path.join("static", f), path.join("dist", f));
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: ${SITE}/sitemap.xml\n`);
write("llms.txt", [`# ${BRAND}`, "", `> ${BRAND} helps small businesses find and set up AI assistants that each handle one routine job: answering missed calls, website chat, review requests, quotes and payment reminders. Free audit at ${SITE}/#audit.`, "", "## Assistants",
  ...D.AGENTS.map(a => `- [${a.name}](${SITE}/agents/${a.id}/): ${a.what} Estimated time saved: ${hrs(a)}.`), "", "## By industry",
  ...D.INDUSTRIES.map(i => `- [${i.name}](${SITE}/for/${i.id}/): start with ${i.top.map(id => agentById(id).name).join(", ")}.`), ""].join("\n"));
console.log(`Built ${D.VERSION}: home + ${D.AGENTS.length + 1} assistant pages + ${D.INDUSTRIES.length + 1} industry pages for ${SITE}`);
