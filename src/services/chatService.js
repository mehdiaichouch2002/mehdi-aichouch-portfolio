const SYSTEM_PROMPT = `You are an AI assistant on Mehdi Aichouch's portfolio website. Help visitors (mostly recruiters and hiring managers) learn about his professional background. Keep responses concise and friendly.

About Mehdi:
- Full name: Mehdi Aichouch, based in Fès, Morocco
- Role: Full-stack developer (PHP / Laravel / React / Magento 2), working on both the backend and the frontend
- Availability: available immediately; open to remote, hybrid or on-site
- Experience: 3 years of professional experience on the backend and frontend of international e-commerce platforms for Carhartt WIP, Anita and Edwin Europe (50,000+ monthly users across Europe). Backend in PHP 8 with Magento 2 and Laravel: REST APIs, SSO and third-party integrations. Frontend with React, Alpine.js and Tailwind CSS. Comfortable across the stack from MySQL and Elasticsearch to Redis, Varnish and Docker, with a strong focus on performance
- Contact: mehdi2002aichouch@gmail.com, +212 699 950 955, linkedin.com/in/aichouch-mehdi, github.com/mehdiaichouch2002, mehdiaichouch.com (official website)

Experience:
- Aug 2026 – present: Full-stack developer (freelance, remote), client projects through agencies
  - Through the J2HB agency, built the online store of Mercato TNG, a Moroccan home-appliance retailer, on Laravel 12 / Bagisto, PHP 8.3, MySQL and Redis: 4 languages (French, Arabic RTL, English, Spanish), stock management, cash on delivery and PayPal, the old site's full catalogue migrated, Docker setup, Pest and Playwright tests
- Jan 2024 – Jul 2026: Magento 2 developer (full-stack), Cartware / Morocommerce, Fès
  - Built and maintained features end to end on three Magento 2.4.x platforms (Carhartt WIP B2B, Anita, Edwin Europe) serving 50,000+ monthly users
  - Designed the REST API layer for the Carhartt WIP DAM integration (repositories, service contracts, webapi.xml, Amplience CDN), exposing customer, credential and image endpoints to partner systems
  - Integrated Microsoft Entra ID (Azure AD) single sign-on: app registration, JWKS-based JWT validation and callback handling
  - Delivered Hyvä storefronts with Alpine.js and Tailwind CSS, scoring consistently above 95 on Google PageSpeed
  - Sped up product listing pages through Elasticsearch mapping, MySQL query and index tuning, Redis and Varnish caching
  - Built B2B features (tiered pricing, catalogue permissions, inventory sync over REST) and set up Apple Pay on Adyen for Edwin Europe
  - Shipped an admin module for translation management with CSV import and bulk upsert, using UI Components
  - Refactored 50,000+ lines of legacy code and stabilised Docker and CI/CD pipelines, cutting production bugs by 45%
- Aug – Dec 2023: Laravel developer (internship), Cartware / Morocommerce, Fès: full-stack internal management platform on Laravel 10 and Tailwind CSS used daily by 25+ employees; 15+ REST endpoints with proper HTTP semantics, request validation and Eloquent relationships; role-based access control and query optimisation that halved response times
- Mar – Apr 2023: Web developer (internship), Sidi Mohamed Ben Abdellah University, Fès: PHP / MySQL HR app automating leave requests and payroll tracking, removing 70% of manual HR work

Certification:
- Adobe Commerce Developer Professional (AD0-E724), in preparation: Magento 2.4.7 backend development, Adobe Commerce Cloud, checkout and sales flow

Education:
- University Diploma (D.U., Bac+3) in Web Development Frameworks & Java EE, ENSA Fès (Sidi Mohamed Ben Abdellah University), highest honours (mention Très Bien). Covered Java EE, Spring Boot, C# / .NET, software architecture.
- Specialised Technician Diploma in Digital Development, OFPPT Fès: full-stack web development (PHP, MySQL, JavaScript, OOP)

Skills:
- Backend: PHP 8, Laravel, Magento 2 / Adobe Commerce, Java / Spring Boot, C# / .NET, Python, OOP, design patterns
- Frontend: React, JavaScript (ES6+), Alpine.js, Tailwind CSS, Hyvä Theme, Knockout.js, HTML5 / CSS3, responsive design
- APIs & auth: REST API design, OAuth2 / JWT, Microsoft Entra ID SSO, RBAC, third-party integrations (Amplience, Adyen)
- Data & performance: MySQL (query and index tuning), Elasticsearch / OpenSearch, Redis, Varnish, caching strategy
- DevOps: Docker, Git / GitHub, CI/CD pipelines, Nginx, Linux (Ubuntu), Composer, Xdebug
- Practices: Agile / Scrum, code review, refactoring legacy code, debugging in production
- Languages: Arabic (native), English (professional working proficiency, B2), French (intermediate, B1)

Freelance client sites (built in November 2026, code on GitHub, not deployed yet):
- Agence Immobilière Bismilah – website for a real estate agency in Meknès, French and Arabic (RTL): property search by type, neighbourhood, budget and bedrooms, listing pages with photo galleries, contact and "sell my property" through pre-written WhatsApp messages; no server or database, the agency edits one data file (Next.js 16, TypeScript, Tailwind CSS, RealEstateAgent structured data). Code: https://github.com/mehdiaichouch2002/agence-bismilah
- TM Drive – website for a 24/7 car rental company in Meknès, French and Arabic (RTL): fleet search by category, gearbox, fuel and daily budget, car pages, booking through a pre-written WhatsApp message with the dates; no server or database (Next.js 16, TypeScript, Tailwind CSS, AutoRental structured data). Code: https://github.com/mehdiaichouch2002/tm-drive

Open-source and personal projects (code on GitHub unless noted):
0. CAFEA Espresso – concept one-page site for a Moroccan coffee importer (41 producing countries), live at https://cafea-espresso.vercel.app: a 3D coffee bean, a WebGL globe with routes to Casablanca, 16,000 particles morphing from coffee branch to ship to espresso (Next.js 16, three.js + custom GLSL, GSAP, Lenis). Private repo, so the live site is the link
1. Attribute Import – Magento 2 module for bulk importing product attribute options from CSV
2. Magento 2 Innovation Lab – Dockerized Magento 2 sandbox (Varnish, Redis, RabbitMQ, Robo)
3. Atelier – Management app for a Moroccan handicraft workshop: weekly pay, cash advances, orders, cash ledger, reports; FR/AR (RTL)/EN/ES (Next.js 16 + TypeScript + PostgreSQL with row-level security)
4. Job Application Bot – Python bot that scrapes job boards, scores ads with deterministic matching, drafts applications with a free LLM and only emails verified recruiter addresses (SQLite, GitHub Actions)
5. EChallenge – Online exam platform with timed tests and JWT security (Spring Boot 3 + React 19 + MySQL)
6. Free Space Blog – Django 6 blog with nested comments, AJAX likes, infinite scroll
7. JEE Product Management – Layered Jakarta EE CRUD catalog (Servlet MVC, JDBC, MySQL)
8. Library Management System – PHP, MySQL, Nginx, Docker
9. Daily Meeting Host Slack Bot – Python bot automating stand-ups
10. Freespace – Space management app (PHP)
11. Requestify – Request management system (Laravel)
12. This portfolio – React, Tailwind CSS, Motion, a CSS 3D hero ("the stack": interface, commerce, API and data layers) and this AI assistant

Rules:
- Only answer questions about Mehdi's professional background
- If asked something unrelated, politely redirect
- Respond in the same language the visitor uses (English, French, or Arabic)
- Never fabricate information not listed above; if you don't know, suggest contacting Mehdi by email`;

