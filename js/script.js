/* =====================================================================
   1. EDIT YOUR CONTENT HERE  (everything below is SAMPLE content)
   Leave a value empty ("" or []) and that link/section is hidden.
   To change the accent colour, edit --accent in css/style.css.
   ===================================================================== */
const CONFIG = {
  name: "Abhinav",                         // SAMPLE
  initials: "Abhi",
  title: "Data Scientist",
  roles: ["MERN Stack Developer", "Frontend Engineer", "Problem Solver"],
  greeting: "Hi, I'm Abhinav",
  headline: "I build fast, accessible web products.",
  intro: "Replace this with two sentences on what you do and the value you bring to teams and clients.",
  availability: "Open to new opportunities",  // "" hides the badge
  avatar: "https://assets.promptbase.com/DALLE_IMAGES%2FlELbK7hQNoh3o6K8KrNPZf0T7ZX2%2Fresized%2F1675484954569_800x800.webp",                                 // e.g. "assets/images/profile.jpg" (square, 800x800)
  resume: "",                                 // e.g. "assets/resume.pdf" ("" hides the button)

  about: {
    paragraphs: [
      "Hi, I'm [Name], a Data Scientist specializing in [mention specialty, e.g., machine learning / predictive modeling / natural language processing]. I bridge the gap between complex datasets and actionable business strategies, helping organizations transform raw numbers into high-impact products and decisions.",
      "Describe your background, how you got into this field, and the goals you are working toward."
    ],
    focus: ["Web applications", "APIs", "Performance", "Accessibility"],
    stats: [] // only add figures you can verify, e.g. { value: "3+", label: "Years of experience" }
  },

  skills: [ // SAMPLE: keep only what applies to you
    { group: "Frontend", icon: "layout", items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"] },
    { group: "Backend", icon: "server", items: ["Node.js", "Express", "REST APIs"] },
    { group: "Databases", icon: "database", items: ["MongoDB", "PostgreSQL"] },
    { group: "Tools and platforms", icon: "wrench", items: ["Git", "GitHub", "Docker", "Figma"] }
  ],

  projects: [ // image/live/code/caseStudy: leave "" to hide
    { title: "Sample Project One", category: "Web Development", icon: "layout-dashboard", image: "",
      desc: "One or two sentences on the problem this project solves.",
      features: ["Key feature or outcome", "Another key feature"],
      stack: ["React", "Node.js", "MongoDB"], live: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Web Development", icon: "shopping-cart", image: "",
      desc: "Describe what you built and who it is for.",
      features: ["What makes it useful"], stack: ["HTML", "Tailwind CSS", "JavaScript"], live: "", code: "", caseStudy: "" },
    { title: "Sample Analytics Report", category: "Data Analytics", icon: "bar-chart-3", image: "",
      desc: "Summarise the data, the question you answered and the insight you found.",
      features: ["Insight or decision it supported"], stack: ["Python", "Pandas", "Power BI"], live: "", code: "", caseStudy: "" },
    { title: "Sample ML Model", category: "Data Science", icon: "brain-circuit", image: "",
      desc: "Describe the model, the dataset and how you evaluated it.",
      features: ["Evaluation approach"], stack: ["Python", "scikit-learn"], live: "", code: "", caseStudy: "" }
  ],

  experience: [ // SAMPLE: replace with your real history
    { role: "Your Job Title", org: "Company Name", period: "Start date - End date",
      points: ["Describe a responsibility or achievement.", "Describe another one."], tags: ["React", "Node.js"] },
    { role: "Your Degree or Qualification", org: "Institution Name", period: "Start year - End year",
      points: ["Relevant coursework, thesis or academic projects."], tags: [] }
  ],

  certifications: [ // [] hides the whole section
    { title: "Certification or Award Name", issuer: "Issuing organisation", year: "Year", icon: "award" }
  ],

  contact: { // "" hides that card
    email: "hello@example.com",
    phone: "",                    // e.g. "+91 98765 43210"
    whatsapp: "",                 // country code + number, e.g. "919876543210"
    whatsappMessage: "Hi! I found your portfolio and would like to connect.",
    linkedin: "https://www.linkedin.com/in/your-username",
    github: "https://github.com/your-username",
    instagram: "",                // e.g. "https://www.instagram.com/your-username"
    location: ""                  // e.g. "Kozhikode, Kerala"
  }
};

/* =====================================================================
   2. APP LOGIC
   ===================================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = CONFIG, ct = C.contact;
  const icons = () => window.lucide && window.lucide.createIcons();
  const ext = (u) => (/^https?:/.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const hide = (id) => { const s = document.getElementById(id); if (s) s.remove(); };

  const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];

  /* ---- Static text ---- */
  function renderText() {
    document.title = `${C.name} | ${C.title} Portfolio`;
    $("#logo").textContent = C.initials || C.name;
    $("#hero-greeting").textContent = C.greeting;
    $("#hero-headline").textContent = C.headline;
    $("#hero-intro").textContent = C.intro;
    $("#footer-name").textContent = C.name;
    $("#footer-title").textContent = C.title;
    $("#footer-copy-name").textContent = C.name;
    $("#year").textContent = new Date().getFullYear();
    if (C.availability) { $("#hero-badge").hidden = false; $("#hero-badge-text").textContent = C.availability; }
    $("#hero-visual").innerHTML = `<div class="avatar">${C.avatar ? `<img src="${esc(C.avatar)}" alt="Portrait of ${esc(C.name)}" width="400" height="400">` : `<span aria-hidden="true">${esc(C.initials)}</span>`}</div>`;
  }

  /* ---- Socials & contact ---- */
  function socials() {
    const list = [[ct.github, "github", "GitHub"], [ct.linkedin, "linkedin", "LinkedIn"], [ct.instagram, "instagram", "Instagram"]].filter((s) => s[0]);
    return list.map(([u, i, l]) => `<a class="icon-btn" href="${esc(u)}"${ext(u)} aria-label="${l}"><i data-lucide="${i}" aria-hidden="true"></i></a>`).join("");
  }
  function renderContact() {
    const digits = (s) => String(s || "").replace(/\D/g, "");
    const wa = digits(ct.whatsapp);
    const items = [
      ct.email && { icon: "mail", label: "Email", value: ct.email, href: `mailto:${ct.email}` },
      ct.phone && { icon: "phone", label: "Phone", value: ct.phone, href: `tel:${ct.phone.replace(/[^\d+]/g, "")}` },
      wa && { icon: "message-circle", label: "WhatsApp", value: "Message me directly", href: `https://wa.me/${wa}${ct.whatsappMessage ? `?text=${encodeURIComponent(ct.whatsappMessage)}` : ""}` },
      ct.linkedin && { icon: "linkedin", label: "LinkedIn", value: "Connect professionally", href: ct.linkedin },
      ct.github && { icon: "github", label: "GitHub", value: "Browse my code", href: ct.github },
      ct.instagram && { icon: "instagram", label: "Instagram", value: "Follow along", href: ct.instagram },
      ct.location && { icon: "map-pin", label: "Location", value: ct.location }
    ].filter(Boolean);
    $("#contact-grid").innerHTML = items.map((i) => {
      const inner = `<span class="c-icon"><i data-lucide="${i.icon}" aria-hidden="true"></i></span><span><strong>${i.label}</strong><span class="v">${esc(i.value)}</span></span>`;
      return i.href ? `<a class="card contact-card reveal" href="${esc(i.href)}"${ext(i.href)}>${inner}</a>` : `<div class="card contact-card reveal">${inner}</div>`;
    }).join("");
    $("#hero-socials").innerHTML = socials();
    $("#footer-socials").innerHTML = socials();
  }

  /* ---- About ---- */
  function renderAbout() {
    const a = C.about;
    $("#about-text").innerHTML =
      a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("") +
      (a.focus.length ? `<div class="flex flex-wrap gap-2 pt-2">${a.focus.map((f) => `<span class="chip">${esc(f)}</span>`).join("")}</div>` : "") +
      (C.resume ? `<a class="btn btn-ghost mt-4" href="${esc(C.resume)}" download><i data-lucide="download" aria-hidden="true"></i>Download résumé</a>` : "");
    $("#about-side").innerHTML = a.stats.length
      ? `<div class="grid grid-cols-2 gap-4">${a.stats.map((s) => `<div class="card p-5"><p class="stat">${esc(s.value)}</p><p class="muted mt-2 text-sm">${esc(s.label)}</p></div>`).join("")}</div>`
      : "";
    if (!a.stats.length) $("#about-text").parentElement.classList.remove("md:grid-cols-[1.3fr_1fr]");
  }

  /* ---- Skills ---- */
  function renderSkills() {
    $("#skills-grid").innerHTML = C.skills.map((g) => `
      <div class="card skill-card reveal">
        <h3><i data-lucide="${esc(g.icon || "code-2")}" aria-hidden="true"></i>${esc(g.group)}</h3>
        <div class="flex flex-wrap gap-2">${g.items.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>`).join("");
  }

  /* ---- Projects + filtering ---- */
  function renderProjects() {
    const link = (u, label, icon) => (u ? `<a class="plink" href="${esc(u)}"${ext(u)}><i data-lucide="${icon}" aria-hidden="true"></i>${label}</a>` : "");
    $("#projects-grid").innerHTML = C.projects.map((p) => `
      <article class="card project reveal" data-cat="${esc(p.category)}">
        <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="400">` : `<i data-lucide="${esc(p.icon || "layout-dashboard")}" aria-hidden="true"></i>`}</div>
        <div class="flex grow flex-col gap-3 p-5">
          <h3 class="text-xl font-semibold">${esc(p.title)}</h3>
          <p class="muted text-sm">${esc(p.desc)}</p>
          ${p.features?.length ? `<ul class="feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
          <div class="flex flex-wrap gap-2">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          <div class="mt-auto flex flex-wrap gap-x-5 pt-2">${link(p.live, "Live demo", "external-link")}${link(p.code, "Source code", "github")}${link(p.caseStudy, "Case study", "book-open")}</div>
        </div>
      </article>`).join("");

    const cats = ["All", ...new Set(C.projects.map((p) => p.category))];
    const box = $("#filters");
    if (cats.length < 3) { box.remove(); return; }
    box.innerHTML = cats.map((c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
    box.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      $$(".filter", box).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $$(".project").forEach((card) => { card.hidden = b.dataset.filter !== "All" && card.dataset.cat !== b.dataset.filter; });
    });
  }

  /* ---- Experience & certifications ---- */
  function renderExperience() {
    $("#timeline").innerHTML = C.experience.map((e) => `
      <li class="t-item reveal">
        <p class="t-period">${esc(e.period)}</p>
        <div>
          <h3 class="text-xl font-semibold">${esc(e.role)}</h3>
          <p class="muted mb-3">${esc(e.org)}</p>
          ${e.points?.length ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
          ${e.tags?.length ? `<div class="mt-3 flex flex-wrap gap-2">${e.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
        </div>
      </li>`).join("");
  }
  function renderCerts() {
    $("#cert-grid").innerHTML = C.certifications.map((c) => `
      <div class="card contact-card reveal">
        <span class="c-icon"><i data-lucide="${esc(c.icon || "award")}" aria-hidden="true"></i></span>
        <span><strong>${esc(c.title)}</strong><span class="v">${esc([c.issuer, c.year].filter(Boolean).join(", "))}</span></span>
      </div>`).join("");
  }

  /* ---- Navigation ---- */
  function renderNav() {
    const links = NAV.filter(([id]) => document.getElementById(id));
    const html = links.map(([id, l]) => `<a class="nav-link" href="#${id}">${l}</a>`).join("");
    $("#nav-desktop").innerHTML = html;
    $("#nav-mobile").innerHTML = html;
    $("#nav-footer").innerHTML = links.map(([id, l]) => `<a class="muted" href="#${id}">${l}</a>`).join("");
  }
  function initMenu() {
    const btn = $("#menu-btn"), menu = $("#mobile-menu"), header = $(".header");
    const set = (open) => {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = `<i data-lucide="${open ? "x" : "menu"}" aria-hidden="true"></i>`; icons();
    };
    btn.addEventListener("click", () => set(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !header.contains(e.target)) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
    matchMedia("(min-width:1024px)").addEventListener("change", (m) => { if (m.matches) set(false); });
  }
  function initActiveNav() {
    const links = $$(".nav-link");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => { const on = a.getAttribute("href") === `#${en.target.id}`; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---- Theme ---- */
  function initTheme() {
    const root = document.documentElement, btn = $("#theme-toggle");
    const label = () => btn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    label();
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      $('meta[name="theme-color"]').setAttribute("content", next === "dark" ? "#0e1116" : "#f5f6f8");
      label();
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }

  /* ---- Animated role text ---- */
  function initRoles() {
    const el = $("#role-text"), roles = C.roles.filter(Boolean);
    $("#role-sr").textContent = roles.join(", ");
    if (!roles.length) return;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let i = 0, j = 0, del = false;
    (function tick() {
      const w = roles[i];
      el.textContent = w.slice(0, j);
      if (!del && j === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && j === 0) { del = false; i = (i + 1) % roles.length; }
      j += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    })();
  }

  /* ---- Init ---- */
  document.addEventListener("DOMContentLoaded", () => {
    renderText(); renderContact(); renderAbout();
    C.skills.length ? renderSkills() : hide("skills");
    C.projects.length ? renderProjects() : hide("projects");
    C.experience.length ? renderExperience() : hide("experience");
    C.certifications.length ? renderCerts() : hide("certifications");
    renderNav(); initMenu(); initTheme(); initRoles();
    $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
    window.addEventListener("load", icons);
    icons();
    initActiveNav(); initReveal();
  });
})();