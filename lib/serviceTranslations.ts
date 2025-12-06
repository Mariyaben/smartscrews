import { Language } from './translations';
import type { Service } from './data';

export interface ServiceTranslations {
  [key: string]: {
    title: string;
    shortDescription: string;
    longDescription: string;
    processSteps: string[];
  };
}

export const serviceTranslations: Record<Language, ServiceTranslations> = {
  en: {
    'carpentry-wood-flooring': {
      title: 'Carpentry and Wood Flooring Works',
      shortDescription: 'Expert carpentry and premium wood flooring installation and restoration services.',
      longDescription: 'Our skilled carpenters deliver precision craftsmanship in custom woodwork, cabinetry, and flooring. We work with a variety of wood species and finishes to create beautiful, durable solutions that enhance your space.',
      processSteps: [
        'Initial consultation and material selection',
        'Site measurement and planning',
        'Material preparation and cutting',
        'Installation with precision fitting',
        'Finishing and protective coating application',
        'Final inspection and quality assurance'
      ]
    },
    'building-cleaning': {
      title: 'Building Cleaning Services',
      shortDescription: 'Comprehensive cleaning solutions for residential and commercial properties.',
      longDescription: 'Professional cleaning services tailored to your needs. From regular maintenance to deep cleaning, we ensure your property maintains a pristine appearance.',
      processSteps: [
        'Assessment of cleaning requirements',
        'Custom cleaning plan development',
        'Eco-friendly cleaning solution application',
        'Thorough cleaning execution',
        'Quality inspection'
      ]
    },
    'floor-wall-tiling': {
      title: 'Floor and Wall Tiling Works',
      shortDescription: 'Professional tile installation for floors and walls with expert grouting and finishing.',
      longDescription: 'Transform your spaces with our expert tiling services. We handle everything from design consultation to final grouting, ensuring perfect alignment and lasting results.',
      processSteps: [
        'Surface preparation and leveling',
        'Tile layout and pattern design',
        'Precision cutting and fitting',
        'Adhesive application and tile placement',
        'Grouting and sealing',
        'Final polish and protection'
      ]
    },
    'false-ceiling-partitions': {
      title: 'False Ceiling and Light Partitions Installation',
      shortDescription: 'Modern false ceiling and partition solutions for enhanced space design.',
      longDescription: 'Create elegant spaces with our false ceiling and partition installation services. We offer various materials and designs to match your aesthetic and functional requirements.',
      processSteps: [
        'Design consultation and planning',
        'Material selection and ordering',
        'Framework installation',
        'Panel or board installation',
        'Lighting integration',
        'Finishing touches and inspection'
      ]
    },
    'wallpaper-fixing': {
      title: 'Wallpaper Fixing Works',
      shortDescription: 'Professional wallpaper installation with pattern matching and seamless application.',
      longDescription: 'Transform your walls with our expert wallpaper installation services. We ensure perfect alignment, smooth application, and lasting results.',
      processSteps: [
        'Wall preparation and priming',
        'Pattern matching and cutting',
        'Adhesive application',
        'Precise wallpaper placement',
        'Smoothing and bubble removal',
        'Trimming and finishing'
      ]
    },
    'plaster-works': {
      title: 'Plaster Works',
      shortDescription: 'Expert plastering services for smooth, durable wall and ceiling finishes.',
      longDescription: 'Achieve flawless surfaces with our professional plastering services. We handle everything from repair work to complete new installations.',
      processSteps: [
        'Surface assessment and preparation',
        'Base coat application',
        'Smoothing and leveling',
        'Final coat application',
        'Sanding and finishing',
        'Quality inspection'
      ]
    },
    'electromechanical': {
      title: 'Electromechanical Equipment Installation and Maintenance',
      shortDescription: 'Professional installation and maintenance of electromechanical systems.',
      longDescription: 'Ensure your electromechanical systems operate efficiently with our expert installation and maintenance services. We work with various equipment types and brands.',
      processSteps: [
        'System assessment and planning',
        'Equipment selection and procurement',
        'Professional installation',
        'System testing and calibration',
        'Maintenance schedule setup',
        'Ongoing support and service'
      ]
    },
    'plumbing-sanitary': {
      title: 'Plumbing and Sanitary Installation',
      shortDescription: 'Complete plumbing and sanitary solutions for residential and commercial properties.',
      longDescription: 'Reliable plumbing services from installation to repair. We handle all aspects of plumbing and sanitary systems with professional expertise.',
      processSteps: [
        'System design and planning',
        'Material and fixture selection',
        'Pipe installation and connection',
        'Fixture installation',
        'System testing and leak detection',
        'Final inspection and certification'
      ]
    },
    'air-conditioning': {
      title: 'Air Conditioning, Ventilation and Air Filtration Systems Installation and Maintenance',
      shortDescription: 'Complete HVAC solutions including installation, maintenance, and air quality systems.',
      longDescription: 'Maintain optimal indoor air quality and comfort with our comprehensive HVAC services. From installation to regular maintenance, we keep your systems running efficiently.',
      processSteps: [
        'System assessment and load calculation',
        'Equipment selection and sizing',
        'Ductwork design and installation',
        'Unit installation and connection',
        'System testing and balancing',
        'Maintenance program setup'
      ]
    },
    'painting': {
      title: 'Painting and Finishing Works',
      shortDescription: 'Professional interior and exterior painting services with premium finishes.',
      longDescription: 'Transform your space with our expert painting services. We use high-quality materials and techniques to deliver lasting, beautiful results.',
      processSteps: [
        'Surface preparation and repair',
        'Primer application',
        'Color consultation and selection',
        'Professional paint application',
        'Detail work and touch-ups',
        'Final inspection and cleanup'
      ]
    },
    'kitchen-renovation': {
      title: 'Kitchen Renovation Works',
      shortDescription: 'Complete kitchen renovation and remodeling services for modern, functional spaces.',
      longDescription: 'Transform your kitchen into a beautiful and functional space with our comprehensive renovation services. From design consultation to final installation, we handle everything including cabinetry, countertops, flooring, tiling, plumbing, and electrical work to create your dream kitchen.',
      processSteps: [
        'Design consultation and space planning',
        'Material selection and procurement',
        'Demolition and site preparation',
        'Cabinetry and fixture installation',
        'Countertop and backsplash installation',
        'Plumbing and electrical connections',
        'Flooring and finishing touches',
        'Final inspection and handover'
      ]
    },
    'drawing-design': {
      title: 'Architectural Drawing and Design Services',
      shortDescription: 'Professional 2D and 3D design services for interior and architectural projects.',
      longDescription: 'Transform your vision into reality with our comprehensive drawing and design services. We provide both two-dimensional and three-dimensional design solutions including architectural drawings, interior design plans, 3D visualizations, and detailed technical drawings for construction and renovation projects.',
      processSteps: [
        'Initial consultation and requirement analysis',
        'Site measurement and assessment',
        '2D technical drawings and floor plans',
        '3D modeling and visualization',
        'Material and color selection',
        'Design refinement and client approval',
        'Final detailed drawings and specifications',
        'Project documentation and handover'
      ]
    },
    'fit-out-gypsum': {
      title: 'Fit Out Works - Soft Wall Gypsum Construction',
      shortDescription: 'Professional fit out services with soft wall gypsum construction for modern interior spaces.',
      longDescription: 'Transform your interior spaces with our expert fit out and gypsum construction services. We specialize in soft wall gypsum construction, creating elegant and functional partitions, walls, and decorative elements that enhance your space while maintaining flexibility and durability.',
      processSteps: [
        'Initial consultation and space planning',
        'Design and material selection',
        'Framework installation for gypsum walls',
        'Gypsum board installation and finishing',
        'Soft wall construction and detailing',
        'Final inspection and quality assurance'
      ]
    },
    'move-in-move-out': {
      title: 'Move-In and Move-Out Services',
      shortDescription: 'Inspection • Detailed Reporting • Rectification',
      longDescription: 'Inspection • Detailed Reporting • Rectification \nEnsure a smooth transition with our comprehensive Move-In and Move-Out Services, designed to protect your property, reduce disputes, and maintain high living standards.',
      processSteps: [
        'Thorough Property Inspection',
        'Professional Inspection Report',
        'Rectification & Repairs',
        'Final Re-Inspection'
      ]
    }
  },
  ar: {
    'carpentry-wood-flooring': {
      title: 'أعمال النجارة والأرضيات الخشبية',
      shortDescription: 'خدمات النجارة الخبيرة وتركيب وصيانة الأرضيات الخشبية المميزة.',
      longDescription: 'يوفر نجارونا المهرة حرفية دقيقة في الأعمال الخشبية المخصصة والخزائن والأرضيات. نعمل مع مجموعة متنوعة من أنواع الخشب والطلاءات لإنشاء حلول جميلة ودائمة تعزز مساحتك.',
      processSteps: [
        'الاستشارة الأولية واختيار المواد',
        'قياس الموقع والتخطيط',
        'تحضير المواد والقطع',
        'التركيب مع التثبيت الدقيق',
        'التشطيب وتطبيق الطلاء الواقي',
        'التفتيش النهائي وضمان الجودة'
      ]
    },
    'building-cleaning': {
      title: 'خدمات تنظيف المباني',
      shortDescription: 'حلول تنظيف شاملة للممتلكات السكنية والتجارية.',
      longDescription: 'خدمات تنظيف مهنية مصممة حسب احتياجاتك. من الصيانة المنتظمة إلى التنظيف العميق، نضمن أن تحافظ ممتلكاتك على مظهرها النظيف.',
      processSteps: [
        'تقييم متطلبات التنظيف',
        'تطوير خطة تنظيف مخصصة',
        'تطبيق حلول تنظيف صديقة للبيئة',
        'تنفيذ التنظيف الشامل',
        'تفتيش الجودة'
      ]
    },
    'floor-wall-tiling': {
      title: 'أعمال بلاط الأرضيات والجدران',
      shortDescription: 'تركيب بلاط احترافي للأرضيات والجدران مع حشو وتشطيب خبير.',
      longDescription: 'حول مساحاتك بخدمات البلاط الخبيرة. نتعامل مع كل شيء من استشارة التصميم إلى الحشو النهائي، مما يضمن المحاذاة المثالية والنتائج الدائمة.',
      processSteps: [
        'تحضير السطح وتسويته',
        'تخطيط البلاط وتصميم النمط',
        'القطع الدقيق والتثبيت',
        'تطبيق اللاصق ووضع البلاط',
        'الحشو والختام',
        'التلميع النهائي والحماية'
      ]
    },
    'false-ceiling-partitions': {
      title: 'تركيب الأسقف المعلقة والقواطع الخفيفة',
      shortDescription: 'حلول أسقف معلقة وقواطع حديثة لتحسين تصميم المساحة.',
      longDescription: 'أنشئ مساحات أنيقة مع خدمات تركيب الأسقف المعلقة والقواطع. نقدم مواد وتصاميم متنوعة لتتناسب مع متطلباتك الجمالية والوظيفية.',
      processSteps: [
        'استشارة التصميم والتخطيط',
        'اختيار المواد والطلب',
        'تركيب الإطار',
        'تركيب الألواح أو اللوحات',
        'دمج الإضاءة',
        'اللمسات النهائية والتفتيش'
      ]
    },
    'wallpaper-fixing': {
      title: 'أعمال تركيب ورق الجدران',
      shortDescription: 'تركيب ورق جدران احترافي مع مطابقة الأنماط والتطبيق السلس.',
      longDescription: 'حول جدرانك بخدمات تركيب ورق الجدران الخبيرة. نضمن المحاذاة المثالية والتطبيق السلس والنتائج الدائمة.',
      processSteps: [
        'تحضير الجدار والتحضير',
        'مطابقة النمط والقطع',
        'تطبيق اللاصق',
        'وضع ورق الجدران بدقة',
        'التنعيم وإزالة الفقاعات',
        'التشذيب والتشطيب'
      ]
    },
    'plaster-works': {
      title: 'أعمال الجبس',
      shortDescription: 'خدمات جبس خبيرة لإنهاءات جدران وأسقف ناعمة ودائمة.',
      longDescription: 'احصل على أسطح لا تشوبها شائبة مع خدمات الجبس المهنية. نتعامل مع كل شيء من أعمال الإصلاح إلى التركيبات الجديدة الكاملة.',
      processSteps: [
        'تقييم السطح والتحضير',
        'تطبيق الطبقة الأساسية',
        'التنعيم والتسوية',
        'تطبيق الطبقة النهائية',
        'السنفرة والتشطيب',
        'تفتيش الجودة'
      ]
    },
    'electromechanical': {
      title: 'تركيب وصيانة المعدات الكهروميكانيكية',
      shortDescription: 'تركيب وصيانة احترافية للأنظمة الكهروميكانيكية.',
      longDescription: 'تأكد من أن أنظمتك الكهروميكانيكية تعمل بكفاءة مع خدمات التركيب والصيانة الخبيرة. نعمل مع أنواع وماركات مختلفة من المعدات.',
      processSteps: [
        'تقييم النظام والتخطيط',
        'اختيار المعدات والتوريد',
        'التركيب المهني',
        'اختبار النظام والمعايرة',
        'إعداد جدول الصيانة',
        'الدعم والخدمة المستمرة'
      ]
    },
    'plumbing-sanitary': {
      title: 'تركيب السباكة والصرف الصحي',
      shortDescription: 'حلول سباكة وصرف صحي كاملة للممتلكات السكنية والتجارية.',
      longDescription: 'خدمات سباكة موثوقة من التركيب إلى الإصلاح. نتعامل مع جميع جوانب أنظمة السباكة والصرف الصحي بخبرة مهنية.',
      processSteps: [
        'تصميم النظام والتخطيط',
        'اختيار المواد والتركيبات',
        'تركيب الأنابيب والتوصيل',
        'تركيب التركيبات',
        'اختبار النظام واكتشاف التسريبات',
        'التفتيش النهائي والشهادة'
      ]
    },
    'air-conditioning': {
      title: 'تركيب وصيانة أنظمة التكييف والتهوية وتنقية الهواء',
      shortDescription: 'حلول HVAC كاملة تشمل التركيب والصيانة وأنظمة جودة الهواء.',
      longDescription: 'حافظ على جودة الهواء الداخلي المثلى والراحة مع خدمات HVAC الشاملة. من التركيب إلى الصيانة المنتظمة، نحافظ على تشغيل أنظمتك بكفاءة.',
      processSteps: [
        'تقييم النظام وحساب الحمل',
        'اختيار المعدات والتقييس',
        'تصميم وتركيب مجاري الهواء',
        'تركيب الوحدة والتوصيل',
        'اختبار النظام والتوازن',
        'إعداد برنامج الصيانة'
      ]
    },
    'painting': {
      title: 'أعمال الطلاء والتشطيب',
      shortDescription: 'خدمات طلاء داخلية وخارجية احترافية مع إنهاءات مميزة.',
      longDescription: 'حول مساحتك بخدمات الطلاء الخبيرة. نستخدم مواد وتقنيات عالية الجودة لتقديم نتائج جميلة ودائمة.',
      processSteps: [
        'تحضير السطح والإصلاح',
        'تطبيق الدهان الأساسي',
        'استشارة اللون والاختيار',
        'تطبيق الطلاء المهني',
        'أعمال التفاصيل واللمسات',
        'التفتيش النهائي والتنظيف'
      ]
    },
    'kitchen-renovation': {
      title: 'أعمال تجديد المطابخ',
      shortDescription: 'خدمات تجديد وترميم مطابخ كاملة للمساحات الحديثة والوظيفية.',
      longDescription: 'حول مطبخك إلى مساحة جميلة ووظيفية مع خدمات التجديد الشاملة. من استشارة التصميم إلى التركيب النهائي، نتعامل مع كل شيء بما في ذلك الخزائن والكونترتوب والأرضيات والبلاط والسباكة والأعمال الكهربائية لإنشاء مطبخ أحلامك.',
      processSteps: [
        'استشارة التصميم وتخطيط المساحة',
        'اختيار المواد والتوريد',
        'الهدم وتحضير الموقع',
        'تركيب الخزائن والتركيبات',
        'تركيب الكونترتوب والبلاط الخلفي',
        'توصيلات السباكة والكهرباء',
        'الأرضيات واللمسات النهائية',
        'التفتيش النهائي والتسليم'
      ]
    },
    'drawing-design': {
      title: 'خدمات الرسم والتصميم المعماري',
      shortDescription: 'خدمات تصميم احترافية ثنائية وثلاثية الأبعاد للمشاريع الداخلية والمعمارية.',
      longDescription: 'حول رؤيتك إلى واقع مع خدمات الرسم والتصميم الشاملة. نقدم حلول تصميم ثنائية وثلاثية الأبعاد بما في ذلك الرسومات المعمارية وخطط التصميم الداخلي والتصورات ثلاثية الأبعاد والرسومات التقنية التفصيلية لمشاريع البناء والتجديد.',
      processSteps: [
        'الاستشارة الأولية وتحليل المتطلبات',
        'قياس الموقع والتقييم',
        'الرسومات التقنية ثنائية الأبعاد وخطط الأرضية',
        'النمذجة والتصور ثلاثي الأبعاد',
        'اختيار المواد والألوان',
        'تحسين التصميم وموافقة العميل',
        'الرسومات التفصيلية النهائية والمواصفات',
        'توثيق المشروع والتسليم'
      ]
    },
    'fit-out-gypsum': {
      title: 'أعمال التشطيب - بناء جدران الجبس الناعمة',
      shortDescription: 'خدمات تشطيب احترافية مع بناء جدران الجبس الناعمة للمساحات الداخلية الحديثة.',
      longDescription: 'حول مساحاتك الداخلية مع خدمات التشطيب وبناء الجبس الخبيرة. نتخصص في بناء جدران الجبس الناعمة، مما يخلق قواطع وجدران وعناصر زخرفية أنيقة ووظيفية تعزز مساحتك مع الحفاظ على المرونة والمتانة.',
      processSteps: [
        'الاستشارة الأولية وتخطيط المساحة',
        'التصميم واختيار المواد',
        'تركيب الإطار لجدران الجبس',
        'تركيب ألواح الجبس والتشطيب',
        'بناء الجدران الناعمة والتفاصيل',
        'التفتيش النهائي وضمان الجودة'
      ]
    },
    'move-in-move-out': {
      title: 'خدمات الانتقال الداخلي والخارجي',
      shortDescription: 'خدمات نقل احترافية للانتقالات السكنية والتجارية.',
      longDescription: 'استمتع بانتقالات سلسة مع خدمات الانتقال الداخلي والخارجي الشاملة. نتعامل مع كل شيء من التعبئة والنقل إلى فك التعبئة والإعداد، مما يضمن نقل ممتلكاتك بأمان مع العناية والكفاءة. يوفر فريقنا المحترف حلول نقل شاملة مصممة حسب احتياجاتك.',
      processSteps: [
        'الاستشارة الأولية وتقييم المخزون',
        'تعبئة وحماية الممتلكات',
        'النقل الآمن والخدمات اللوجستية',
        'فك التعبئة والوضع',
        'الإعداد والترتيب',
        'التفتيش النهائي والتسليم'
      ]
    }
  }
};

export function getTranslatedService(service: Service, language: Language): Service {
  const translations = serviceTranslations[language][service.id];
  if (!translations) {
    return service; // Return original if translation not found
  }
  
  return {
    ...service,
    title: translations.title,
    shortDescription: translations.shortDescription,
    longDescription: translations.longDescription,
    processSteps: translations.processSteps
  };
}

export function getTranslatedServices(services: Service[], language: Language): Service[] {
  return services.map(service => getTranslatedService(service, language));
}