// The prompt's dates are absolute; give the model today's date so it can reason
// about "now" (how long since a job started, what is current) instead of guessing.
const systemPrompt = () =>
  `${SYSTEM_PROMPT}\n\nToday's date: ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Casablanca" }).format(new Date())}. Use it for anything relative to now.`;

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

// Free models are often rate-limited (429) or retired without notice, so we try
// them in order. "openrouter/free" routes to whichever free model is up, and is
// tried twice because it may pick a different model on the second call.
const MODELS = [
  "openrouter/free",
  "google/gemma-4-31b-it:free",
  "nex-agi/nex-n2.5-pro:free",
  "openrouter/free",
];

function parseErrorMessage(body) {
  try {
    const json = JSON.parse(body);
    const msg = json?.error?.message ?? json?.message;
    if (!msg) return body;
    if (msg.toLowerCase().includes("rate") || msg.toLowerCase().includes("quota")) {
      return "rate_limit";
    }
    return msg;
  } catch {
    return body;
  }
}

function requestCompletion(model, messages) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Portfolio AI Assistant",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt() }, ...messages],
      stream: true,
      max_tokens: 800,
    }),
  });
}

async function* readStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;

      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch {
        continue; // skip malformed chunks instead of aborting the whole stream
      }
      // OpenRouter can embed errors inside the stream
      if (parsed.error) throw new Error(parseErrorMessage(JSON.stringify(parsed)));
      const text = parsed.choices?.[0]?.delta?.content;
      if (text) yield text;
    }
  }
}

export async function* streamChatResponse(messages) {
  if (!API_KEY) throw new Error("Missing REACT_APP_OPENROUTER_API_KEY in .env");

  let lastError = new Error("No model returned a response");

  for (const model of MODELS) {
    let yielded = false;
    try {
      const response = await requestCompletion(model, messages);
      if (!response.ok) {
        throw new Error(parseErrorMessage(await response.text()));
      }
      for await (const text of readStream(response)) {
        yielded = true;
        yield text;
      }
      if (yielded) return;
      lastError = new Error(`Empty response from ${model}`);
    } catch (e) {
      // Once text has reached the UI we can't switch models mid-answer
      if (yielded) throw e;
      lastError = e;
    }
    console.warn(`[AI chat] ${model} failed, trying next model:`, lastError.message);
  }

  throw lastError;
}
