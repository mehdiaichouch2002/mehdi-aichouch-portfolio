const translations = {
  en: {
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
      subline: "Most recently: Magento 2 / Adobe Commerce stores for European brands.",
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
        "Full-stack developer with three years on the Magento 2 platforms of Carhartt WIP, Anita and Edwin Europe. I work in PHP, Laravel and React, from REST APIs and integrations to fast Hyvä storefronts.",
      photoAlt: "Portrait of Mehdi Aichouch",
      intro:
        "Three years on Magento 2 / Adobe Commerce and Laravel: at Cartware / Morocommerce in Fès until the company closed, then freelance since August 2026. Backed by a Bac+3 university licence in web frameworks and Java EE.",
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
      otherTitle: "Open-source and personal projects",
      otherDescription: "Magento modules, web apps and tools, with the source code on GitHub.",
      viewCode: "View code",
      showAll: "Show all {count} projects",
      showLess: "Show fewer",
      clientTitle: "Client stores",
      details: "Details",
      caseStudy: "Case study",
      close: "Close",
      visitStore: "Visit the store",
      projects: {
        carhartt:
          "B2B wholesale store for Carhartt WIP's retail partners. I designed the REST API layer for the digital asset integration (Amplience CDN), integrated Microsoft Entra ID single sign-on, and built B2B features: tiered pricing, catalogue permissions and inventory sync over REST.",
        anita:
          "Online store for the German lingerie and swimwear brand, on Magento 2.4. I built and maintained features end to end, from backend modules to the storefront.",
        edwin:
          "European online store for the Japanese denim brand, on Magento 2.4. I built features end to end and set up Apple Pay on Adyen.",
        freespace: "Application for managing spaces, written in PHP.",
        requestify: "Request management system built with Laravel.",
        portfolio: "This site: React, Tailwind CSS, Motion, a three.js hero object and an AI assistant that answers questions about my work.",
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
        apis: "APIs and integrations",
        data: "Data and performance",
        tools: "Tools and DevOps",
        quality: "Testing and quality",
        also: "Also worked with",
        languages: "Spoken languages",
      },
      spoken: ["Arabic, native", "English, professional (B2)", "French, intermediate (B1)"],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Hiring for a Magento or full-stack role, or need help with a store? Send me a message here or by email.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sending: "Sending…",
      cta: "Send message",
      resume: "Resume",
      direct: "Or reach me directly",
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
      subtitle: "Magento 2 / Adobe Commerce and full-stack PHP, in one PDF.",
      english: "English (PDF)",
      french: "French (PDF)",
      cancel: "Close",
    },
    footer: {
      location: "Fès, Morocco.",
      backToTop: "Back to top",
      builtWith: "Built with React, Tailwind CSS and three.js.",
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
        note: "Client projects through agencies, plus a Magento 2 bug-fix service on Fiverr.",
        points: [
          "Building the online store of a Moroccan home-appliance retailer (via the agency J2HB) on Laravel 12 / Bagisto, PHP 8.3, MySQL 8 and Redis: stock management, guest checkout, cash on delivery, prices in dirhams.",
          "Shipped the storefront in French, Arabic (RTL), English and Spanish, with PayPal and EUR conversion wired in and ready to switch on.",
          "Migrated the old site's full catalogue (categories, products, prices, images, stock) into seeders, with a one-command Docker setup and Pest and Playwright tests in all four languages.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Magento 2 / Adobe Commerce developer",
        date: "Jan 2024 – Jul 2026",
        note: "Full-time permanent contract, ended when the company closed.",
        points: [
          "Built and maintained features on three Magento 2.4.x stores (Carhartt WIP B2B, Anita, Edwin Europe) serving 50,000+ monthly users, including tiered pricing, catalogue permissions and REST stock sync.",
          "Designed the REST API of Carhartt WIP's digital asset management app (service contracts, webapi.xml): image data, Amplience CDN URLs and JWT auth. Added Microsoft Entra ID single sign-on with JWKS validation.",
          "Cut product listing load time from 3.2s to 0.8s through Elasticsearch mapping, MySQL indexes, Redis and Varnish, and delivered Hyvä storefronts scoring 95+ on Google PageSpeed.",
          "Created Cartware_Translation, an admin module with CSV import and bulk upsert; patched a MySQL collation error caused by invalid UTF-8 in URL paths; set up Apple Pay on Adyen for Edwin.",
          "Built the Docker environments for Carhartt B2B and Edwin and rolled out Claude Code with MCP servers (Playwright, MySQL) to the team. Legacy refactoring cut production bugs by 45%.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Laravel developer (internship)",
        date: "Aug – Dec 2023",
        points: [
          "Built an internal management platform used daily by 25+ employees (Laravel 10, Tailwind CSS): 15+ REST endpoints and role-based access control, with query tuning that halved response times.",
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
        degree: "University licence (Bac+3) in Web Frameworks & Java EE",
        note: "Graduated with highest honours (mention Très Bien). Java EE, Spring Boot, C# / .NET, software architecture.",
      },
      {
        org: "ISTA Adarissa (OFPPT), Fès",
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
      subline: "Ces dernières années : des boutiques Magento 2 / Adobe Commerce pour des marques européennes.",
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
        "Développeur full-stack avec trois ans d'expérience sur les plateformes Magento 2 de Carhartt WIP, Anita et Edwin Europe. Je travaille en PHP, Laravel et React, des API REST et intégrations jusqu'aux vitrines Hyvä rapides.",
      photoAlt: "Portrait de Mehdi Aichouch",
      intro:
        "Trois ans sur Magento 2 / Adobe Commerce et Laravel : chez Cartware / Morocommerce à Fès jusqu'à la fermeture de l'entreprise, puis en freelance depuis août 2026. Avec une licence d'université Bac+3 en frameworks web et Java EE.",
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
      otherTitle: "Projets open source et personnels",
      otherDescription: "Modules Magento, applications web et outils, avec le code source sur GitHub.",
      viewCode: "Voir le code",
      showAll: "Afficher les {count} projets",
      showLess: "Afficher moins",
      clientTitle: "Boutiques clientes",
      details: "Détails",
      caseStudy: "Étude de cas",
      close: "Fermer",
      visitStore: "Voir la boutique",
      projects: {
        carhartt:
          "Boutique B2B de vente en gros pour les revendeurs de Carhartt WIP. J'ai conçu la couche API REST pour l'intégration des ressources numériques (CDN Amplience), intégré le SSO Microsoft Entra ID et développé des fonctionnalités B2B : prix par paliers, droits sur le catalogue et synchronisation des stocks via REST.",
        anita:
          "Boutique en ligne de la marque allemande de lingerie et de maillots de bain, sous Magento 2.4. J'ai développé et maintenu des fonctionnalités de bout en bout, des modules backend à la vitrine.",
        edwin:
          "Boutique en ligne européenne de la marque de denim japonaise, sous Magento 2.4. J'ai développé des fonctionnalités de bout en bout et mis en place Apple Pay sur Adyen.",
        freespace: "Application de gestion d'espaces, écrite en PHP.",
        requestify: "Système de gestion des demandes développé avec Laravel.",
        portfolio: "Ce site : React, Tailwind CSS, Motion, un objet 3D three.js et un assistant IA qui répond aux questions sur mon travail.",
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
        apis: "API et intégrations",
        data: "Données et performance",
        tools: "Outils et DevOps",
        quality: "Tests et qualité",
        also: "Également",
        languages: "Langues",
      },
      spoken: ["Arabe, langue maternelle", "Anglais, professionnel (B2)", "Français, intermédiaire (B1)"],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Vous recrutez pour un poste Magento ou full-stack, ou vous avez besoin d'aide sur une boutique ? Écrivez-moi ici ou par email.",
      nameLabel: "Nom",
      emailLabel: "Email",
      messageLabel: "Message",
      sending: "Envoi…",
      cta: "Envoyer le message",
      resume: "CV",
      direct: "Ou contactez-moi directement",
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
      subtitle: "Magento 2 / Adobe Commerce et full-stack PHP, en un seul PDF.",
      english: "Anglais (PDF)",
      french: "Français (PDF)",
      cancel: "Fermer",
    },
    footer: {
      location: "Fès, Maroc.",
      backToTop: "Haut de page",
      builtWith: "Réalisé avec React, Tailwind CSS et three.js.",
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
        note: "Projets clients via des agences, et une offre de correction de bugs Magento 2 sur Fiverr.",
        points: [
          "Développement de la boutique en ligne d'un revendeur marocain d'électroménager (via l'agence J2HB) sous Laravel 12 / Bagisto, PHP 8.3, MySQL 8 et Redis : stocks, commande sans compte, paiement à la livraison, prix en dirhams.",
          "Site livré en français, arabe (RTL), anglais et espagnol, avec PayPal et conversion en euros intégrés, prêts à activer.",
          "Reprise de tout le catalogue de l'ancien site (catégories, produits, prix, images, stocks) en seeders, avec installation Docker en une commande et tests Pest et Playwright dans les 4 langues.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Magento 2 / Adobe Commerce",
        date: "Janv. 2024 – Juil. 2026",
        note: "CDI, terminé à la fermeture de l'entreprise.",
        points: [
          "Développement et maintenance de trois boutiques Magento 2.4.x (Carhartt WIP B2B, Anita, Edwin Europe ; 50 000+ utilisateurs par mois), dont prix par palier, permissions catalogue et synchro des stocks en REST.",
          "Conception de l'API REST de l'application DAM de Carhartt WIP (service contracts, webapi.xml) : données images, URL CDN Amplience, authentification JWT. Ajout du SSO Microsoft Entra ID avec validation JWKS.",
          "Chargement des pages catalogue réduit de 3,2 s à 0,8 s (mapping Elasticsearch, index MySQL, Redis, Varnish) et vitrines Hyvä notées 95+ sur Google PageSpeed.",
          "Création du module admin Cartware_Translation (import CSV, upsert en masse) ; correctif d'une erreur de collation MySQL due à de l'UTF-8 invalide dans les URL ; mise en place d'Apple Pay sur Adyen pour Edwin.",
          "Mise en place des environnements Docker de Carhartt B2B et Edwin, et déploiement de Claude Code avec serveurs MCP (Playwright, MySQL) pour l'équipe. La refonte du code legacy a réduit de 45 % les bugs en production.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Laravel (stage)",
        date: "Août – Déc. 2023",
        points: [
          "Développement d'une plateforme de gestion interne utilisée chaque jour par 25+ collaborateurs (Laravel 10, Tailwind CSS) : 15+ endpoints REST, contrôle d'accès par rôles, requêtes optimisées (temps de réponse divisé par deux).",
        ],
      },
      {
        org: "Université Sidi Mohamed Ben Abdellah, Fès",
        role: "Développeur web (stage)",
        date: "Mars – Avr. 2023",
        points: [
          "Développement d'une application RH en PHP / MySQL automatisant les demandes de congé et le suivi de la paie, supprimant 70 % du travail RH manuel.",
        ],
      },
    ],
    education: [
      {
        org: "ENSA Fès, Université Sidi Mohamed Ben Abdellah",
        degree: "Licence d'université (Bac+3) Frameworks Web & Java EE",
        note: "Obtenu avec la mention Très Bien. Java EE, Spring Boot, C# / .NET, architecture logicielle.",
      },
      {
        org: "ISTA Adarissa (OFPPT), Fès",
        degree: "Diplôme de technicien spécialisé en développement digital",
        note: "Développement web full-stack : PHP, MySQL, JavaScript, POO.",
      },
    ],
    certification: {
      name: "Adobe Commerce Developer Professional (AD0-E724)",
      status: "En préparation",
      note: "Développement backend Magento 2.4.7, Adobe Commerce Cloud, tunnel de commande et ventes.",
    },
  },
};

export default translations;
