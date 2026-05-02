(function () {
  var P = typeof window !== "undefined" && window.SAMA_I18N;
  if (!P) return;

  Object.assign(P.en, {
    velora_cs_page_title: "Samandari | Velora | Case study",
    velora_cs_meta_desc:
      "Case study: offline-first productivity app with custom licensing and zero server cost.",
    velora_cs_hero_title: "Velora | Case study",
    velora_cs_hero_meta: "2025 - Present | Solo developer & product owner",
    velora_cs_problem_p:
      "Most productivity apps either require a constant internet connection, lock essential features behind expensive subscriptions managed by app stores, or are too bloated for users who just want simple habit tracking and goal management. For an indie developer, monetizing a mobile app without Google Play billing or a backend server is extremely difficult. I needed a way to sell directly to users with zero infrastructure cost.",
    velora_cs_solution_intro:
      "I designed, built, and shipped a complete productivity app with a custom licensing engine:",
    velora_cs_li1:
      "<strong>100% offline-first</strong>: Hive NoSQL local database. The app works immediately after install, no account creation needed, no server dependency.",
    velora_cs_li2:
      "<strong>Custom license activation</strong>: SHA-256 device-bound activation codes generated from my admin panel. Users buy via mobile money, I generate a key, they activate. No Play Store billing, no backend.",
    velora_cs_li3:
      "<strong>Remote admin via GitHub Gist</strong>: A single JSON file on Gist serves as my entire backend. I manage clients, push messages, blacklist devices, update pricing, and toggle features, all from the app's built-in admin screen.",
    velora_cs_li4:
      "<strong>Habit tracking with streaks</strong>: Daily, weekly (X times per week), and monthly habits. Streak calculation across all frequencies with calendar heatmap visualization and detailed statistics.",
    velora_cs_li5:
      "<strong>Goal management</strong>: Goals with milestones, progress tracking, and completion visualization. Goals appear on the home dashboard alongside habits.",
    velora_cs_li6:
      "<strong>Smart alarms</strong>: Background alarm service that works even when the app is closed. Snooze, custom sounds, and reliable scheduling using Android AlarmManager.",
    velora_cs_li7:
      "<strong>Expense tracking</strong>: Log expenses by category, track spending trends, and monitor budgets, all stored locally.",
    velora_cs_li8:
      "<strong>Google Drive backup</strong>: One-tap backup and restore of all user data to their Google Drive account.",
    velora_cs_stat_tiers: "Subscription tiers",
    velora_cs_stat_server: "Server cost",
    velora_cs_stat_langs: "Languages",
    velora_cs_stat_habits: "Habit types",
    velora_cs_dec1:
      "<strong>Hive over SQLite</strong>: Faster reads for the document-style habit/goal data model. Pure Dart, no native bridge. Encryption built-in with AES.",
    velora_cs_dec2:
      "<strong>GitHub Gist as backend</strong>: Instead of building and hosting a server, all admin operations (client management, key generation, blacklisting, messaging) are stored in a single Gist JSON. The app reads it on launch; the admin screen writes to it. Total hosting cost: $0.",
    velora_cs_dec3:
      "<strong>Device-bound licensing</strong>: Activation codes are SHA-256 hashes tied to the device ID. Anti-cheat logic detects clock manipulation to prevent users from extending trial periods. No internet needed after activation.",
    velora_cs_dec4:
      "<strong>Provider over BLoC</strong>: Chose ChangeNotifier/Provider for faster iteration. The app's state management is straightforward enough that BLoC's boilerplate wasn't justified.",
    velora_cs_dec5:
      "<strong>Background alarm service</strong>: Uses Android AlarmManager with a Dart isolate callback for reliable alarm delivery. The service survives app kills and device reboots.",
    velora_cs_dec6:
      "<strong>Streak algorithm</strong>: Custom streak calculation that handles gaps differently per frequency (daily expects consecutive days, weekly checks within 7-day windows, monthly checks within calendar months).",
    velora_cs_matters_p:
      "Velora proves that a solo developer can build, monetize, and manage a paid mobile app with <strong>zero infrastructure cost</strong>. No backend server, no Play Store billing, no third-party payment processor. The entire licensing and admin system runs on a free GitHub Gist. The app generates revenue through direct mobile money payments and device-tied activation codes, a model that works especially well in markets where Google Play billing adoption is low.",

    esama_cs_page_title: "Samandari | E-Sama POS | Case study",
    esama_cs_meta_desc:
      "Case study: offline-first POS and business management for Burundian merchants, zero server cost.",
    esama_cs_hero_title: "E-Sama POS | Case study",
    esama_cs_hero_meta: "2024 - Present | Solo developer & product owner",
    esama_cs_problem_p:
      "Small merchants in Burundi manage inventory, sales, and finances entirely on paper or using expensive tools designed for Western markets. Internet connectivity is unreliable and costly. Existing POS solutions require constant server access, making them useless during outages, which happen daily. Merchants needed an <strong>affordable, offline-first</strong> solution that works without any internet dependency.",
    esama_cs_solution_intro:
      "I designed, built, and shipped a complete POS and business management app from scratch:",
    esama_cs_li1:
      "<strong>100% offline-first architecture</strong>: Hive NoSQL local database with AES-256 encryption. Zero server dependency. The app works immediately out of the box, even without a SIM card.",
    esama_cs_li2:
      "<strong>Three store types in one app</strong>: Retail (barcode scanning, wholesale pricing, parked sales), Restaurant (menu management, ingredient tracking), and Rental (equipment rental with hourly/daily/weekly/monthly tracking, deposits, overdue detection).",
    esama_cs_li3:
      "<strong>Complete POS system</strong>: Touch-optimized cart, per-item and global discounts, multi-payment support (Cash + Mobile Money + Credit), automatic wholesale pricing by quantity thresholds.",
    esama_cs_li4:
      "<strong>Built-in CRM & loyalty</strong>: Client profiles, credit system with configurable limits, debt tracking with WhatsApp reminders, loyalty points per purchase.",
    esama_cs_li5:
      "<strong>Real-time analytics dashboard</strong>: Revenue, profit, expenses, average margin, break-even analysis, stock valuation, top/dormant products, all computed locally.",
    esama_cs_li6:
      "<strong>Bluetooth thermal printing</strong>: ESC/POS protocol for professional receipts. PDF invoice generation with WhatsApp sharing.",
    esama_cs_li7:
      "<strong>Multi-store management</strong>: Up to unlimited stores (Premium tier), with data isolation and quick switching.",
    esama_cs_li8:
      "<strong>Remote control infrastructure</strong>: GitHub Gist-based remote config for version updates, kill switch, admin messages, and pricing, with no backend server needed.",
    esama_cs_stat_paying: "Paying users",
    esama_cs_stat_stores: "Store types",
    esama_cs_stat_server: "Server cost",
    esama_cs_stat_langs: "Languages",
    esama_cs_dec1:
      "<strong>Hive over SQLite</strong>: Hive's pure Dart implementation provides faster read/write for the document-style data model (products, sales, clients) without native bridging overhead.",
    esama_cs_dec2:
      "<strong>AES-256 encryption at rest</strong>: Sensitive financial data (sales, expenses, client debts) is encrypted locally using keys stored in platform keychain/keystore, protecting merchants even if the device is lost.",
    esama_cs_dec3:
      "<strong>GitHub Gist as remote config</strong>: Instead of maintaining a backend server, all remote operations (version checking, kill switch, admin messages, pricing updates) are driven by a single JSON file on GitHub Gist. Zero hosting cost, instant updates.",
    esama_cs_dec4:
      "<strong>SHA-256 license activation</strong>: Offline license validation using device-bound activation codes, with anti-cheat detection for clock manipulation.",
    esama_cs_dec5:
      "<strong>Provider pattern over BLoC</strong>: Chose ChangeNotifier/Provider for faster iteration and lower complexity, given the app's state management needs.",
    esama_cs_dec6:
      "<strong>ESC/POS Bluetooth printing</strong>: Direct thermal printer integration via Bluetooth, supporting the affordable receipt printers available in East African markets.",
    esama_cs_matters_p:
      "E-Sama is not a prototype. It's a <strong>revenue-generating product with real paying users</strong>. It proves that production software can be built for emerging markets with zero infrastructure cost, using creative engineering to overcome connectivity and hardware constraints. The subscription model (Standard / Business / Premium) validates the business viability, and the multi-language support (English, French, Kiswahili) positions it for expansion across East Africa.",

    burundi_lang_page_title: "Samandari | Burundian language identifier",
    burundi_lang_meta_desc:
      "A custom-trained NLP model that classifies text as Kirundi, French, Swahili, or English.",
    burundi_lang_h2: "Burundian language identifier 🇧🇮",
    burundi_lang_intro:
      "A custom-trained NLP model that classifies text as Kirundi, French, Swahili, or English. Built using Hugging Face transformers, fine-tuned on a custom dataset, and deployed with Gradio.",
    burundi_lang_li1: "<strong>Category</strong>: AI, NLP",
    burundi_lang_li2: "<strong>Project date</strong>: 2024",
    burundi_lang_li3:
      '<strong>Live demo URL</strong>: <a href="https://huggingface.co/spaces/samandari/burundi-lang-id" target="_blank" rel="noopener noreferrer">huggingface.co/spaces/samandari/burundi-lang-id</a>',
    burundi_lang_li4:
      '<strong>Model URL</strong>: <a href="https://huggingface.co/samandari/burundi-lang-id" target="_blank" rel="noopener noreferrer">huggingface.co/samandari/burundi-lang-id</a>',

    sentinel_page_title: "Samandari | SentinelAI SOC assistant",
    sentinel_meta_desc:
      "AI-powered SOC assistant for security log analysis, hybrid detection, and incident reporting with MITRE ATT&CK mapping.",
    sentinel_h2: "SentinelAI SOC assistant",
    sentinel_intro_p:
      "An AI-powered Security Operations Center assistant that analyzes security logs, detects anomalies using a hybrid approach (rule-based + LLM reasoning), and generates explainable incident reports with MITRE ATT&CK technique mapping.",
    sentinel_li1: "<strong>Category</strong>: AI / Cybersecurity",
    sentinel_li2: "<strong>Project date</strong>: 2026",
    sentinel_li3:
      '<strong>Repository</strong>: <a href="https://github.com/Sama-ndari/sentinelai-soc-assistant" target="_blank" rel="noopener noreferrer">github.com/Sama-ndari/sentinelai-soc-assistant</a>',
    sentinel_li4:
      "<strong>Tech stack</strong>: Python, FastAPI, OpenAI GPT-4o-mini, SQLite, Tailwind CSS",
    sentinel_features_h: "Key features",
    sentinel_f1:
      "<strong>Hybrid detection engine</strong>: Rule-based detection for deterministic reliability combined with LLM analysis for contextual reasoning",
    sentinel_f2:
      "<strong>Privacy-first architecture</strong>: Raw logs never sent to LLM; only structured evidence summaries are analyzed",
    sentinel_f3:
      "<strong>MITRE ATT&CK mapping</strong>: Industry-standard threat classification (T1110.001 Brute Force, T1595 Scanning, T1498 DoS)",
    sentinel_f4:
      "<strong>Multi-format log support</strong>: Auth logs (sshd, sudo), Nginx access logs, and flexible JSON logs with auto-field detection",
    sentinel_f5:
      "<strong>Incident reports</strong>: Severity assessment, evidence summary, actionable recommendations, and false positive likelihood",
    sentinel_f6:
      "<strong>RESTful API</strong>: Full CRUD for incidents with upload, analysis, status tracking, and health monitoring endpoints",
    sentinel_rules_h: "Detection rules",
    sentinel_r1: "<strong>Brute force detection</strong>: Failed login attempts from single IP",
    sentinel_r2: "<strong>Suspicious IP behavior</strong>: Multi-user targeting, scanner detection",
    sentinel_r3: "<strong>Frequency anomaly</strong>: Request rate spikes, off-hours activity",

    aiclone_page_title: "Samandari | Personal AI clone",
    aiclone_meta_desc:
      "A RAG-powered personal AI representative with automated tool-calling and lead capture.",
    aiclone_h2: "Personal AI clone (agentic RAG)",
    aiclone_intro_p:
      "This project goes beyond a simple chatbot. I built a <strong>personal AI clone</strong> designed to represent me professionally 24/7. It integrates retrieval-augmented generation (RAG) with a sophisticated <strong>tool-calling loop</strong>, allowing the AI to not only answer questions but also interact with external services.",
    aiclone_li1: "<strong>Category</strong>: Agentic AI / RAG",
    aiclone_li2: "<strong>Project date</strong>: Dec 2025",
    aiclone_li3:
      '<strong>Live demo</strong>: <a href="https://44c046f3ea50c2195e.gradio.live/" target="_blank" rel="noopener noreferrer">Gradio web app</a>',
    aiclone_li4:
      '<strong>Repository</strong>: <a href="https://github.com/Sama-ndari/personal-ai-clone" target="_blank" rel="noopener noreferrer">View on GitHub</a>',
    aiclone_li5: "<strong>Stack</strong>: Python, GPT-4o, Gradio, Pushover API",
    aiclone_agentic_h: "The \"agentic\" logic",
    aiclone_ag1:
      "<strong>Context-aware RAG</strong>: The AI parses my actual resume and portfolio data using <code>pypdf</code> and <code>BeautifulSoup</code>, ensuring zero hallucinations.",
    aiclone_ag2:
      "<strong>Autonomous tool calling</strong>: If a user expresses interest in hiring or contacting me, the AI triggers a Python function to extract contact details.",
    aiclone_ag3:
      "<strong>Real-time notifications</strong>: Integrated with <strong>Pushover API</strong> to send instant push notifications to my physical devices whenever a high-value interaction occurs.",
    aiclone_ag4:
      "<strong>Uncertainty logging</strong>: If the AI is asked a question it cannot answer, it logs the query to a \"learning base\" so I can update its knowledge.",
    aiclone_arch_h: "Architecture overview",
    aiclone_arch_p:
      "The system follows a <strong>Recon-Reason-Act</strong> cycle. It ingests semi-structured data, reasons about user intent via a system prompt that defines my \"persona,\" and acts by selecting the appropriate internal tool or external API.",

    interview_page_title: "Samandari | AI interview simulator",
    interview_meta_desc:
      "Streamlit + OpenAI interview simulator with adaptive questions, streaming, and automated evaluation.",
    interview_h2: "AI interview simulator",
    interview_intro_p:
      "An interactive AI-powered interview chatbot built with Streamlit and OpenAI. This application simulates real interview experiences by generating dynamic, tailored questions based on user profiles, tracking conversations in real-time, and providing automated performance evaluations with structured feedback.",
    interview_li1: "<strong>Category</strong>: AI, Chatbot, HR tech",
    interview_li2: "<strong>Project date</strong>: 2025",
    interview_li3:
      '<strong>Live demo</strong>: <a href="https://interview-tool-00tfo4nj6mxyp.streamlit.app/" target="_blank" rel="noopener noreferrer">interview-tool-00tfo4nj6mxyp.streamlit.app</a>',
    interview_li4:
      '<strong>Repository</strong>: <a href="https://github.com/Sama-ndari/Interview-tool" target="_blank" rel="noopener noreferrer">github.com/Sama-ndari/Interview-tool</a>',
    interview_li5: "<strong>Tech stack</strong>: Python, Streamlit, OpenAI GPT-4o",
    interview_features_h: "Key features",
    interview_f1:
      "<strong>User profile capture</strong>: Collects name, experience, skills, company, role, and job level",
    interview_f2:
      "<strong>Adaptive AI interview</strong>: HR-style questions tailored to user background using GPT-4o",
    interview_f3:
      "<strong>Streaming responses</strong>: Real-time answer generation with smooth streaming",
    interview_f4:
      "<strong>Deep session management</strong>: Persistent session state tracking throughout interview",
    interview_f5:
      "<strong>Automatic evaluation</strong>: Generates score (1-10), structured feedback, and insights",
    interview_f6:
      "<strong>Restart flow</strong>: One-click interface reload for new interviews",
    interview_use_h: "Use cases",
    interview_use_p:
      "Perfect for job seekers preparing for interviews, HR teams building screening tools, and recruitment platforms looking to automate initial candidate assessments.",

    tasky_page_title: "Samandari | Tasky",
    tasky_meta_desc:
      "Firefox/Chrome extension for tasks and to-do reminders by Samandari.",
    tasky_h2: "Task reminder",
    tasky_intro_p:
      "Task Reminder is a Firefox/Chrome add-on that helps you manage your tasks and to-do list.",
    tasky_li1: "<strong>Category</strong>: Add-on",
    tasky_li2: "<strong>Client</strong>: Public",
    tasky_li3: "<strong>Project date</strong>: 01 June, 2025",
    tasky_li4:
      '<strong>Project URL</strong>: <a href="https://addons.mozilla.org/en-US/firefox/addon/samandari-tasky/" target="_blank" rel="noopener noreferrer">addons.mozilla.org/en-US/firefox/addon/samandari-tasky/</a>'
  });

  Object.assign(P.fr, {
    velora_cs_page_title: "Samandari | Velora | \u00c9tude de cas",
    velora_cs_meta_desc:
      "\u00c9tude de cas : application de productivit\u00e9 offline-first avec licences sur mesure et co\u00fbt serveur nul.",
    velora_cs_hero_title: "Velora | \u00c9tude de cas",
    velora_cs_hero_meta: "2025 \u2013 Pr\u00e9sent | D\u00e9veloppeur solo & product owner",
    velora_cs_problem_p:
      "La plupart des apps de productivit\u00e9 exigent une connexion permanente, verrouillent l\u2019essentiel derri\u00e8re des abonnements chers via les stores, ou sont trop lourdes pour qui veut simplement suivre habitudes et objectifs. Pour un ind\u00e9pendant, mon\u00e9tiser sans facturation Play ni backend est tr\u00e8s difficile. Il me fallait vendre directement avec z\u00e9ro infrastructure.",
    velora_cs_solution_intro:
      "J\u2019ai con\u00e7u, d\u00e9velopp\u00e9 et livr\u00e9 une app de productivit\u00e9 compl\u00e8te avec moteur de licences sur mesure :",
    velora_cs_li1:
      "<strong>100 % offline-first</strong> : base Hive NoSQL locale. L\u2019app fonctionne d\u00e8s l\u2019installation, sans compte ni serveur.",
    velora_cs_li2:
      "<strong>Licences sur mesure</strong> : codes d\u2019activation SHA-256 li\u00e9s \u00e0 l\u2019appareil, g\u00e9n\u00e9r\u00e9s depuis mon admin. Paiement mobile money, cl\u00e9, activation. Sans billing Play ni backend.",
    velora_cs_li3:
      "<strong>Admin via GitHub Gist</strong> : un JSON sur Gist remplace le backend. Clients, messages, blacklist, tarifs, feature flags, depuis l\u2019\u00e9cran admin int\u00e9gr\u00e9.",
    velora_cs_li4:
      "<strong>Habitudes & s\u00e9ries</strong> : quotidien, hebdo (X/semaine), mensuel. Calcul de s\u00e9ries, heatmap calendrier, statistiques.",
    velora_cs_li5:
      "<strong>Objectifs</strong> : jalons, progression, finitions visibles sur l\u2019accueil avec les habitudes.",
    velora_cs_li6:
      "<strong>Alarmes</strong> : service en arri\u00e8re-plan m\u00eame app ferm\u00e9e. Snooze, sons, AlarmManager Android.",
    velora_cs_li7:
      "<strong>D\u00e9penses</strong> : cat\u00e9gories, tendances, budgets, tout en local.",
    velora_cs_li8:
      "<strong>Sauvegarde Google Drive</strong> : sauvegarde et restauration en un geste.",
    velora_cs_stat_tiers: "Offres d\u2019abonnement",
    velora_cs_stat_server: "Co\u00fbt serveur",
    velora_cs_stat_langs: "Langues",
    velora_cs_stat_habits: "Types d\u2019habitudes",
    velora_cs_dec1:
      "<strong>Hive plut\u00f4t que SQLite</strong> : lectures plus rapides pour le mod\u00e8le document. Dart pur, chiffrement AES int\u00e9gr\u00e9.",
    velora_cs_dec2:
      "<strong>Gist comme backend</strong> : admin (clients, cl\u00e9s, blacklist, messages) dans un JSON. Lecture au lancement, \u00e9criture depuis l\u2019admin. Co\u00fbt h\u00e9bergement : 0 $.",
    velora_cs_dec3:
      "<strong>Licence li\u00e9e \u00e0 l\u2019appareil</strong> : SHA-256 + ID appareil. Anti-triche sur l\u2019horloge pour les essais. Pas d\u2019internet apr\u00e8s activation.",
    velora_cs_dec4:
      "<strong>Provider plut\u00f4t que BLoC</strong> : it\u00e9ration plus rapide, \u00e9tat assez simple pour \u00e9viter le boilerplate BLoC.",
    velora_cs_dec5:
      "<strong>Alarmes</strong> : AlarmManager + isolate Dart pour des d\u00e9clenchements fiables apr\u00e8s kill ou reboot.",
    velora_cs_dec6:
      "<strong>Algorithme de s\u00e9ries</strong> : r\u00e8gles diff\u00e9rentes selon fr\u00e9quence (jours cons\u00e9cutifs, fen\u00eatres 7 jours, mois calendaire).",
    velora_cs_matters_p:
      "Velora montre qu\u2019un solo peut livrer une app payante avec <strong>z\u00e9ro co\u00fbt d\u2019infrastructure</strong> : pas de serveur, pas de billing Play, pas de PSP. Licences et admin sur un Gist gratuit. Revenus via mobile money et codes li\u00e9s \u00e0 l\u2019appareil, pertinent l\u00e0 o\u00f9 le billing Play est peu adopt\u00e9.",

    esama_cs_page_title: "Samandari | E-Sama POS | \u00c9tude de cas",
    esama_cs_meta_desc:
      "\u00c9tude de cas : caisse et gestion offline-first pour commer\u00e7ants burundais, sans serveur.",
    esama_cs_hero_title: "E-Sama POS | \u00c9tude de cas",
    esama_cs_hero_meta: "2024 \u2013 Pr\u00e9sent | D\u00e9veloppeur solo & product owner",
    esama_cs_problem_p:
      "Les petits commer\u00e7ants au Burundi g\u00e8rent stocks, ventes et finances sur papier ou avec des outils chers pens\u00e9s pour l\u2019Ouest. La connexion est instable et co\u00fbteuse. Les POS classiques exigent un serveur permanent : inutilisables pendant les coupures quotidiennes. Il fallait une solution <strong>abordable et offline-first</strong> sans d\u00e9pendance Internet.",
    esama_cs_solution_intro:
      "J\u2019ai con\u00e7u, d\u00e9velopp\u00e9 et livr\u00e9 une caisse et une gestion d\u2019entreprise compl\u00e8tes :",
    esama_cs_li1:
      "<strong>100 % offline-first</strong> : Hive + chiffrement AES-256. Z\u00e9ro serveur. L\u2019app d\u00e9marre sans carte SIM.",
    esama_cs_li2:
      "<strong>Trois types de magasin</strong> : Retail (codes-barres, gros, ventes en attente), Restaurant (menu, ingr\u00e9dients), Location (\u00e9quipement, horaire/jour/semaine/mois, acomptes, retards).",
    esama_cs_li3:
      "<strong>POS complet</strong> : panier tactile, remises, paiements Cash + Mobile money + cr\u00e9dit, gros automatique par seuils.",
    esama_cs_li4:
      "<strong>CRM & fid\u00e9lit\u00e9</strong> : fiches clients, cr\u00e9dit avec plafonds, dettes avec rappels WhatsApp, points fid\u00e9lit\u00e9.",
    esama_cs_li5:
      "<strong>Tableaux de bord locaux</strong> : CA, marge, charges, seuil de rentabilit\u00e9, valorisation stock, produits actifs/inactifs, tout calcul\u00e9 sur l\u2019appareil.",
    esama_cs_li6:
      "<strong>Impression thermique Bluetooth</strong> : ESC/POS, factures PDF partageables WhatsApp.",
    esama_cs_li7:
      "<strong>Multi-magasins</strong> : plusieurs points de vente (Premium), isolation des donn\u00e9es, bascule rapide.",
    esama_cs_li8:
      "<strong>T\u00e9l\u00e9commande sans serveur</strong> : config via Gist (versions, kill switch, messages admin, tarifs).",
    esama_cs_stat_paying: "Utilisateurs payants",
    esama_cs_stat_stores: "Types de magasin",
    esama_cs_stat_server: "Co\u00fbt serveur",
    esama_cs_stat_langs: "Langues",
    esama_cs_dec1:
      "<strong>Hive plut\u00f4t que SQLite</strong> : lectures/\u00e9critures plus rapides pour le mod\u00e8le document (produits, ventes, clients), sans pont natif.",
    esama_cs_dec2:
      "<strong>AES-256 au repos</strong> : donn\u00e9es financi\u00e8res chiffr\u00e9es, cl\u00e9s dans le trousseau plateforme.",
    esama_cs_dec3:
      "<strong>Gist pour la config distante</strong> : versions, kill switch, messages, tarifs, un JSON, 0 $ d\u2019h\u00e9bergement.",
    esama_cs_dec4:
      "<strong>Licence SHA-256</strong> : validation offline, d\u00e9tection de manipulation d\u2019horloge.",
    esama_cs_dec5:
      "<strong>Provider plut\u00f4t que BLoC</strong> : simplicit\u00e9 et vitesse d\u2019it\u00e9ration.",
    esama_cs_dec6:
      "<strong>ESC/POS Bluetooth</strong> : imprimantes abordables courantes en Afrique de l\u2019Est.",
    esama_cs_matters_p:
      "E-Sama n\u2019est pas un prototype : <strong>produit en production avec utilisateurs payants</strong>. Cela montre qu\u2019on peut livrer pour les march\u00e9s \u00e9mergents sans infrastructure, en contournant connectivit\u00e9 et mat\u00e9riel. L\u2019abonnement Standard / Business / Premium valide le mod\u00e8le ; EN / FR / Kiswahili ouvre l\u2019Afrique de l\u2019Est.",

    burundi_lang_page_title: "Samandari | Identifiant de langue burundais",
    burundi_lang_meta_desc:
      "Mod\u00e8le NLP entra\u00een\u00e9 pour classer du texte en kirundi, fran\u00e7ais, swahili ou anglais.",
    burundi_lang_h2: "Identifiant de langue burundais \ud83c\udde7\ud83c\uddee",
    burundi_lang_intro:
      "Un mod\u00e8le NLP entra\u00een\u00e9 sur mesure qui classe le texte en kirundi, fran\u00e7ais, swahili ou anglais. Transformers Hugging Face, fine-tuning sur jeu de donn\u00e9es d\u00e9di\u00e9, d\u00e9ploiement Gradio.",
    burundi_lang_li1: "<strong>Cat\u00e9gorie</strong> : IA, NLP",
    burundi_lang_li2: "<strong>Date du projet</strong> : 2024",
    burundi_lang_li3:
      '<strong>D\u00e9mo en ligne</strong> : <a href="https://huggingface.co/spaces/samandari/burundi-lang-id" target="_blank" rel="noopener noreferrer">huggingface.co/spaces/samandari/burundi-lang-id</a>',
    burundi_lang_li4:
      '<strong>URL du mod\u00e8le</strong> : <a href="https://huggingface.co/samandari/burundi-lang-id" target="_blank" rel="noopener noreferrer">huggingface.co/samandari/burundi-lang-id</a>',

    sentinel_page_title: "Samandari | Assistant SOC SentinelAI",
    sentinel_meta_desc:
      "Assistant SOC pilot\u00e9 par l\u2019IA : analyse de journaux, d\u00e9tection hybride et rapports d\u2019incident avec MITRE ATT&CK.",
    sentinel_h2: "Assistant SOC SentinelAI",
    sentinel_intro_p:
      "Assistant SOC qui analyse les journaux de s\u00e9curit\u00e9, d\u00e9tecte les anomalies en approche hybride (r\u00e8gles + raisonnement LLM) et produit des rapports d\u2019incident explicables avec cartographie MITRE ATT&CK.",
    sentinel_li1: "<strong>Cat\u00e9gorie</strong> : IA / Cybers\u00e9curit\u00e9",
    sentinel_li2: "<strong>Date du projet</strong> : 2026",
    sentinel_li3:
      '<strong>D\u00e9p\u00f4t</strong> : <a href="https://github.com/Sama-ndari/sentinelai-soc-assistant" target="_blank" rel="noopener noreferrer">github.com/Sama-ndari/sentinelai-soc-assistant</a>',
    sentinel_li4:
      "<strong>Stack</strong> : Python, FastAPI, OpenAI GPT-4o-mini, SQLite, Tailwind CSS",
    sentinel_features_h: "Fonctionnalit\u00e9s cl\u00e9s",
    sentinel_f1:
      "<strong>Moteur de d\u00e9tection hybride</strong>: R\u00e8gles d\u00e9terministes + analyse LLM pour le contexte",
    sentinel_f2:
      "<strong>Confidentialit\u00e9</strong>: Les journaux bruts ne partent pas vers le LLM ; seuls des r\u00e9sum\u00e9s structur\u00e9s",
    sentinel_f3:
      "<strong>Cartographie MITRE ATT&CK</strong>: Classification standard (T1110.001, T1595, T1498, etc.)",
    sentinel_f4:
      "<strong>Multi-formats</strong>: Auth (sshd, sudo), Nginx, JSON avec d\u00e9tection de champs",
    sentinel_f5:
      "<strong>Rapports d\u2019incident</strong>: Gravit\u00e9, preuves, recommandations, risque de faux positif",
    sentinel_f6:
      "<strong>API REST</strong>: CRUD incidents, upload, analyse, statut, sant\u00e9",
    sentinel_rules_h: "R\u00e8gles de d\u00e9tection",
    sentinel_r1: "<strong>Brute force</strong>: \u00c9checs de connexion depuis une m\u00eame IP",
    sentinel_r2: "<strong>IP suspecte</strong>: Multi-utilisateurs, scanners",
    sentinel_r3: "<strong>Anomalie de fr\u00e9quence</strong>: pics de requ\u00eates, activit\u00e9 hors heures",

    aiclone_page_title: "Samandari | Clone IA personnel",
    aiclone_meta_desc:
      "Repr\u00e9sentant IA personnel avec RAG, appels d\u2019outils et capture de leads.",
    aiclone_h2: "Clone IA personnel (RAG agentique)",
    aiclone_intro_p:
      "Au-del\u00e0 d\u2019un chatbot : un <strong>clone IA</strong> qui me repr\u00e9sente 24/7. RAG combin\u00e9 \u00e0 une <strong>boucle d\u2019appels d\u2019outils</strong> pour r\u00e9pondre et d\u00e9clencher des actions externes.",
    aiclone_li1: "<strong>Cat\u00e9gorie</strong> : IA agentique / RAG",
    aiclone_li2: "<strong>Date</strong> : d\u00e9c. 2025",
    aiclone_li3:
      '<strong>D\u00e9mo</strong> : <a href="https://44c046f3ea50c2195e.gradio.live/" target="_blank" rel="noopener noreferrer">Application Gradio</a>',
    aiclone_li4:
      '<strong>D\u00e9p\u00f4t</strong> : <a href="https://github.com/Sama-ndari/personal-ai-clone" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>',
    aiclone_li5: "<strong>Stack</strong> : Python, GPT-4o, Gradio, Pushover API",
    aiclone_agentic_h: "Logique « agentique »",
    aiclone_ag1:
      "<strong>RAG contextuel</strong> : CV et portfolio via <code>pypdf</code> et <code>BeautifulSoup</code>, pour limiter les hallucinations.",
    aiclone_ag2:
      "<strong>Appels d\u2019outils autonomes</strong> : int\u00e9r\u00eat recrutement/contact \u2192 fonction Python d\u2019extraction.",
    aiclone_ag3:
      "<strong>Notifications</strong> : <strong>Pushover</strong> vers mes appareils pour les interactions \u00e0 forte valeur.",
    aiclone_ag4:
      "<strong>Journal d\u2019incertitude</strong> : questions sans r\u00e9ponse enregistr\u00e9es pour enrichir la base.",
    aiclone_arch_h: "Vue d\u2019architecture",
    aiclone_arch_p:
      "Cycle <strong>Recon-Reason-Act</strong> : ingestion semi-structur\u00e9e, intention via prompt « persona », action par outil interne ou API.",

    interview_page_title: "Samandari | Simulateur d\u2019entretien IA",
    interview_meta_desc:
      "Simulateur d\u2019entretien Streamlit + OpenAI : questions adaptatives, streaming, \u00e9valuation automatique.",
    interview_h2: "Simulateur d\u2019entretien IA",
    interview_intro_p:
      "Chatbot d\u2019entretien interactif (Streamlit + OpenAI) : questions dynamiques selon le profil, suivi de session en temps r\u00e9el, \u00e9valuation structur\u00e9e avec feedback.",
    interview_li1: "<strong>Cat\u00e9gorie</strong> : IA, Chatbot, RH",
    interview_li2: "<strong>Date</strong> : 2025",
    interview_li3:
      '<strong>D\u00e9mo</strong> : <a href="https://interview-tool-00tfo4nj6mxyp.streamlit.app/" target="_blank" rel="noopener noreferrer">interview-tool-00tfo4nj6mxyp.streamlit.app</a>',
    interview_li4:
      '<strong>D\u00e9p\u00f4t</strong> : <a href="https://github.com/Sama-ndari/Interview-tool" target="_blank" rel="noopener noreferrer">github.com/Sama-ndari/Interview-tool</a>',
    interview_li5: "<strong>Stack</strong> : Python, Streamlit, OpenAI GPT-4o",
    interview_features_h: "Fonctionnalit\u00e9s cl\u00e9s",
    interview_f1:
      "<strong>Profil candidat</strong>: Nom, exp\u00e9rience, comp\u00e9tences, entreprise, poste, niveau",
    interview_f2:
      "<strong>Entretien adaptatif</strong>: Questions RH via GPT-4o",
    interview_f3:
      "<strong>R\u00e9ponses en streaming</strong>: G\u00e9n\u00e9ration fluide en temps r\u00e9el",
    interview_f4:
      "<strong>Session persistante</strong>: \u00c9tat conserv\u00e9 tout au long de l\u2019entretien",
    interview_f5:
      "<strong>\u00c9valuation auto</strong>: Score 1-10, feedback structur\u00e9, insights",
    interview_f6:
      "<strong>Red\u00e9marrage</strong>: Rechargement en un clic pour un nouvel entretien",
    interview_use_h: "Cas d\u2019usage",
    interview_use_p:
      "Candidats en pr\u00e9paration, \u00e9quipes RH pour pr\u00e9-tri, plateformes de recrutement pour automatiser les premiers \u00e9crans.",

    tasky_page_title: "Samandari | Tasky",
    tasky_meta_desc:
      "Extension Firefox/Chrome pour t\u00e2ches et rappels to-do.",
    tasky_h2: "Rappel de t\u00e2ches",
    tasky_intro_p:
      "Task Reminder est une extension Firefox/Chrome pour g\u00e9rer t\u00e2ches et to-do.",
    tasky_li1: "<strong>Cat\u00e9gorie</strong> : Extension",
    tasky_li2: "<strong>Client</strong> : Public",
    tasky_li3: "<strong>Date du projet</strong> : 01 juin 2025",
    tasky_li4:
      '<strong>URL du projet</strong> : <a href="https://addons.mozilla.org/en-US/firefox/addon/samandari-tasky/" target="_blank" rel="noopener noreferrer">addons.mozilla.org/en-US/firefox/addon/samandari-tasky/</a>'
  });
})();
