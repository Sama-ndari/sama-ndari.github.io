(function () {
  var P = typeof window !== "undefined" && window.SAMA_I18N;
  if (!P) return;

  Object.assign(P.en, {
    kirundi_arch_hero_title: "Ijwi ry'Ikirundi AI | Pipeline architecture",
    kirundi_arch_hero_lead:
      "End-to-end data flow: from community contributions to a production-ready dataset on Hugging Face.",
    kirundi_arch_flow_title: "Data flow",
    kirundi_arch_s1_label: "Contribution",
    kirundi_arch_s1_text: "Community members submit Kirundi sentences and audio via a web app.",
    kirundi_arch_s2_label: "API layer",
    kirundi_arch_s2_text: "Serverless backend receives submissions and writes to staging storage.",
    kirundi_arch_s3_label: "Staging",
    kirundi_arch_s3_text: "Raw data stored temporarily for batch processing.",
    kirundi_arch_s4_label: "ETL pipeline",
    kirundi_arch_s4_text:
      "Pull raw data, clean with RegEx, deduplicate, compute metadata (word count, speaker info).",
    kirundi_arch_s5_label: "Validation",
    kirundi_arch_s5_text: "Automated quality checks, format verification, CI/CD workflows.",
    kirundi_arch_s6_label: "Deployment",
    kirundi_arch_s6_text: "Versioned dataset pushed to Hugging Face Hub via Git LFS.",
    kirundi_arch_s7_label: "Consumption",
    kirundi_arch_s7_text: "Dataset available for ASR, TTS, machine translation, and NLP research.",
    kirundi_arch_principles_title: "Design principles",
    kirundi_arch_principle_1:
      "<strong>Zero infrastructure cost</strong>:  GitHub Pages + Apps Script removes hosting spend.",
    kirundi_arch_principle_2:
      "<strong>Git LFS for audio</strong>:  versioned storage without bloating the repo.",
    kirundi_arch_principle_3:
      "<strong>CSV-first format</strong>:  accessible to researchers with limited tooling.",
    kirundi_arch_principle_4: "<strong>Fully open source</strong>:  every component is public and documented.",
    kirundi_arch_stack_title: "Tech stack",

    kirundi_cs_hero_title: "Ijwi ry'Ikirundi AI | Case study",
    kirundi_cs_hero_meta: "Nov 2025 - Present | Founder & Technical Lead",
    kirundi_cs_problem_title: "The problem",
    kirundi_cs_problem_p:
      "Kirundi is spoken by over 12 million people across Burundi, DR Congo, and diaspora communities, yet it had <strong>zero AI-ready datasets</strong>. No speech recognition. No machine translation. No NLP models. Major AI platforms (OpenAI, Google, Meta) don't support Kirundi at all. Without data, the language risked being permanently excluded from the AI era.",
    kirundi_cs_solution_title: "The solution",
    kirundi_cs_solution_intro: "I designed and built a complete end-to-end data infrastructure from scratch:",
    kirundi_cs_sol_li1:
      "<strong>Zero-cost contribution platform</strong>: a web app (GitHub Pages + Google Apps Script as backend API) that lets anyone submit Kirundi sentences and audio recordings without installing anything.",
    kirundi_cs_sol_li2:
      "<strong>Automated ETL pipeline</strong>: Python scripts (Pandas, RegEx) that pull raw contributions, clean and validate them, deduplicate entries, and compute metadata (word count, character count, speaker info).",
    kirundi_cs_sol_li3:
      "<strong>Dataset hosting on Hugging Face</strong>: versioned via Git LFS, publicly accessible, and structured for ASR, TTS, and NLP downstream tasks.",
    kirundi_cs_sol_li4:
      "<strong>Open-source community</strong>: CONTRIBUTING.md, issue templates, and contributor onboarding to scale data collection beyond one person.",
    kirundi_cs_results_title: "Measurable results",
    kirundi_cs_stat_sentences: "Sentences collected",
    kirundi_cs_stat_words: "Words processed",
    kirundi_cs_stat_cost: "Infrastructure cost",
    kirundi_cs_stat_downloads: "Dataset downloads",
    kirundi_cs_decisions_title: "Key technical decisions",
    kirundi_cs_dec_li1:
      "<strong>Zero hosting cost</strong>: chose GitHub Pages + Apps Script over a traditional server, eliminating recurring expenses for a community project in a low-income context.",
    kirundi_cs_dec_li2:
      "<strong>Git LFS for audio</strong>: audio clips are large; Git LFS allows versioned storage on Hugging Face without bloating the repository.",
    kirundi_cs_dec_li3:
      "<strong>CSV-first data format</strong>: kept the dataset in simple CSV (not Parquet/Arrow) so contributors and researchers in Burundi with limited tooling can inspect and contribute without specialized software.",
    kirundi_cs_matters_title: "Why this matters",
    kirundi_cs_matters_p:
      "This is not a side project. It's <strong>digital sovereignty infrastructure</strong>. Every sentence in this dataset moves Kirundi closer to having working speech recognition, machine translation, and AI assistants. The architecture is designed to be replicated for other low-resource African languages. The entire stack is open-source and documented.",

    kirundi_fel_hero_title: "Giving Kirundi a voice in the AI era",
    kirundi_fel_hero_meta: "A fellowship narrative by Jules Cesar Junior Ndayisenga",
    kirundi_fel_p1:
      "I grew up speaking Kirundi, a language shared by over 12 million people across Burundi, the Democratic Republic of Congo, and a growing diaspora. It is the language of my family, my community, my identity. When I transitioned from a nursing career into AI engineering, I expected to find my mother tongue somewhere in the vast ecosystem of datasets, models, and platforms that power modern AI. It wasn't there. Not in OpenAI. Not in Google. Not in Meta. Not anywhere.",
    kirundi_fel_p2:
      "This absence isn't just a technical gap. It is a form of digital exclusion. When Siri or Google Assistant cannot understand a question asked in Kirundi, millions of Burundians are silently shut out of the technological revolution. Banks cannot deploy voice-based customer service for their Kirundi-speaking clients. NGOs cannot use AI to deliver health or agricultural information by voice to rural, non-literate communities. The language itself risks becoming invisible in the digital world.",
    kirundi_fel_p3:
      "I decided to change that. In November 2025, together with my co-founder, I launched <strong>Ijwi ry'Ikirundi AI</strong>, an open-source initiative to build the first comprehensive AI-ready datasets for the Kirundi language. The name means \"The Voice of Kirundi,\" because that is exactly what we are building: a voice for a language that the AI world has never heard.",
    kirundi_fel_p4:
      "Starting from zero, I designed and built the entire technical infrastructure: a serverless contribution platform where anyone can submit Kirundi sentences and audio recordings without installing anything (built on GitHub Pages and Google Apps Script, with zero hosting cost); an automated Python ETL pipeline that cleans, validates, and deduplicates contributions; and a versioned, publicly accessible dataset hosted on Hugging Face Hub via Git LFS, structured for speech recognition (ASR), text-to-speech (TTS), and natural language processing (NLP) research.",
    kirundi_fel_p5:
      "In just a few months, our team has collected over <strong><span class=\"live-sentences\">4,700</span>+ validated sentences</strong>, processed more than 32,900 words, and attracted researchers and contributors, all at <strong>zero infrastructure cost</strong>. Every component is open-source and documented. The architecture is deliberately designed to be replicated for other low-resource African languages: Kinyarwanda, Swahili, and beyond.",
    kirundi_fel_p6:
      "Our ambition extends beyond data collection. The medium-term vision is to become the <strong>linguistic data hub for East Africa</strong>, targeting 250,000 sentences and 500 hours of audio within 18 months. The long-term goal is to enable working speech recognition, machine translation, and AI assistants that speak Kirundi. We aim to monetize access through a B2B API, serving banks, telecoms, and NGOs who want to automate services in Kirundi, making the project self-sustaining.",
    kirundi_fel_p7:
      "This work is deeply personal. I come from a non-traditional tech background. I trained as a nurse before teaching myself software engineering and AI. That journey taught me that the most impactful technology isn't built in Silicon Valley labs; it's built by people who understand the problems firsthand. Together with my co-founder, we bring complementary skills: I lead the technical architecture while we jointly drive community growth and strategic direction.",
    kirundi_fel_p8:
      "With Ijwi ry'Ikirundi AI, we are not just building a dataset. We are building <strong>digital sovereignty infrastructure</strong>, ensuring that the Kirundi language and the people who speak it have a place in the AI-powered future. Every sentence we collect is a step toward that future. <em>Ikirundi cacu, Ijwi ryacu</em>: Our Kirundi, our voice.",
    kirundi_fel_stat_sent: "Sentences",
    kirundi_fel_stat_speakers: "Speakers",
    kirundi_fel_stat_cost: "Infra cost",

    kirundi_det_info_h: "Project information",
    kirundi_det_li1: "<strong>Category</strong>: AI / Data engineering",
    kirundi_det_li2: "<strong>Project date</strong>: Nov 2025 - Present",
    kirundi_det_li3:
      '<strong>Dataset</strong>: <a href="https://huggingface.co/datasets/Ijwi-ry-Ikirundi-AI/Kirundi_Open_Speech_Dataset" target="_blank" rel="noopener noreferrer">Hugging Face dataset</a>',
    kirundi_det_li4:
      '<strong>Contribution app</strong>: <a href="https://www.samandari.dev/kirundi-contribution-app/" target="_blank" rel="noopener noreferrer">Try the app</a>',
    kirundi_det_li5:
      '<strong>GitHub</strong>: <a href="https://github.com/Ijwi-ryIkirundi-AI" target="_blank" rel="noopener noreferrer">Organization</a>',
    kirundi_det_heading: "Kirundi AI ecosystem 🇧🇮",
    kirundi_det_intro:
      "A complete infrastructure to digitize the Kirundi language for AI applications. This flagship project combines a gold-standard dataset hosted on Hugging Face with a gamified web application that enables community-driven data collection.",
    kirundi_det_key_features: "Key features",
    kirundi_det_feat_li1:
      "<strong>Gold standard dataset</strong>: <span class=\"live-sentences\">4,500</span>+ sentences and audio clips with automated cleaning and validation",
    kirundi_det_feat_li2:
      "<strong>Serverless architecture</strong>: zero-cost backend using Google Apps Script as an API layer",
    kirundi_det_feat_li3:
      "<strong>Gamified contribution</strong>: user-friendly web app for translations and audio recordings",
    kirundi_det_feat_li4:
      "<strong>Automated pipeline</strong>: Python scripts for ETL, data cleaning (Pandas/RegEx), and Hugging Face deployment",
    kirundi_det_feat_li5:
      "<strong>CI/CD workflows</strong>: automated data validation and quality checks",
    kirundi_det_impact_h: "Impact",
    kirundi_det_impact_p:
      "This initiative is preserving the Kirundi language for the AI era, making it accessible for natural language processing, machine translation, and speech recognition applications. By building a comprehensive dataset and fostering a community of contributors, we're ensuring that low-resource languages like Kirundi are not left behind in the AI revolution."
  });

  Object.assign(P.fr, {
    kirundi_arch_hero_title: "Ijwi ry'Ikirundi AI | Architecture du pipeline",
    kirundi_arch_hero_lead:
      "Flux de donn\u00e9es de bout en bout : des contributions communautaires \u00e0 un jeu de donn\u00e9es pr\u00eat pour la production sur Hugging Face.",
    kirundi_arch_flow_title: "Flux de donn\u00e9es",
    kirundi_arch_s1_label: "Contribution",
    kirundi_arch_s1_text:
      "Les membres de la communaut\u00e9 envoient des phrases et de l'audio en kirundi via une application web.",
    kirundi_arch_s2_label: "Couche API",
    kirundi_arch_s2_text:
      "Un backend serverless re\u00e7oit les soumissions et \u00e9crit dans un stockage interm\u00e9diaire.",
    kirundi_arch_s3_label: "Staging",
    kirundi_arch_s3_text: "Donn\u00e9es brutes stock\u00e9es temporairement pour traitement par lots.",
    kirundi_arch_s4_label: "Pipeline ETL",
    kirundi_arch_s4_text:
      "Extraction des donn\u00e9es brutes, nettoyage RegEx, d\u00e9duplication, calcul des m\u00e9tadonn\u00e9es (nombre de mots, locuteur, etc.).",
    kirundi_arch_s5_label: "Validation",
    kirundi_arch_s5_text:
      "Contr\u00f4les qualit\u00e9 automatis\u00e9s, v\u00e9rification des formats, workflows CI/CD.",
    kirundi_arch_s6_label: "D\u00e9ploiement",
    kirundi_arch_s6_text:
      "Jeu de donn\u00e9es versionn\u00e9 pouss\u00e9 vers le Hub Hugging Face via Git LFS.",
    kirundi_arch_s7_label: "Consommation",
    kirundi_arch_s7_text:
      "Jeu de donn\u00e9es disponible pour RAP, synth\u00e8se vocale, traduction automatique et recherche en TAL.",
    kirundi_arch_principles_title: "Principes de conception",
    kirundi_arch_principle_1:
      "<strong>Z\u00e9ro co\u00fbt d'infrastructure</strong>: GitHub Pages + Apps Script supprime les frais d'h\u00e9bergement.",
    kirundi_arch_principle_2:
      "<strong>Git LFS pour l'audio</strong>: stockage versionn\u00e9 sans alourdir le d\u00e9p\u00f4t.",
    kirundi_arch_principle_3:
      "<strong>Format CSV d'abord</strong>: accessible aux chercheurs avec peu d'outillage.",
    kirundi_arch_principle_4:
      "<strong>Enti\u00e8rement open source</strong>: chaque composant est public et document\u00e9.",
    kirundi_arch_stack_title: "Stack technique",

    kirundi_cs_hero_title: "Ijwi ry'Ikirundi AI | \u00c9tude de cas",
    kirundi_cs_hero_meta: "Nov. 2025 - Pr\u00e9sent | Fondateur & lead technique",
    kirundi_cs_problem_title: "Le probl\u00e8me",
    kirundi_cs_problem_p:
      "Le kirundi est parl\u00e9 par plus de 12 millions de personnes au Burundi, en RDC et dans la diaspora, mais il n'existait <strong>aucun jeu de donn\u00e9es pr\u00eat pour l'IA</strong>. Pas de reconnaissance vocale. Pas de traduction automatique. Pas de mod\u00e8les NLP. Les grandes plateformes (OpenAI, Google, Meta) ne le supportent pas. Sans donn\u00e9es, la langue risquait d'\u00eatre exclue durablement de l'\u00e8re de l'IA.",
    kirundi_cs_solution_title: "La solution",
    kirundi_cs_solution_intro:
      "J'ai con\u00e7u et construit une infrastructure de donn\u00e9es de bout en bout \u00e0 partir de z\u00e9ro :",
    kirundi_cs_sol_li1:
      "<strong>Plateforme de contribution \u00e0 co\u00fbt z\u00e9ro</strong> : application web (GitHub Pages + Google Apps Script comme API) permettant \u00e0 chacun d'envoyer phrases et audio sans installation.",
    kirundi_cs_sol_li2:
      "<strong>Pipeline ETL automatis\u00e9</strong> : scripts Python (Pandas, RegEx) qui extraient, nettoient, valident, d\u00e9dupliquent et calculent des m\u00e9tadonn\u00e9es.",
    kirundi_cs_sol_li3:
      "<strong>H\u00e9bergement sur Hugging Face</strong> : versionn\u00e9 via Git LFS, accessible publiquement, structur\u00e9 pour ASR, TTS et t\u00e2ches NLP.",
    kirundi_cs_sol_li4:
      "<strong>Communaut\u00e9 open source</strong> : CONTRIBUTING, mod\u00e8les d'issues et onboarding pour faire cro\u00eetre les contributions.",
    kirundi_cs_results_title: "R\u00e9sultats mesurables",
    kirundi_cs_stat_sentences: "Phrases collect\u00e9es",
    kirundi_cs_stat_words: "Mots trait\u00e9s",
    kirundi_cs_stat_cost: "Co\u00fbt d'infrastructure",
    kirundi_cs_stat_downloads: "T\u00e9l\u00e9chargements du dataset",
    kirundi_cs_decisions_title: "Choix techniques cl\u00e9s",
    kirundi_cs_dec_li1:
      "<strong>Z\u00e9ro h\u00e9bergement</strong> : GitHub Pages + Apps Script plut\u00f4t qu'un serveur classique, pour un projet communautaire dans un contexte \u00e0 revenus modestes.",
    kirundi_cs_dec_li2:
      "<strong>Git LFS pour l'audio</strong> : clips volumineux ; LFS permet le versioning sur Hugging Face sans gonfler le d\u00e9p\u00f4t.",
    kirundi_cs_dec_li3:
      "<strong>CSV d'abord</strong> : format simple pour que contributeurs et chercheurs au Burundi puissent inspecter sans logiciels sp\u00e9cialis\u00e9s.",
    kirundi_cs_matters_title: "Pourquoi c'est important",
    kirundi_cs_matters_p:
      "Ce n'est pas un projet annexe. C'est une <strong>infrastructure de souverainet\u00e9 num\u00e9rique</strong>. Chaque phrase rapproche le kirundi d'une RAP, d'une traduction et d'assistants IA cr\u00e9dibles. L'architecture est pens\u00e9e pour \u00eatre r\u00e9pliqu\u00e9e vers d'autres langues africaines \u00e0 faibles ressources. Toute la stack est open source et document\u00e9e.",

    kirundi_fel_hero_title: "Donner une voix au kirundi \u00e0 l'\u00e8re de l'IA",
    kirundi_fel_hero_meta: "R\u00e9cit par Jules Cesar Junior Ndayisenga",
    kirundi_fel_p1:
      "J'ai grandi en parlant kirundi, une langue partag\u00e9e par plus de 12 millions de personnes au Burundi, en RDC et dans une diaspora croissante. C'est la langue de ma famille, de ma communaut\u00e9, de mon identit\u00e9. En passant des soins infirmiers \u00e0 l'ing\u00e9nierie IA, je m'attendais \u00e0 retrouver ma langue dans datasets, mod\u00e8les et plateformes. Elle n'y \u00e9tait pas. Ni chez OpenAI, ni Google, ni Meta.",
    kirundi_fel_p2:
      "Cette absence n'est pas qu'un trou technique : c'est une forme d'exclusion num\u00e9rique. Quand les assistants ne comprennent pas le kirundi, des millions de Burundais restent \u00e0 l'\u00e9cart. Les banques ne peuvent pas d\u00e9ployer la voix pour leurs clients ; les ONG peinent \u00e0 livrer sant\u00e9 ou agriculture par la voix en zones rurales. La langue risque l'invisibilit\u00e9 num\u00e9rique.",
    kirundi_fel_p3:
      "J'ai d\u00e9cid\u00e9 d'agir. En novembre 2025, avec mon cofondateur, nous avons lanc\u00e9 <strong>Ijwi ry'Ikirundi AI</strong>, une initiative open source pour les premiers jeux de donn\u00e9es complets et exploitables par l'IA en kirundi. Le nom signifie \u00ab La voix du kirundi \u00bb : c'est exactement ce que nous construisons.",
    kirundi_fel_p4:
      "\u00c0 partir de z\u00e9ro, j'ai con\u00e7u toute l'infrastructure : plateforme serverless (GitHub Pages + Apps Script, co\u00fbt d'h\u00e9bergement nul), pipeline Python ETL automatis\u00e9, jeu de donn\u00e9es versionn\u00e9 sur Hugging Face via Git LFS, structur\u00e9 pour RAP, TTS et recherche NLP.",
    kirundi_fel_p5:
      "En quelques mois, l'\u00e9quipe a collect\u00e9 plus de <strong><span class=\"live-sentences\">4 700</span>+ phrases valid\u00e9es</strong>, trait\u00e9 plus de 32 900 mots, attir\u00e9 chercheurs et contributeurs, le tout \u00e0 <strong>co\u00fbt d'infrastructure z\u00e9ro</strong>. Tout est open source et document\u00e9. L'architecture vise \u00e0 \u00eatre r\u00e9pliqu\u00e9e pour d'autres langues africaines \u00e0 faibles ressources.",
    kirundi_fel_p6:
      "L'ambition d\u00e9passe la collecte : devenir un <strong>p\u00f4le de donn\u00e9es linguistiques pour l'Afrique de l'Est</strong>, viser 250 000 phrases et 500 h d'audio en 18 mois, puis RAP, traduction et assistants en kirundi, avec une API B2B pour banques, t\u00e9l\u00e9coms et ONG.",
    kirundi_fel_p7:
      "Ce travail est personnel. Infirmier de formation, j'ai appris seul le d\u00e9veloppement et l'IA : la tech la plus utile se construit l\u00e0 o\u00f9 on comprend le probl\u00e8me. Avec mon cofondateur, comp\u00e9tences compl\u00e9mentaires : j'architecture la technique, nous portons ensemble communaut\u00e9 et strat\u00e9gie.",
    kirundi_fel_p8:
      "Avec Ijwi ry'Ikirundi AI, nous ne faisons pas qu'un dataset : nous b\u00e2tissons une <strong>infrastructure de souverainet\u00e9 num\u00e9rique</strong> pour que le kirundi et ses locuteurs aient leur place dans l'avenir pilot\u00e9 par l'IA. Chaque phrase compte. <em>Ikirundi cacu, Ijwi ryacu</em> : notre kirundi, notre voix.",
    kirundi_fel_stat_sent: "Phrases",
    kirundi_fel_stat_speakers: "Locuteurs",
    kirundi_fel_stat_cost: "Co\u00fbt infra",

    kirundi_det_info_h: "Informations projet",
    kirundi_det_li1: "<strong>Cat\u00e9gorie</strong> : IA / Ing\u00e9nierie des donn\u00e9es",
    kirundi_det_li2: "<strong>Date du projet</strong> : nov. 2025 - Pr\u00e9sent",
    kirundi_det_li3:
      '<strong>Jeu de donn\u00e9es</strong> : <a href="https://huggingface.co/datasets/Ijwi-ry-Ikirundi-AI/Kirundi_Open_Speech_Dataset" target="_blank" rel="noopener noreferrer">Dataset Hugging Face</a>',
    kirundi_det_li4:
      '<strong>App de contribution</strong> : <a href="https://www.samandari.dev/kirundi-contribution-app/" target="_blank" rel="noopener noreferrer">Essayer l\u2019app</a>',
    kirundi_det_li5:
      '<strong>GitHub</strong> : <a href="https://github.com/Ijwi-ryIkirundi-AI" target="_blank" rel="noopener noreferrer">Organisation</a>',
    kirundi_det_heading: "\u00c9cosyst\u00e8me IA Kirundi \ud83c\udde7\ud83c\uddee",
    kirundi_det_intro:
      "Une infrastructure compl\u00e8te pour num\u00e9riser le kirundi \u00e0 des fins d'IA. Ce projet phare combine un jeu de donn\u00e9es de r\u00e9f\u00e9rence sur Hugging Face et une application web ludique pour la collecte communautaire.",
    kirundi_det_key_features: "Fonctionnalit\u00e9s cl\u00e9s",
    kirundi_det_feat_li1:
      "<strong>Jeu de donn\u00e9es de r\u00e9f\u00e9rence</strong> : <span class=\"live-sentences\">4 500</span>+ phrases et clips audio avec nettoyage et validation automatis\u00e9s",
    kirundi_det_feat_li2:
      "<strong>Architecture serverless</strong> : backend sans co\u00fbt r\u00e9current via Google Apps Script comme couche API",
    kirundi_det_feat_li3:
      "<strong>Contribution ludique</strong> : application web simple pour traductions et enregistrements audio",
    kirundi_det_feat_li4:
      "<strong>Pipeline automatis\u00e9</strong> : scripts Python pour ETL, nettoyage (Pandas/RegEx) et d\u00e9ploiement Hugging Face",
    kirundi_det_feat_li5:
      "<strong>Workflows CI/CD</strong> : validation des donn\u00e9es et contr\u00f4les qualit\u00e9 automatis\u00e9s",
    kirundi_det_impact_h: "Impact",
    kirundi_det_impact_p:
      "Cette initiative pr\u00e9serve le kirundi pour l'\u00e8re de l'IA : TAL, traduction automatique, reconnaissance vocale. En construisant un jeu de donn\u00e9es solide et une communaut\u00e9 de contributeurs, nous \u00e9vitons que des langues \u00e0 faibles ressources comme le kirundi restent en marge de la r\u00e9volution de l'IA."
  });

  if (typeof applyI18nHead === "function") applyI18nHead();
})();
