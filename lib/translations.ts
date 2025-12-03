export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    contactUs: string;
  };
  
  // Hero Section
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    ctaButton: string;
    ctaButtonSubtext: string;
    bookFreeConsultation: string;
  };
  
  // Scrolling Banner
  banner: {
    certifiedProfessionals: string;
    licensedInsured: string;
    qualityGuaranteed: string;
    freeQuotes: string;
    service24_7: string;
    satisfactionGuaranteed: string;
    expertCraftsmanship: string;
  };
  
  // About Section
  about: {
    about: string;
    ourStory: string;
    ourValues: string;
    ourApproach: string;
    whyChooseUs: string;
    aboutTitle: string;
    aboutDescription1: string;
    aboutDescription2: string;
    storyTitle: string;
    storyDescription1: string;
    storyDescription2: string;
    valuesTitle: string;
    qualityFirst: string;
    qualityFirstDesc: string;
    integrity: string;
    integrityDesc: string;
    customerFocus: string;
    customerFocusDesc: string;
    approachTitle: string;
    approachQuote: string;
    approachDescription: string;
    whyChooseTitle: string;
    whyChooseDescription: string;
    modernFacilities: string;
    modernFacilitiesDesc: string;
    transparentAffordable: string;
    transparentAffordableDesc: string;
    expertTeam: string;
    expertTeamDesc: string;
    clientSupport: string;
    clientSupportDesc: string;
  };
  
  // Services
  services: {
    title: string;
    description: string;
    all: string;
    construction: string;
    maintenance: string;
    decorative: string;
  };
  
  // Contact Section
  contact: {
    title: string;
    description: string;
    getInTouch: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    message: string;
    sendMessage: string;
    sending: string;
    messageSent: string;
    messageSentDesc: string;
    selectProjectType: string;
    contactInformation: string;
    connectWithUs: string;
    connectDescription: string;
    quickResponse: string;
    quickResponseDesc: string;
    onlineNow: string;
    projectTypes: {
      construction: string;
      maintenance: string;
      decorative: string;
      consulting: string;
      other: string;
    };
    contactInfo: {
      email: string;
      emailDesc: string;
      phone: string;
      phoneDesc: string;
      location: string;
      support: string;
      supportDesc: string;
    };
  };
  
  // Footer
  footer: {
    stayUpdated: string;
    subscribe: string;
    subscribePlaceholder: string;
    subscribeButton: string;
    subscribing: string;
    subscribed: string;
    allServices: string;
    aboutUs: string;
    copyright: string;
    tagline: string;
    license: string;
    imageDisclaimer: string;
    privacy: string;
    terms: string;
    cookies: string;
    company: string;
    services: string;
    brandDescription: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      contactUs: 'Contact Us',
    },
    hero: {
      headline: 'Experience\n you trust,',
      subheadline: 'Quality you deserve',
      description: 'Excellence is the foundation upon which we build. Our maintenance services company stands for unwavering quality and the creation of solutions that embody strength and longevity.',
      ctaButton: 'Ready to Transform?',
      ctaButtonSubtext: 'Contact us now!',
      bookFreeConsultation: 'GET YOUR FREE QUOTE',
    },
    banner: {
      certifiedProfessionals: 'CERTIFIED PROFESSIONALS',
      licensedInsured: 'LICENSED & INSURED',
      qualityGuaranteed: 'QUALITY GUARANTEED',
      freeQuotes: 'FREE QUOTES',
      service24_7: '24/7 SERVICE',
      satisfactionGuaranteed: 'SATISFACTION GUARANTEED',
      expertCraftsmanship: 'EXPERT CRAFTSMANSHIP',
    },
    about: {
      about: 'ABOUT',
      ourStory: 'OUR STORY',
      ourValues: 'OUR VALUES',
      ourApproach: 'OUR APPROACH',
      whyChooseUs: 'WHY CHOOSE US',
      aboutTitle: 'About Smartscrews',
      aboutDescription1: 'We are a leading provider of professional building and maintenance services, committed to delivering exceptional craftsmanship and outstanding customer service.',
      aboutDescription2: 'With a team of certified professionals and a commitment to excellence, we bring expertise and reliability to every project, ensuring results that exceed expectations.',
      storyTitle: 'Our Story',
      storyDescription1: 'Smartscrews was founded with a simple purpose: to deliver trustworthy building and maintenance services through exceptional skill and unwavering integrity.',
      storyDescription2: 'What began as a small crew of dedicated craftsmen has grown into a comprehensive service provider, yet our commitment to quality and attention to detail remains unchanged.',
      valuesTitle: 'Our Values',
      qualityFirst: 'Quality First',
      qualityFirstDesc: 'Meticulously selected materials and attention to detail for lasting results.',
      integrity: 'Integrity',
      integrityDesc: 'Transparent communication and honest practices in everything we do.',
      customerFocus: 'Customer Focus',
      customerFocusDesc: 'We listen and collaborate to bring your vision to life with precision.',
      approachTitle: 'Our Approach',
      approachQuote: 'We believe in hiring people based on who they are, not just what they have done.',
      approachDescription: 'Training someone in our methods is easier than teaching someone to uphold our values. Our team is friendly, committed, and takes genuine pride in producing work that reflects our high standards.',
      whyChooseTitle: 'Why Choose Us',
      whyChooseDescription: 'Clients choose Smart Screws because we combine expert craftsmanship with precision, modern techniques, and a client-first approach. From installation to maintenance, we make construction simple, reliable, and centered around your needs.',
      modernFacilities: 'Modern Facilities & Technology',
      modernFacilitiesDesc: 'Latest tools and techniques for precision work.',
      transparentAffordable: 'Transparent & Affordable',
      transparentAffordableDesc: 'Quality work without hidden costs.',
      expertTeam: 'Expert Team of Specialists',
      expertTeamDesc: 'Skilled professionals committed to excellence.',
      clientSupport: '24/7 Client Support',
      clientSupportDesc: "Because construction needs don't wait for office hours.",
    },
    services: {
      title: 'Our Services',
      description: 'We craft world-class building and maintenance solutions that elevate your property and drive lasting results. From strategy to execution, we bring your vision to life with expertise and precision.',
      all: 'All',
      construction: 'Construction',
      maintenance: 'Maintenance',
      decorative: 'Decorative',
    },
    contact: {
      title: 'Ready to Transform?',
      description: "Let's discuss how Smartscrews can help you achieve your building and maintenance goals. Get in touch and let's build something amazing together.",
      getInTouch: 'Get In Touch',
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email *',
      phone: 'Phone',
      company: 'Company',
      projectType: 'Project Type *',
      message: 'Message *',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message Sent Successfully!',
      messageSentDesc: "We'll get back to you within 2-4 hours.",
      selectProjectType: 'Select a project type',
      contactInformation: 'Contact Information',
      connectWithUs: 'Connect With Us',
      connectDescription: 'Follow us on social media for the latest updates and insights.',
      quickResponse: 'Quick Response',
      quickResponseDesc: 'We typically respond within 2-4 hours during business hours.',
      onlineNow: 'Online now',
      projectTypes: {
        construction: 'Construction',
        maintenance: 'Maintenance',
        decorative: 'Decorative',
        consulting: 'Consulting',
        other: 'Other',
      },
      contactInfo: {
        email: 'Email',
        emailDesc: 'Send us a message anytime',
        phone: 'Phone',
        phoneDesc: 'Call us directly',
        location: 'Location',
        support: 'Support',
        supportDesc: 'Always here for you',
      },
    },
    footer: {
      stayUpdated: 'Stay Updated with Latest Updates',
      subscribe: 'Get the latest updates on our services, projects, and maintenance tips delivered directly to your inbox.',
      subscribePlaceholder: 'Enter your email',
      subscribeButton: 'Subscribe',
      subscribing: 'Subscribing...',
      subscribed: 'Successfully subscribed! Welcome to the Smartscrews community.',
      allServices: 'All Services',
      aboutUs: 'About Us',
      copyright: `© ${new Date().getFullYear()} Smart Screws Technical Services L.L.C. All rights reserved.`,
      tagline: 'Building excellence, one project at a time.',
      license: 'Licensed by Department of Economy & Tourism, Dubai | License valid until 17/11/2026',
      imageDisclaimer: '*Images used on this website are AI-generated and are for representative purposes only.',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      company: 'Company',
      services: 'Services',
      brandDescription: 'Professional building and maintenance services you can trust. From construction to maintenance, we deliver quality solutions with expertise and precision.',
    },
  },
  ar: {
    nav: {
      about: 'من نحن',
      services: 'الخدمات',
      projects: 'المشاريع',
      contact: 'اتصل بنا',
      contactUs: 'اتصل بنا',
    },
    hero: {
      headline: 'تجربة تثق بها،',
      subheadline: 'جودة تستحقها',
      description: 'التميز هو الأساس الذي نبني عليه. تلتزم شركتنا للبناء بجودة ثابتة وإنشاء هياكل تجسد القوة والمتانة.',
      ctaButton: 'جاهز للتحول؟',
      ctaButtonSubtext: 'اتصل بنا الآن!',
      bookFreeConsultation: 'احصل على عرض سعر مجاني',
    },
    banner: {
      certifiedProfessionals: 'مهنيون معتمدون',
      licensedInsured: 'مرخص ومؤمن',
      qualityGuaranteed: 'جودة مضمونة',
      freeQuotes: 'عروض أسعار مجانية',
      service24_7: 'خدمة على مدار الساعة',
      satisfactionGuaranteed: 'رضا مضمون',
      expertCraftsmanship: 'حرفية خبيرة',
    },
    about: {
      about: 'من نحن',
      ourStory: 'قصتنا',
      ourValues: 'قيمنا',
      ourApproach: 'نهجنا',
      whyChooseUs: 'لماذا تختارنا',
      aboutTitle: 'عن سمارت سكروز',
      aboutDescription1: 'نحن مزود رائد لخدمات البناء والصيانة المهنية، ملتزمون بتقديم حرفية استثنائية وخدمة عملاء متميزة.',
      aboutDescription2: 'مع فريق من المهنيين المعتمدين والتزام بالتميز، نقدم الخبرة والموثوقية لكل مشروع، مما يضمن نتائج تتجاوز التوقعات.',
      storyTitle: 'قصتنا',
      storyDescription1: 'تأسست سمارت سكروز بهدف بسيط: تقديم خدمات بناء وصيانة موثوقة من خلال مهارة استثنائية ونزاهة ثابتة.',
      storyDescription2: 'ما بدأ كطاقم صغير من الحرفيين المتفانين نما ليصبح مزود خدمة شامل، ومع ذلك يبقى التزامنا بالجودة والاهتمام بالتفاصيل دون تغيير.',
      valuesTitle: 'قيمنا',
      qualityFirst: 'الجودة أولاً',
      qualityFirstDesc: 'مواد مختارة بعناية واهتمام بالتفاصيل لنتائج دائمة.',
      integrity: 'النزاهة',
      integrityDesc: 'تواصل شفاف وممارسات صادقة في كل ما نقوم به.',
      customerFocus: 'التركيز على العميل',
      customerFocusDesc: 'نستمع ونتعاون لتحويل رؤيتك إلى واقع بدقة.',
      approachTitle: 'نهجنا',
      approachQuote: 'نؤمن بتوظيف الأشخاص بناءً على من هم، وليس فقط ما قاموا به.',
      approachDescription: 'تدريب شخص على طرقنا أسهل من تعليم شخص للالتزام بقيمنا. فريقنا ودود ومتفان ويشعر بالفخر الحقيقي في إنتاج عمل يعكس معاييرنا العالية.',
      whyChooseTitle: 'لماذا تختارنا',
      whyChooseDescription: 'يختار العملاء سمارت سكروز لأننا نجمع بين الحرفية الخبيرة والدقة والتقنيات الحديثة ونهج يركز على العميل. من التثبيت إلى الصيانة، نجعل البناء بسيطاً وموثوقاً ومركزاً حول احتياجاتك.',
      modernFacilities: 'مرافق وتقنيات حديثة',
      modernFacilitiesDesc: 'أحدث الأدوات والتقنيات للعمل الدقيق.',
      transparentAffordable: 'شفاف وبأسعار معقولة',
      transparentAffordableDesc: 'عمل عالي الجودة بدون تكاليف مخفية.',
      expertTeam: 'فريق خبير من المتخصصين',
      expertTeamDesc: 'مهنيون مهرة ملتزمون بالتميز.',
      clientSupport: 'دعم العملاء على مدار الساعة',
      clientSupportDesc: 'لأن احتياجات البناء لا تنتظر ساعات العمل.',
    },
    services: {
      title: 'خدماتنا',
      description: 'نصنع حلول بناء وصيانة عالمية المستوى ترفع من قيمة ممتلكاتك وتحقق نتائج دائمة. من الاستراتيجية إلى التنفيذ، نحول رؤيتك إلى واقع بخبرة ودقة.',
      all: 'الكل',
      construction: 'البناء',
      maintenance: 'الصيانة',
      decorative: 'الديكور',
    },
    contact: {
      title: 'جاهز للتحول؟',
      description: 'دعنا نناقش كيف يمكن لسمارت سكروز مساعدتك في تحقيق أهداف البناء والصيانة. تواصل معنا ولبناء شيء رائع معاً.',
      getInTouch: 'تواصل معنا',
      firstName: 'الاسم الأول *',
      lastName: 'اسم العائلة *',
      email: 'البريد الإلكتروني *',
      phone: 'الهاتف',
      company: 'الشركة',
      projectType: 'نوع المشروع *',
      message: 'الرسالة *',
      sendMessage: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      messageSent: 'تم إرسال الرسالة بنجاح!',
      messageSentDesc: 'سنتواصل معك خلال 2-4 ساعات.',
      selectProjectType: 'اختر نوع المشروع',
      contactInformation: 'معلومات الاتصال',
      connectWithUs: 'تواصل معنا',
      connectDescription: 'تابعنا على وسائل التواصل الاجتماعي للحصول على آخر التحديثات والرؤى.',
      quickResponse: 'استجابة سريعة',
      quickResponseDesc: 'عادة ما نرد خلال 2-4 ساعات خلال ساعات العمل.',
      onlineNow: 'متصل الآن',
      projectTypes: {
        construction: 'البناء',
        maintenance: 'الصيانة',
        decorative: 'الديكور',
        consulting: 'الاستشارات',
        other: 'أخرى',
      },
      contactInfo: {
        email: 'البريد الإلكتروني',
        emailDesc: 'أرسل لنا رسالة في أي وقت',
        phone: 'الهاتف',
        phoneDesc: 'اتصل بنا مباشرة',
        location: 'الموقع',
        support: 'الدعم',
        supportDesc: 'نحن هنا دائماً من أجلك',
      },
    },
    footer: {
      stayUpdated: 'ابق على اطلاع بآخر التحديثات',
      subscribe: 'احصل على آخر التحديثات حول خدماتنا ومشاريعنا ونصائح الصيانة مباشرة إلى بريدك الإلكتروني.',
      subscribePlaceholder: 'أدخل بريدك الإلكتروني',
      subscribeButton: 'اشترك',
      subscribing: 'جاري الاشتراك...',
      subscribed: 'تم الاشتراك بنجاح! مرحباً بك في مجتمع سمارت سكروز.',
      allServices: 'جميع الخدمات',
      aboutUs: 'من نحن',
      copyright: `© ${new Date().getFullYear()} سمارت سكروز للخدمات التقنية ذ.م.م. جميع الحقوق محفوظة.`,
      tagline: 'بناء التميز، مشروع واحد في كل مرة.',
      license: 'مرخص من قبل دائرة الاقتصاد والسياحة، دبي | الرخصة صالحة حتى 17/11/2026',
      imageDisclaimer: '*الصور المستخدمة على هذا الموقع تم إنشاؤها بواسطة الذكاء الاصطناعي وهي لأغراض تمثيلية فقط.',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      cookies: 'ملفات تعريف الارتباط',
      company: 'الشركة',
      services: 'الخدمات',
      brandDescription: 'خدمات بناء وصيانة مهنية يمكنك الوثوق بها. من البناء إلى الصيانة، نقدم حلولاً عالية الجودة بخبرة ودقة.',
    },
  },
};

