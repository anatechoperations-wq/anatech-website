export type MalayalamService = {
  slug: string;
  englishHref: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  audience: string[];
  process: string[];
  keywords: string[];
  faq: { question: string; answer: string }[];
};

export const malayalamServices: MalayalamService[] = [
  {
    slug: "web-development", englishHref: "/services/web-development", title: "വെബ് ഡെവലപ്മെന്റ്", eyebrow: "ബിസിനസ്സിന്റെ ഓൺലൈൻ മുഖം",
    description: "വിശ്വാസ്യതയും വേഗതയും SEO അടിസ്ഥാനവും ഉള്ള business website, e-commerce store, portal, custom web application എന്നിവ നിർമ്മിക്കുന്നു.",
    highlights: ["Responsive business websites", "E-commerce & online catalogues", "SEO-ready website foundation", "Custom web applications"],
    audience: ["പുതിയ സംരംഭം online-ൽ വിശ്വാസ്യതയോടെ അവതരിപ്പിക്കേണ്ടവർ", "നിലവിലുള്ള ബിസിനസ്സിന് website അല്ലെങ്കിൽ catalogue വേണ്ടവർ", "mobile-ലും desktop-ലും നന്നായി പ്രവർത്തിക്കുന്ന site ആഗ്രഹിക്കുന്നവർ"],
    process: ["ആവശ്യം, target customer, ആവശ്യമായ pages എന്നിവ സംസാരിക്കുന്നു.", "Content, structure, design direction, development scope എന്നിവ വ്യക്തമായി നിർദേശിക്കുന്നു.", "പരിശോധനയും അംഗീകാരവും കഴിഞ്ഞ് launch, handover, next-step support എന്നിവ ക്രമീകരിക്കുന്നു."],
    keywords: ["വെബ് ഡെവലപ്മെന്റ് കേരളം", "ബിസിനസ് വെബ്സൈറ്റ്", "ഇ-കൊമേഴ്സ് വെബ്സൈറ്റ്", "responsive website"],
    faq: [{ question: "എത്ര pages വേണം എന്ന് എങ്ങനെ തീരുമാനിക്കും?", answer: "നിങ്ങളുടെ സേവനം, target customer, ആവശ്യമായ enquiry flow എന്നിവ നോക്കി ആവശ്യമായ pages മാത്രം ചേർക്കുന്ന scope നിർദേശിക്കും." }, { question: "Website search engine-ൽ വരുമോ?", answer: "സാങ്കേതിക SEO foundation, clear page titles, descriptions, mobile-friendly structure എന്നിവ ഒരുക്കാം. Ranking ഒരു ഉറപ്പല്ല; തുടർച്ചയായ content, competition, search engine factors എന്നിവയും ബാധിക്കും." }]
  },
  {
    slug: "ai-solutions", englishHref: "/services/ai-solutions", title: "AI സൊല്യൂഷൻസ്", eyebrow: "ബിസിനസ് automation",
    description: "AI chatbots, workflow automation, business intelligence, responsible AI adoption എന്നിവയ്ക്ക് ആവശ്യാനുസൃത പരിഹാരങ്ങൾ.",
    highlights: ["AI chatbot & enquiry support", "Workflow automation", "Business intelligence support", "AI adoption consultation"],
    audience: ["ആവർത്തിക്കുന്ന enquiry അല്ലെങ്കിൽ documentation work കുറയ്ക്കേണ്ട സ്ഥാപനങ്ങൾ", "ടീമിന് വേഗത്തിൽ വിവരങ്ങൾ കണ്ടെത്താനും follow-up ചെയ്യാനും സഹായം വേണമെന്നവർ", "AI ഉപയോഗിക്കേണ്ട സ്ഥലം ആദ്യം വ്യക്തമായി മനസ്സിലാക്കാൻ ആഗ്രഹിക്കുന്നവർ"],
    process: ["നിലവിലെ process, data availability, repetitive work എന്നിവ പരിശോധിക്കുന്നു.", "ചെറിയ, ഉപയോഗപ്രദമായ use case-ൽ തുടങ്ങാൻ scope നിർദേശിക്കുന്നു.", "Testing, team guidance, responsible usage checks എന്നിവ കഴിഞ്ഞ് rollout തീരുമാനിക്കുന്നു."],
    keywords: ["AI solutions Kerala", "AI chatbot Malayalam", "business automation", "workflow automation"],
    faq: [{ question: "AI എല്ലാം സ്വയം ചെയ്യുമോ?", answer: "അല്ല. ശരിയായ task തിരഞ്ഞെടുക്കുകയും മനുഷ്യന്റെ review ആവശ്യമായിടത്ത് നിലനിർത്തുകയും ചെയ്യുന്നതാണ് നല്ല implementation." }, { question: "എന്റെ business-ിന് AI ഉപകാരപ്പെടുമോ?", answer: "ആവർത്തിക്കുന്ന enquiry, documents, reports, follow-up പോലുള്ള കാര്യങ്ങൾ ഉണ്ടെങ്കിൽ ആദ്യം ഒരു practical assessment ചെയ്യാം." }]
  },
  {
    slug: "software-development", englishHref: "/services/software-development", title: "സോഫ്റ്റ്‌വെയർ ഡെവലപ്മെന്റ്", eyebrow: "നിങ്ങളുടെ പ്രവർത്തനരീതിക്ക് അനുയോജ്യം",
    description: "CRM, billing, inventory, workflow, ERP-style business systems എന്നിവ ആവശ്യത്തിനനുസരിച്ച് രൂപകൽപ്പന ചെയ്യുന്നു.",
    highlights: ["Custom business software", "CRM & workflow systems", "Billing and inventory processes", "Reports and automation"],
    audience: ["Excel, WhatsApp, paper records എന്നിവയിൽ കുടുങ്ങിയ പ്രവർത്തനരീതിയുള്ള സ്ഥാപനങ്ങൾ", "Lead മുതൽ invoice വരെ ഒരേ workflow വേണമെന്നവർ", "ഉപയോഗിക്കാൻ എളുപ്പമുള്ള internal system വേണ്ട ചെറിയ/വളരുന്ന സ്ഥാപനങ്ങൾ"],
    process: ["നിലവിലെ workflow, users, required reports എന്നിവ രേഖപ്പെടുത്തുന്നു.", "ആദ്യം ആവശ്യമായ modules അടങ്ങിയ phased scope തീരുമാനിക്കുന്നു.", "Testing, user feedback, training എന്നിവയ്ക്ക് ശേഷം implementation മുന്നോട്ട് കൊണ്ടുപോകുന്നു."],
    keywords: ["custom software Kerala", "CRM software", "billing inventory software", "business automation software"],
    faq: [{ question: "എല്ലാ modules-ഉം ഒരുമിച്ച് വേണമോ?", answer: "അവശ്യമായ core workflow-ൽ തുടങ്ങി പിന്നീട് modules ചേർക്കുന്ന phased approach പല സ്ഥാപനങ്ങൾക്കും കൂടുതൽ സുരക്ഷിതമാണ്." }, { question: "Staff-ന് ഉപയോഗിക്കാൻ ബുദ്ധിമുട്ടാകുമോ?", answer: "Screens, roles, daily process എന്നിവ നിങ്ങളുടെ team-ന്റെ യഥാർത്ഥ ഉപയോഗം നോക്കി ലളിതമാക്കുകയാണ് ലക്ഷ്യം." }]
  },
  {
    slug: "digital-media", englishHref: "/services/digital-media", title: "ഡിജിറ്റൽ മീഡിയ", eyebrow: "ബ്രാൻഡ് വളർച്ച",
    description: "ബ്രാൻഡ് ഐഡന്റിറ്റി, സോഷ്യൽ മീഡിയ ഉള്ളടക്കം, campaign creative, marketing communication എന്നിവയ്ക്കുള്ള creative support.",
    highlights: ["Brand identity", "Social media content", "Campaign creative", "Marketing materials"],
    audience: ["സോഷ്യൽ മീഡിയയിൽ സ്ഥിരതയുള്ള professional presence വേണമെന്ന ബിസിനസ്സുകൾ", "പുതിയ service അല്ലെങ്കിൽ offer വ്യക്തമായി അവതരിപ്പിക്കേണ്ടവർ", "brand message, design, content എന്നിവ ഒറ്റ ദിശയിൽ കൊണ്ടുപോകാൻ ആഗ്രഹിക്കുന്നവർ"],
    process: ["ബ്രാൻഡ്, customer, business goal എന്നിവ മനസ്സിലാക്കുന്നു.", "Content themes, creative direction, deliverables എന്നിവ നിർദേശിക്കുന്നു.", "Review cycle-ൽ തിരുത്തലുകൾ പൂർത്തിയാക്കി final assets കൈമാറുന്നു."],
    keywords: ["digital media Kerala", "social media content", "brand identity", "marketing creative"],
    faq: [{ question: "Social media post മാത്രം ചെയ്താൽ മതിയോ?", answer: "Post-കൾ ഒരു ഭാഗം മാത്രം ആണ്. Message, target customer, consistency, enquiry path എന്നിവ കൂടി നോക്കണം." }, { question: "Monthly content plan ലഭിക്കുമോ?", answer: "നിങ്ങളുടെ ലക്ഷ്യവും scope-ഉം അനുസരിച്ച് content calendar അല്ലെങ്കിൽ campaign-based deliverables തീരുമാനിക്കാം." }]
  },
  {
    slug: "import-export", englishHref: "/services/import-export", title: "ഇംപോർട്ട് & എക്സ്പോർട്ട് സഹായം", eyebrow: "അന്താരാഷ്ട്ര വ്യാപാരത്തിന് തയ്യാറെടുപ്പ്",
    description: "IEC, documentation, online portal guidance, export readiness എന്നിവയിൽ പ്രായോഗിക സഹായം.",
    highlights: ["IEC documentation support", "Trade document guidance", "Portal process support", "Export readiness consultation"],
    audience: ["ഇംപോർട്ട്/എക്സ്പോർട്ട് തുടങ്ങുന്നതിന് മുമ്പ് process മനസ്സിലാക്കേണ്ടവർ", "രേഖകളും portal steps-ഉം ക്രമീകരിക്കേണ്ട MSME-കൾ", "ഉൽപ്പന്നം/സേവനം trade-ready ആണോ എന്ന് ആദ്യം ആലോചിക്കുന്നവർ"],
    process: ["Business requirement, product category, current documents എന്നിവ മനസ്സിലാക്കുന്നു.", "ബാധകമായ process, documents, external professional support ആവശ്യമായ ഭാഗങ്ങൾ വ്യക്തമായി പറയുന്നു.", "നിങ്ങൾ തീരുമാനിക്കുന്ന next step-നായി document checklist, portal guidance എന്നിവ നൽകുന്നു."],
    keywords: ["import export consultancy Kerala", "IEC guidance", "export documentation", "trade readiness"],
    faq: [{ question: "IEC അല്ലെങ്കിൽ statutory approval ഉറപ്പാണോ?", answer: "അംഗീകാരം ബന്ധപ്പെട്ട authority-യുടെ തീരുമാനമാണ്. ആവശ്യമായ വിവരങ്ങളും രേഖകളും തയ്യാറാക്കുന്നതിൽ guidance നൽകാം; ഫലം ഉറപ്പാക്കാൻ കഴിയില്ല." }, { question: "എല്ലാ products-ക്കും ഒരേ process ആണോ?", answer: "അല്ല. ഉൽപ്പന്നം, രാജ്യം, നിയമപരമായ ആവശ്യകതകൾ എന്നിവ അനുസരിച്ച് process മാറാം." }]
  },
  {
    slug: "business-consultancy", englishHref: "/services/business-consultancy", title: "ബിസിനസ്സ് കൺസൾട്ടൻസി", eyebrow: "വളർച്ചയ്ക്ക് വ്യക്തമായ ദിശ",
    description: "പുതിയ സംരംഭങ്ങൾക്കും MSME-കൾക്കും പ്രവർത്തനക്രമം, digital transformation, planning എന്നിവയിൽ പിന്തുണ.",
    highlights: ["Business planning", "MSME support", "Digital transformation", "Process improvement"],
    audience: ["പുതിയ സംരംഭം തുടങ്ങുന്നതിന് മുമ്പ് priorities തീരുമാനിക്കേണ്ടവർ", "process, customer follow-up, documents എന്നിവ ക്രമീകരിക്കേണ്ട MSME-കൾ", "technology ഉപയോഗിച്ച് പ്രവർത്തനം ലളിതമാക്കാൻ ആഗ്രഹിക്കുന്നവർ"],
    process: ["നിങ്ങളുടെ ഇപ്പോഴത്തെ സ്ഥിതി, ലക്ഷ്യം, തടസ്സങ്ങൾ എന്നിവ കേൾക്കുന്നു.", "പ്രായോഗിക next steps, tools, documentation priorities എന്നിവ നിർദേശിക്കുന്നു.", "നിങ്ങൾ അംഗീകരിക്കുന്ന scope അനുസരിച്ച് implementation support തീരുമാനിക്കുന്നു."],
    keywords: ["business consultancy Kerala", "MSME support", "business planning", "digital transformation"],
    faq: [{ question: "Consultation കഴിഞ്ഞാൽ എന്ത് കിട്ടും?", answer: "ചർച്ച ചെയ്ത പ്രശ്നങ്ങൾക്കും priorities-ക്കും അനുയോജ്യമായ action direction ലഭിക്കും. Project scope വേണമെങ്കിൽ അത് വേർതിരിച്ച് തീരുമാനിക്കും." }, { question: "പുതിയ business-കൾക്കും സഹായമുണ്ടോ?", answer: "ഉണ്ട്. ആദ്യമായി customer, service, process, documentation, digital presence എന്നിവ ക്രമപ്പെടുത്താൻ സഹായിക്കാം." }]
  },
  {
    slug: "government-e-services", englishHref: "/services/government-e-services", title: "ഗവൺമെന്റ് ഇ-സർവീസസ്", eyebrow: "ഡിജിറ്റൽ compliance സഹായം",
    description: "GST-related digital processes, digital signature guidance, online applications, portal workflows എന്നിവയിൽ സഹായം.",
    highlights: ["GST-related support", "Digital signature guidance", "Online application assistance", "Portal workflow support"],
    audience: ["Online applications, portal steps, digital documents എന്നിവയിൽ സഹായം വേണമെന്നവർ", "ബിസിനസ് രേഖകൾ ക്രമമായി സൂക്ഷിക്കാൻ ആഗ്രഹിക്കുന്നവർ", "ഒരു particular service-ന്റെ process ആദ്യം മനസ്സിലാക്കേണ്ടവർ"],
    process: ["നിങ്ങളുടെ ആവശ്യവും നിലവിലുള്ള documents-ഉം പരിശോധിക്കുന്നു.", "സംബന്ധപ്പെട്ട portal/process-ന്റെ information, checklist, required professional involvement എന്നിവ വ്യക്തമാക്കുന്നു.", "അനുമതിയുള്ള പരിധിയിൽ application support അല്ലെങ്കിൽ document-preparation guidance നൽകുന്നു."],
    keywords: ["government e services Kerala", "digital application assistance", "digital signature guidance", "GST digital process"],
    faq: [{ question: "Government approval ഉറപ്പാണോ?", answer: "അല്ല. Approval ബന്ധപ്പെട്ട authority-യുടെ തീരുമാനമാണ്. ശരിയായ process പിന്തുടരാനും documents തയ്യാറാക്കാനും മാത്രമാണ് സഹായം." }, { question: "GST filing അല്ലെങ്കിൽ legal advice ലഭിക്കുമോ?", answer: "Statutory filing, tax, legal matters-ൽ ആവശ്യമായിടത്ത് qualified CA/advocate/authorised professional-ന്റെ സഹായം വേണം. ഞങ്ങൾ process coordination guidance നൽകാം." }]
  },
  {
    slug: "training-academy", englishHref: "/services/training-academy", title: "ട്രെയിനിംഗ് & അക്കാദമി", eyebrow: "പ്രായോഗിക ഡിജിറ്റൽ കഴിവുകൾ",
    description: "വിദ്യാർഥികൾക്കും professionals-നും സ്ഥാപനങ്ങൾക്കും AI, software, web, digital skills സംബന്ധിച്ച പരിശീലനം.",
    highlights: ["AI & digital skills", "Software and web technology", "Career-focused learning", "Corporate workshops"],
    audience: ["ഡിജിറ്റൽ skills അടിസ്ഥാനത്തിൽ പഠിക്കാനാഗ്രഹിക്കുന്ന വിദ്യാർഥികൾ", "പുതിയ tools ഉപയോഗിക്കാൻ team training വേണ്ട സ്ഥാപനങ്ങൾ", "career അല്ലെങ്കിൽ work context-നായി practical learning ആഗ്രഹിക്കുന്നവർ"],
    process: ["Learners, prior knowledge, learning goal എന്നിവ മനസ്സിലാക്കുന്നു.", "Topics, duration, practical activities, delivery mode എന്നിവ തീരുമാനിക്കുന്നു.", "Session feedback അടിസ്ഥാനമാക്കി learning support അല്ലെങ്കിൽ next module നിർദേശിക്കുന്നു."],
    keywords: ["AI training Kerala", "digital skills training", "software training", "corporate workshop"],
    faq: [{ question: "Beginners-ക്ക് ചേരുമോ?", answer: "ചേരും. Batch-ന്റെ prior knowledge അനുസരിച്ച് foundation മുതൽ practical level വരെ plan ചെയ്യാം." }, { question: "Certificate ഉറപ്പാണോ?", answer: "Certificate, assessment, programme format എന്നിവ course scope തീരുമാനിക്കുമ്പോൾ മാത്രം വ്യക്തമാക്കും." }]
  }
];
