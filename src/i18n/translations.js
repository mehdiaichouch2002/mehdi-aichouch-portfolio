const translations = {
  en: {
    nav: {
      home: "Home",
      about: "Experience",
      portfolio: "Work",
      skills: "Skills",
      contact: "Contact",
    },
    home: {
      headline: "I build Magento 2 stores for European brands.",
      description:
        "Full-stack developer with three years on the Magento 2 platforms of Carhartt WIP, Anita and Edwin Europe. I work in PHP, Laravel and React, from REST APIs and integrations to fast Hyvä storefronts.",
      availability: "Available immediately · Based in Fès, Morocco",
      cta: "See my work",
      resume: "Download resume",
      liveStores: "Live stores I've worked on",
      photoAlt: "Portrait of Mehdi Aichouch",
    },
    about: {
      title: "Experience",
      intro:
        "Three years building Magento 2 and Laravel features end to end at Cartware / Morocommerce in Fès, backed by a Bac+3 university diploma in web frameworks and Java EE.",
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
      projects: {
        carhartt:
          "B2B wholesale store for Carhartt WIP's retail partners. I designed the REST API layer for the digital asset integration (Amplience CDN), integrated Microsoft Entra ID single sign-on, and built B2B features: tiered pricing, catalogue permissions and inventory sync over REST.",
        anita:
          "Online store for the German lingerie and swimwear brand, on Magento 2.4. I built and maintained features end to end, from backend modules to the storefront.",
        edwin:
          "European online store for the Japanese denim brand, on Magento 2.4. I built features end to end and set up Apple Pay on Adyen.",
        freespace: "Application for managing spaces, written in PHP.",
        requestify: "Request management system built with Laravel.",
        portfolio: "This site: React, Tailwind CSS and an AI assistant that answers questions about my work.",
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
      subtitle: "Pick the version that fits the role.",
      roleLabel: "Resume version",
      fullstack: "Full-Stack",
      magento2: "Magento 2",
      english: "English (PDF)",
      french: "French (PDF)",
      cancel: "Close",
    },
    footer: {
      location: "Fez, Morocco.",
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
        org: "Cartware / Morocommerce, Fès",
        role: "Magento 2 developer (full-stack)",
        date: "Jan 2024 – Jul 2026",
        points: [
          "Built and maintained features end to end on three Magento 2.4 platforms (Carhartt WIP B2B, Anita, Edwin Europe) serving 50,000+ monthly users.",
          "Cut product listing load time from 3.2s to 0.8s through Elasticsearch mapping, MySQL query and index tuning, and Redis and Varnish caching.",
          "Delivered Hyvä storefronts with Alpine.js and Tailwind CSS: 40% faster page loads, Google PageSpeed consistently above 95.",
          "Integrated Microsoft Entra ID single sign-on and designed the REST API layer for the Carhartt WIP digital asset integration.",
          "Refactored 50,000+ lines of legacy code and stabilised Docker and CI/CD pipelines, cutting production bugs by 45%.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Laravel developer (internship)",
        date: "Aug – Dec 2023",
        points: [
          "Built a full-stack internal management platform with Laravel 10 and Tailwind CSS, used daily by 25+ employees.",
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
        degree: "University diploma (Bac+3) in Web Development Frameworks & Java EE",
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
      about: "Parcours",
      portfolio: "Projets",
      skills: "Compétences",
      contact: "Contact",
    },
    home: {
      headline: "Je développe des boutiques Magento 2 pour des marques européennes.",
      description:
        "Développeur full-stack avec trois ans d'expérience sur les plateformes Magento 2 de Carhartt WIP, Anita et Edwin Europe. Je travaille en PHP, Laravel et React, des API REST et intégrations jusqu'aux vitrines Hyvä rapides.",
      availability: "Disponible immédiatement · Basé à Fès, Maroc",
      cta: "Voir mes projets",
      resume: "Télécharger le CV",
      liveStores: "Boutiques en ligne sur lesquelles j'ai travaillé",
      photoAlt: "Portrait de Mehdi Aichouch",
    },
    about: {
      title: "Parcours",
      intro:
        "Trois ans à développer des fonctionnalités Magento 2 et Laravel de bout en bout chez Cartware / Morocommerce à Fès, avec un diplôme d'université Bac+3 en frameworks web et Java EE.",
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
      projects: {
        carhartt:
          "Boutique B2B de vente en gros pour les revendeurs de Carhartt WIP. J'ai conçu la couche API REST pour l'intégration des ressources numériques (CDN Amplience), intégré le SSO Microsoft Entra ID et développé des fonctionnalités B2B : prix par paliers, droits sur le catalogue et synchronisation des stocks via REST.",
        anita:
          "Boutique en ligne de la marque allemande de lingerie et de maillots de bain, sous Magento 2.4. J'ai développé et maintenu des fonctionnalités de bout en bout, des modules backend à la vitrine.",
        edwin:
          "Boutique en ligne européenne de la marque de denim japonaise, sous Magento 2.4. J'ai développé des fonctionnalités de bout en bout et mis en place Apple Pay sur Adyen.",
        freespace: "Application de gestion d'espaces, écrite en PHP.",
        requestify: "Système de gestion des demandes développé avec Laravel.",
        portfolio: "Ce site : React, Tailwind CSS et un assistant IA qui répond aux questions sur mon travail.",
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
      subtitle: "Choisissez la version adaptée au poste.",
      roleLabel: "Version du CV",
      fullstack: "Full-Stack",
      magento2: "Magento 2",
      english: "Anglais (PDF)",
      french: "Français (PDF)",
      cancel: "Fermer",
    },
    footer: {
      location: "Fès, Maroc.",
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
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Magento 2 (full-stack)",
        date: "Janv. 2024 – Juil. 2026",
        points: [
          "Développement et maintenance de fonctionnalités de bout en bout sur trois plateformes Magento 2.4 (Carhartt WIP B2B, Anita, Edwin Europe) servant plus de 50 000 utilisateurs par mois.",
          "Temps de chargement des listes produits réduit de 3,2 s à 0,8 s : mapping Elasticsearch, optimisation des requêtes et index MySQL, cache Redis et Varnish.",
          "Livraison de vitrines Hyvä avec Alpine.js et Tailwind CSS : pages 40 % plus rapides, score Google PageSpeed constamment au-dessus de 95.",
          "Intégration du SSO Microsoft Entra ID et conception de la couche API REST pour l'intégration des ressources numériques de Carhartt WIP.",
          "Refactorisation de plus de 50 000 lignes de code legacy et stabilisation des pipelines Docker et CI/CD, avec 45 % de bugs en production en moins.",
        ],
      },
      {
        org: "Cartware / Morocommerce, Fès",
        role: "Développeur Laravel (stage)",
        date: "Août – Déc. 2023",
        points: [
          "Développement d'une plateforme de gestion interne full-stack avec Laravel 10 et Tailwind CSS, utilisée chaque jour par plus de 25 employés.",
          "Mise en place d'un contrôle d'accès par rôles et optimisation des requêtes, avec des temps de réponse divisés par deux.",
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
        degree: "Diplôme d'Université (Bac+3) Frameworks de développement web & Java EE",
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
