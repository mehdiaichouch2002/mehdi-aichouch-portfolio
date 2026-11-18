const translations = {
  en: {
    // <title> and meta description (scripts/seo/prerender.js writes them into the HTML)
    seo: {
      title: "Mehdi Aichouch | Full-Stack Developer & Magento 2 Specialist",
      description:
        "Official portfolio of Mehdi Aichouch, full-stack developer in Fès, Morocco. Magento 2 / Adobe Commerce, PHP, Laravel and React for international e-commerce.",
      jobTitle: "Full-Stack Developer",
      // One line that tells this Mehdi Aichouch apart from namesakes (Person schema)
      disambiguation: "Full-stack developer in Fès, Morocco, specialised in Magento 2 / Adobe Commerce, PHP, Laravel and React.",
    },
    nav: {
      home: "Home",
      about: "About",
      portfolio: "Work",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    home: {
      // Two lines; the word between asterisks is set in the accent color
      headline: ["Full-stack developer.", "I build *anything* for the web."],
      eyebrow: "Mehdi Aichouch · Fès, Morocco",
      subline: "PHP, Laravel, React and Magento 2, on e-commerce platforms for European brands.",
      cta: "See my work",
      contactCta: "Get in touch",
      resume: "Download resume",
      availability: "Available immediately · Based in Fès, Morocco · Open to remote, hybrid or on-site",
      liveStores: "Live stores I've worked on",
      visualAlt: "The layers of a web app: interface, commerce, API and data",
      stack: { interface: "interface", commerce: "commerce", api: "api", data: "data" },
    },
    about: {
      title: "About",
      lead:
        "I'm Mehdi Aichouch, a full-stack web developer with 3 years on the backend and frontend of international e-commerce platforms for Carhartt WIP, Anita and Edwin Europe, serving 50,000+ monthly users across Europe. Backend in PHP 8 with Magento 2 and Laravel, frontend with React, Alpine.js and Tailwind CSS, with a strong focus on performance.",
      photoAlt: "Portrait of Mehdi Aichouch",
      intro:
        "At Cartware / Morocommerce in Fès from 2024 to 2026, freelance since August 2026. Backed by a Bac+3 university diploma in web development frameworks and Java EE, and preparing the Adobe Commerce Developer Professional certification (AD0-E724).",
    },
    timeline: {
      title: "Experience",
      intro: "Jobs and freelance work, most recent first.",
      educationTitle: "Education",
      certificationTitle: "Certification",
    },
    portfolio: {
      title: "Work",
      description: "Client stores first, then open-source and personal projects.",
      live: "Live",
      role: "My role",
      clientRole: "Magento 2 developer (full-stack) at Cartware / Morocommerce",
      opensNewTab: "opens in a new tab",
      otherTitle: "Freelance, open-source and personal projects",
      otherDescription: "Client sites, Magento modules, web apps and tools, most with the source code on GitHub.",
      // Label in the project dialog, by category (client stores use caseStudy)
      kind: { freelance: "Client site", opensource: "Open source", personal: "Personal project" },
      viewCode: "View code",
      showAll: "Show all {count} projects",
      showLess: "Show fewer",
      clientTitle: "Client stores",
      details: "Details",
      caseStudy: "Case study",
      close: "Close",
      visitStore: "Visit the store",
      visitSite: "Visit the site",
      // Cover image alt text: real screenshots for live sites, drawn covers for the rest
      screenshotAlt: "Screenshot of the {title} website",
      coverAlt: "{title} project cover",
      projects: {
        bismilah:
          "Website for a real estate agency in Meknès, in French and Arabic (right-to-left). Visitors filter properties for sale or rent by type, neighbourhood, budget and bedrooms, open a listing with its photo gallery, and send the agency a pre-written WhatsApp message. Owners can submit a property the same way. No server or database: the agency edits listings, hours and reviews in one data file. Next.js 16, TypeScript, Tailwind CSS, RealEstateAgent structured data.",
        tmdrive:
          "Website for a car rental company in Meknès, open 24/7, in French and Arabic (right-to-left). Visitors filter cars by category, gearbox, fuel and daily budget, check a car's details, and book by sending their dates in a pre-written WhatsApp message. No server or database: the owner edits the fleet, prices and hours in one data file. Next.js 16, TypeScript, Tailwind CSS, AutoRental structured data.",
        carhartt:
          "B2B wholesale store for Carhartt WIP's retail partners. I designed the REST API layer for the digital asset integration (Amplience CDN), integrated Microsoft Entra ID single sign-on, and built B2B features: tiered pricing, catalogue permissions and inventory sync over REST.",
        anita:
          "Online store for the German lingerie and swimwear brand, on Magento 2.4. I built and maintained features end to end, from backend modules to the storefront.",
        edwin:
          "European online store for the Japanese denim brand, on Magento 2.4. I built features end to end and set up Apple Pay on Adyen.",
        cafea:
          "Concept one-page site for CAFEA Espresso, a Moroccan importer of coffee from 41 countries, told as one scroll story from the farm to the cup: a 3D coffee bean, a WebGL globe with routes to Casablanca, and 16,000 particles that morph from a coffee branch into a ship, a roaster and an espresso. Next.js 16, three.js with custom GLSL, GSAP and Lenis.",
        freespace: "Application for managing spaces, written in PHP.",
        requestify: "Request management system built with Laravel.",
        portfolio: "This site: React, Tailwind CSS, Motion, a CSS 3D hero and an AI assistant that answers questions about my work.",
        slackbot:
          "Python Slack bot that automatically hosts and manages daily stand-up meetings.",
        library:
          "Dockerized system with book cataloging, user auth, and automated borrowing workflows.",
        attributeImport:
          "Magento 2 module for bulk importing product attribute options from CSV files via the Admin Panel.",
        magentoFeatures:
          "Fully Dockerized Magento 2 sandbox with Varnish, Redis, RabbitMQ, and Robo task runner for developing production-quality custom modules.",
        echallenge:
          "Online exam platform with timed tests, slot booking and admin management. Spring Boot 3 REST API secured with JWT, React 19 front end.",
        freespaceBlog:
          "Django 6 blog platform with featured-post slider, nested comments, AJAX likes, infinite scroll, and user profiles.",
        jeeProducts:
          "Layered Jakarta EE product catalog with full CRUD, servlet MVC controller, and JDBC DAO on MySQL.",
        atelier:
          "Management app for a Moroccan handicraft workshop: weekly pay, cash advances, customer orders, expenses and a single cash ledger, with 13 reports. Next.js 16 and PostgreSQL row-level security, in French, Arabic (RTL), English and Spanish.",
        jobBot:
          "Python bot that scrapes seven job boards, scores each ad against my profile with deterministic matching, drafts applications with a free LLM, and only emails verified recruiter addresses. Runs on a GitHub Actions schedule.",
      },
    },
    skills: {
      title: "Skills",
      description: "What I use day to day, grouped by area.",
      groups: {
        backend: "Backend",
        frontend: "Frontend",
        apis: "APIs and auth",
        data: "Data and performance",
        devops: "DevOps",
        practices: "Practices",
        languages: "Spoken languages",
      },
      terms: {},
      spoken: ["Arabic, native", "English, professional (B2)", "French, intermediate (B1)"],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Hiring for a full-stack, Laravel or Magento role, or need help with a store? Send me a message here or by email.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sending: "Sending…",
      cta: "Send message",
      resume: "Resume",
      direct: "Or reach me directly",
      copyEmail: "Copy email address",
      copied: "Copied",
      errors: {
        name: "Enter your name",
        email: "Enter a valid email address, like name@company.com",
        message: "Enter a message",
      },
    },
    notification: {
      success: "Message sent. I'll reply by email.",
      error: "Your message wasn't sent. Check your connection and try again, or email me directly.",
    },
    resumeModal: {
      title: "Download my resume",
      subtitle: "Full-stack developer, one PDF per language.",
      english: "English (PDF)",
      french: "French (PDF)",
      cancel: "Close",
    },
    footer: {
      location: "Fès, Morocco.",
      backToTop: "Back to top",
      localTime: "Local time in Fès",
      builtWith: "Built with React and Tailwind CSS.",
    },
    chat: {
      open: "Ask AI",
      close: "Close",
      title: "Ask about my work",
      subtitle: "AI assistant that knows my resume",
      greeting: "Ask about my experience, projects or skills. The assistant answers from my resume.",
      suggestions: [
        "What did Mehdi build at Morocommerce?",
        "Which Magento projects has he worked on?",
        "What's his tech stack?",
      ],
      placeholder: "Ask a question",
      disclaimer: "AI answers can be wrong. Check the resume for details.",
    },
    experience: [
      {
        org: "Self-employed · Remote",
        role: "Full-stack developer (freelance)",
        date: "Aug 2026 – Present",
        note: "Client projects through agencies.",
        points: [
          "Through the J2HB agency, built the online store of Mercato TNG, a Moroccan home-appliance retailer, on Laravel 12 / Bagisto, PHP 8.3, MySQL and Redis: 4 languages (French, Arabic RTL, English, Spanish), stock management, cash on delivery and PayPal, the old site's full catalogue migrated, Docker setup, Pest and Playwright tests.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Magento 2 developer (full-stack)",
        date: "Jan 2024 – Jul 2026",
        points: [
          "Built and maintained features end to end on three Magento 2.4.x platforms (Carhartt WIP B2B, Anita, Edwin Europe) serving 50,000+ monthly users.",
          "Designed the REST API layer for the Carhartt WIP DAM integration (repositories, service contracts, webapi.xml, Amplience CDN), exposing customer, credential and image endpoints to partner systems.",
          "Integrated Microsoft Entra ID (Azure AD) single sign-on: app registration, JWKS-based JWT validation and callback handling.",
          "Delivered Hyvä storefronts with Alpine.js and Tailwind CSS, scoring consistently above 95 on Google PageSpeed.",
          "Sped up product listing pages through Elasticsearch mapping, MySQL query and index tuning, Redis and Varnish caching.",
          "Built B2B features (tiered pricing, catalogue permissions, inventory sync over REST) and set up Apple Pay on Adyen for Edwin Europe.",
          "Shipped an admin module for translation management with CSV import and bulk upsert, using UI Components.",
          "Refactored 50,000+ lines of legacy code and stabilised Docker and CI/CD pipelines, cutting production bugs by 45%.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Laravel developer (internship)",
        date: "Aug – Dec 2023",
        points: [
          "Built a full-stack internal management platform with Laravel 10 and Tailwind CSS, used daily by 25+ employees.",
          "Designed 15+ REST endpoints with proper HTTP semantics, request validation and Eloquent relationships.",
          "Implemented role-based access control and optimised the underlying queries, halving response times.",
        ],
      },
      {
        org: "Sidi Mohamed Ben Abdellah University, Fès",
        role: "Web developer (internship)",
        date: "Mar – Apr 2023",
        points: [
          "Built a PHP / MySQL HR app automating leave requests and payroll tracking, removing 70% of manual HR work.",
        ],
      },
    ],
    education: [
      {
        org: "ENSA Fès, Sidi Mohamed Ben Abdellah University",
        degree: "University Diploma (D.U., Bac+3) in Web Development Frameworks & Java EE",
        note: "Highest honours (mention Très Bien). Java EE, Spring Boot, C# / .NET, software architecture.",
      },
      {
        org: "OFPPT, Fès",
        degree: "Specialised technician diploma in digital development",
        note: "Full-stack web development: PHP, MySQL, JavaScript, OOP.",
      },
    ],
    certification: {
      name: "Adobe Commerce Developer Professional (AD0-E724)",
      status: "In preparation",
      note: "Magento 2.4.7 backend development, Adobe Commerce Cloud, checkout and sales flow.",
    },
  },

  fr: {
    seo: {
      title: "Mehdi Aichouch | Développeur Full-Stack & Magento 2",
      description:
        "Portfolio officiel de Mehdi Aichouch, développeur full-stack à Fès, Maroc. Magento 2 / Adobe Commerce, PHP, Laravel et React pour l'e-commerce international.",
      jobTitle: "Développeur Full-Stack",
      disambiguation: "Développeur full-stack à Fès, au Maroc, spécialisé en Magento 2 / Adobe Commerce, PHP, Laravel et React.",
    },
    nav: {
      home: "Accueil",
      about: "À propos",
      portfolio: "Projets",
      skills: "Compétences",
      experience: "Parcours",
      contact: "Contact",
    },
    home: {
      headline: ["Développeur full-stack.", "Sur le web, je construis *tout*."],
      eyebrow: "Mehdi Aichouch · Fès, Maroc",
      subline: "PHP, Laravel, React et Magento 2, sur des plateformes e-commerce pour des marques européennes.",
      cta: "Voir mes projets",
      contactCta: "Me contacter",
      resume: "Télécharger le CV",
      availability: "Disponible immédiatement · Basé à Fès, Maroc · Télétravail, hybride ou sur site",
      liveStores: "Boutiques en ligne sur lesquelles j'ai travaillé",
      visualAlt: "Les couches d'une application web : interface, e-commerce, API et données",
      stack: { interface: "interface", commerce: "e-commerce", api: "api", data: "données" },
    },
    about: {
      title: "À propos",
      lead:
        "Je suis Mehdi Aichouch, développeur web full-stack, 3 ans d'expérience sur le backend et le frontend de plateformes e-commerce internationales pour Carhartt WIP, Anita et Edwin Europe (50 000+ utilisateurs mensuels en Europe). Backend en PHP 8 avec Magento 2 et Laravel, frontend avec React, Alpine.js et Tailwind CSS, avec une attention particulière à la performance.",
      photoAlt: "Portrait de Mehdi Aichouch",
      intro:
        "Chez Cartware / Morocommerce à Fès de 2024 à 2026, en freelance depuis août 2026. Titulaire d'un Diplôme d'Université Bac+3 en frameworks de développement web et Java EE, et en préparation de la certification Adobe Commerce Developer Professional (AD0-E724).",
    },
    timeline: {
      title: "Parcours",
      intro: "Postes et missions freelance, du plus récent au plus ancien.",
      educationTitle: "Formation",
      certificationTitle: "Certification",
    },
    portfolio: {
      title: "Projets",
      description: "D'abord les boutiques clientes, puis les projets open source et personnels.",
      live: "En ligne",
      role: "Mon rôle",
      clientRole: "Développeur Magento 2 (full-stack) chez Cartware / Morocommerce",
      opensNewTab: "s'ouvre dans un nouvel onglet",
      otherTitle: "Projets freelance, open source et personnels",
      otherDescription: "Sites clients, modules Magento, applications web et outils, pour la plupart avec le code source sur GitHub.",
      kind: { freelance: "Site client", opensource: "Open source", personal: "Projet personnel" },
      viewCode: "Voir le code",
      showAll: "Afficher les {count} projets",
      showLess: "Afficher moins",
      clientTitle: "Boutiques clientes",
      details: "Détails",
      caseStudy: "Étude de cas",
      close: "Fermer",
      visitStore: "Voir la boutique",
      visitSite: "Voir le site",
      screenshotAlt: "Capture d'écran du site {title}",
      coverAlt: "Visuel du projet {title}",
      projects: {
        bismilah:
          "Site d'une agence immobilière de Meknès, en français et en arabe (de droite à gauche). Les visiteurs filtrent les biens à vendre ou à louer par type, quartier, budget et nombre de chambres, ouvrent une annonce avec sa galerie photo et contactent l'agence par un message WhatsApp déjà rédigé. Les propriétaires peuvent proposer leur bien de la même façon. Sans serveur ni base de données : l'agence modifie les annonces, les horaires et les avis dans un seul fichier. Next.js 16, TypeScript, Tailwind CSS, données structurées RealEstateAgent.",
        tmdrive:
          "Site d'un loueur de voitures de Meknès, ouvert 24h/24, en français et en arabe (de droite à gauche). Les visiteurs filtrent les voitures par catégorie, boîte de vitesses, carburant et budget journalier, consultent la fiche d'une voiture et réservent en envoyant leurs dates par un message WhatsApp déjà rédigé. Sans serveur ni base de données : le gérant modifie la flotte, les tarifs et les horaires dans un seul fichier. Next.js 16, TypeScript, Tailwind CSS, données structurées AutoRental.",
        carhartt:
          "Boutique B2B de vente en gros pour les revendeurs de Carhartt WIP. J'ai conçu la couche API REST pour l'intégration des ressources numériques (CDN Amplience), intégré le SSO Microsoft Entra ID et développé des fonctionnalités B2B : prix par paliers, droits sur le catalogue et synchronisation des stocks via REST.",
        anita:
          "Boutique en ligne de la marque allemande de lingerie et de maillots de bain, sous Magento 2.4. J'ai développé et maintenu des fonctionnalités de bout en bout, des modules backend à la vitrine.",
        edwin:
          "Boutique en ligne européenne de la marque de denim japonaise, sous Magento 2.4. J'ai développé des fonctionnalités de bout en bout et mis en place Apple Pay sur Adyen.",
        cafea:
          "Site one-page conceptuel pour CAFEA Espresso, importateur marocain de café de 41 pays, raconté en un seul défilement, de la ferme à la tasse : un grain de café en 3D, un globe WebGL avec les routes vers Casablanca et 16 000 particules qui passent d'une branche de caféier à un navire, un torréfacteur puis un espresso. Next.js 16, three.js avec GLSL sur mesure, GSAP et Lenis.",
        freespace: "Application de gestion d'espaces, écrite en PHP.",
        requestify: "Système de gestion des demandes développé avec Laravel.",
        portfolio: "Ce site : React, Tailwind CSS, Motion, un visuel 3D en CSS et un assistant IA qui répond aux questions sur mon travail.",
        slackbot:
          "Bot Slack Python qui anime et gère automatiquement les réunions daily stand-up.",
        library:
          "Système dockerisé avec catalogage de livres, authentification et gestion d'emprunts.",
        attributeImport:
          "Module Magento 2 pour l'importation en masse d'options d'attributs produit depuis des fichiers CSV via le panneau d'administration.",
        magentoFeatures:
          "Environnement de développement Magento 2 entièrement dockerisé avec Varnish, Redis, RabbitMQ et Robo pour développer des modules personnalisés de qualité production.",
        echallenge:
          "Plateforme d'examens en ligne avec tests chronométrés, réservation de créneaux et gestion admin. API REST Spring Boot 3 sécurisée par JWT, front end React 19.",
        freespaceBlog:
          "Plateforme de blog Django 6 avec slider de posts mis en avant, commentaires imbriqués, likes AJAX, défilement infini et profils utilisateurs.",
        jeeProducts:
          "Catalogue de produits Jakarta EE en couches avec CRUD complet, contrôleur servlet MVC et DAO JDBC sur MySQL.",
        atelier:
          "Application de gestion pour un atelier d'artisanat marocain : paie hebdomadaire, msrouf (avances), commandes clients, dépenses et journal de caisse unique, avec 13 rapports. Next.js 16 et sécurité PostgreSQL au niveau des lignes, en français, arabe (RTL), anglais et espagnol.",
        jobBot:
          "Bot Python qui collecte les offres de sept sites d'emploi, évalue chaque annonce face à mon profil avec un matching déterministe, rédige les candidatures avec un LLM gratuit et n'écrit qu'à des adresses de recruteurs vérifiées. Planifié sur GitHub Actions.",
      },
    },
    skills: {
      title: "Compétences",
      description: "Ce que j'utilise au quotidien, par domaine.",
      groups: {
        backend: "Backend",
        frontend: "Frontend",
        apis: "API et authentification",
        data: "Données et performance",
        devops: "DevOps",
        practices: "Méthodes",
        languages: "Langues",
      },
      // French names for the skills that are words rather than product names (Skills.jsx)
      terms: {
        OOP: "POO",
        "Hyvä Theme": "Thème Hyvä",
        "REST API design": "Conception d'API REST",
        "Microsoft Entra ID SSO": "SSO Microsoft Entra ID",
        "Third-party integrations (Amplience, Adyen)": "Intégrations tierces (Amplience, Adyen)",
        "MySQL (query and index tuning)": "MySQL (optimisation des requêtes et index)",
        "Caching strategy": "Stratégie de cache",
        "CI/CD pipelines": "Pipelines CI/CD",
        "Code review": "Revue de code",
        "Refactoring legacy code": "Refactorisation de code legacy",
        "Debugging in production": "Débogage en production",
      },
      spoken: ["Arabe, langue maternelle", "Anglais, professionnel (B2)", "Français, intermédiaire (B1)"],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Vous recrutez pour un poste full-stack, Laravel ou Magento, ou vous avez besoin d'aide sur une boutique ? Écrivez-moi ici ou par email.",
      nameLabel: "Nom",
      emailLabel: "Email",
      messageLabel: "Message",
      sending: "Envoi…",
      cta: "Envoyer le message",
      resume: "CV",
      direct: "Ou contactez-moi directement",
      copyEmail: "Copier l'adresse e-mail",
      copied: "Copié",
      errors: {
        name: "Saisissez votre nom",
        email: "Saisissez une adresse email valide, par exemple nom@entreprise.com",
        message: "Saisissez un message",
      },
    },
    notification: {
      success: "Message envoyé. Je vous répondrai par email.",
      error: "Votre message n'a pas été envoyé. Vérifiez votre connexion et réessayez, ou écrivez-moi directement par email.",
    },
    resumeModal: {
      title: "Télécharger mon CV",
      subtitle: "Développeur full-stack, un PDF par langue.",
      english: "Anglais (PDF)",
      french: "Français (PDF)",
      cancel: "Fermer",
    },
    footer: {
      location: "Fès, Maroc.",
      backToTop: "Haut de page",
      localTime: "Heure locale à Fès",
      builtWith: "Réalisé avec React et Tailwind CSS.",
    },
    chat: {
      open: "Demander à l'IA",
      close: "Fermer",
      title: "Questions sur mon parcours",
      subtitle: "Assistant IA qui connaît mon CV",
      greeting: "Posez vos questions sur mon expérience, mes projets ou mes compétences. L'assistant répond à partir de mon CV.",
      suggestions: [
        "Qu'a fait Mehdi chez Morocommerce ?",
        "Sur quels projets Magento a-t-il travaillé ?",
        "Quelle est sa stack technique ?",
      ],
      placeholder: "Posez une question",
      disclaimer: "Les réponses de l'IA peuvent être inexactes. Consultez le CV pour les détails.",
    },
    experience: [
      {
        org: "Indépendant · À distance",
        role: "Développeur full-stack freelance",
        date: "Depuis août 2026",
        note: "Projets clients via des agences.",
        points: [
          "Via l'agence J2HB, développement de la boutique en ligne de Mercato TNG, distributeur marocain d'électroménager, sous Laravel 12 / Bagisto, PHP 8.3, MySQL et Redis : 4 langues (français, arabe RTL, anglais, espagnol), gestion des stocks, paiement à la livraison et PayPal, migration complète du catalogue de l'ancien site, environnement Docker, tests Pest et Playwright.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Magento 2 (full-stack)",
        date: "Janv. 2024 – Juil. 2026",
        points: [
          "Développement de fonctionnalités de bout en bout sur trois plateformes Magento 2.4.x (Carhartt WIP B2B, Anita, Edwin Europe), 50 000+ utilisateurs mensuels.",
          "Conception de la couche API REST de l'intégration DAM Carhartt WIP (repositories, service contracts, webapi.xml, CDN Amplience), exposant des endpoints client, accès et images aux systèmes partenaires.",
          "Intégration du SSO Microsoft Entra ID (Azure AD) : enregistrement d'application, validation JWT via JWKS, gestion des callbacks.",
          "Vitrines Hyvä (Alpine.js, Tailwind CSS), Google PageSpeed constamment au-dessus de 95.",
          "Accélération des pages catalogue : mapping Elasticsearch, requêtes et index MySQL, cache Redis et Varnish.",
          "Fonctionnalités B2B (prix par palier, permissions catalogue, synchronisation des stocks via REST) et Apple Pay sur Adyen pour Edwin Europe.",
          "Livraison d'un module admin de gestion des traductions avec import CSV et upsert en masse via UI Components.",
          "Refactorisation de 50 000+ lignes de code legacy, fiabilisation de Docker et des pipelines CI/CD : -45 % de bugs en production.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Laravel (stage)",
        date: "Août – Déc. 2023",
        points: [
          "Plateforme de gestion interne full-stack sous Laravel 10 et Tailwind CSS, utilisée chaque jour par 25+ collaborateurs.",
          "Conception de 15+ endpoints REST avec une sémantique HTTP correcte, validation des requêtes et relations Eloquent.",
          "Mise en place d'un contrôle d'accès par rôles (RBAC) et optimisation des requêtes : temps de réponse divisé par deux.",
        ],
      },
      {
        org: "Université Sidi Mohamed Ben Abdellah, Fès",
        role: "Développeur web (stage)",
        date: "Mars – Avr. 2023",
        points: [
          "Application RH en PHP / MySQL automatisant congés et suivi de paie : -70 % d'opérations manuelles.",
        ],
      },
    ],
    education: [
      {
        org: "ENSA Fès, Université Sidi Mohamed Ben Abdellah",
        degree: "Diplôme d'Université (D.U.) Bac+3 en Frameworks de développement web & Java EE",
        note: "Mention Très Bien. Java EE, Spring Boot, C# / .NET, architecture logicielle.",
      },
      {
        org: "OFPPT, Fès",
        degree: "Diplôme de technicien spécialisé en développement digital",
        note: "Développement web full-stack : PHP, MySQL, JavaScript, POO.",
      },
    ],
    certification: {
      name: "Adobe Commerce Developer Professional (AD0-E724)",
      status: "En préparation",
      note: "Développement backend Magento 2.4.7, Adobe Commerce Cloud, tunnel de commande.",
    },
  },
};

export default translations;
