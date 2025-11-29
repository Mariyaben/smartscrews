/**
 * Services data for Smartscrews
 * Source of truth for all service information
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  animationPath: string;
  imagePath: string;
  serviceCategory: string;
  processSteps: string[];
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
    image?: string;
  }>;
  galleryImages: string[];
}

export const services: Service[] = [
  {
    id: 'carpentry-wood-flooring',
    title: 'Carpentry and Wood Flooring Works',
    shortDescription: 'Expert carpentry and premium wood flooring installation and restoration services.',
    longDescription: 'Our skilled carpenters deliver precision craftsmanship in custom woodwork, cabinetry, and flooring. We work with a variety of wood species and finishes to create beautiful, durable solutions that enhance your space.',
    animationPath: '/assets/animations/carpentry.json',
    imagePath: '/carpentry.png',
    serviceCategory: 'Construction',
    processSteps: [
      'Initial consultation and material selection',
      'Site measurement and planning',
      'Material preparation and cutting',
      'Installation with precision fitting',
      'Finishing and protective coating application',
      'Final inspection and quality assurance'
    ],
    testimonials: [
      {
        name: 'John Smith',
        role: 'Homeowner',
        quote: 'The wood flooring installation exceeded our expectations. Professional service from start to finish.',
      }
    ],
    galleryImages: ['/assets/images/carpentry-1.jpg', '/assets/images/carpentry-2.jpg'],
  },
  {
    id: 'building-cleaning',
    title: 'Building Cleaning Services',
    shortDescription: 'Comprehensive cleaning solutions for residential and commercial properties.',
    longDescription: 'Professional cleaning services tailored to your needs. From regular maintenance to deep cleaning, we ensure your property maintains a pristine appearance.',
    animationPath: '/assets/animations/cleaning.json',
    imagePath: '/cleaning.png',
    serviceCategory: 'Maintenance',
    processSteps: [
      'Assessment of cleaning requirements',
      'Custom cleaning plan development',
      'Eco-friendly cleaning solution application',
      'Thorough cleaning execution',
      'Quality inspection',
      'Follow-up maintenance scheduling'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'floor-wall-tiling',
    title: 'Floor and Wall Tiling Works',
    shortDescription: 'Professional tile installation for floors and walls with expert grouting and finishing.',
    longDescription: 'Transform your spaces with our expert tiling services. We handle everything from design consultation to final grouting, ensuring perfect alignment and lasting results.',
    animationPath: '/assets/animations/tiling.json',
    imagePath: '/floor_tiling.png',
    serviceCategory: 'Construction',
    processSteps: [
      'Surface preparation and leveling',
      'Tile layout and pattern design',
      'Precision cutting and fitting',
      'Adhesive application and tile placement',
      'Grouting and sealing',
      'Final polish and protection'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'false-ceiling-partitions',
    title: 'False Ceiling and Light Partitions Installation',
    shortDescription: 'Modern false ceiling and partition solutions for enhanced space design.',
    longDescription: 'Create elegant spaces with our false ceiling and partition installation services. We offer various materials and designs to match your aesthetic and functional requirements.',
    animationPath: '/assets/animations/ceiling.json',
    imagePath: '/alse.png',
    serviceCategory: 'Construction',
    processSteps: [
      'Design consultation and planning',
      'Material selection and ordering',
      'Framework installation',
      'Panel or board installation',
      'Lighting integration',
      'Finishing touches and inspection'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'wallpaper-fixing',
    title: 'Wallpaper Fixing Works',
    shortDescription: 'Professional wallpaper installation with pattern matching and seamless application.',
    longDescription: 'Transform your walls with our expert wallpaper installation services. We ensure perfect alignment, smooth application, and lasting results.',
    animationPath: '/assets/animations/wallpaper.json',
    imagePath: '/wallpaper.png',
    serviceCategory: 'Decorative',
    processSteps: [
      'Wall preparation and priming',
      'Pattern matching and cutting',
      'Adhesive application',
      'Precise wallpaper placement',
      'Smoothing and bubble removal',
      'Trimming and finishing'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'plaster-works',
    title: 'Plaster Works',
    shortDescription: 'Expert plastering services for smooth, durable wall and ceiling finishes.',
    longDescription: 'Achieve flawless surfaces with our professional plastering services. We handle everything from repair work to complete new installations.',
    animationPath: '/assets/animations/plaster.json',
    imagePath: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=900&fit=crop&q=80',
    serviceCategory: 'Construction',
    processSteps: [
      'Surface assessment and preparation',
      'Base coat application',
      'Smoothing and leveling',
      'Final coat application',
      'Sanding and finishing',
      'Quality inspection'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'electromechanical',
    title: 'Electromechanical Equipment Installation and Maintenance',
    shortDescription: 'Professional installation and maintenance of electromechanical systems.',
    longDescription: 'Ensure your electromechanical systems operate efficiently with our expert installation and maintenance services. We work with various equipment types and brands.',
    animationPath: '/assets/animations/electromechanical.json',
    imagePath: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&h=900&fit=crop&q=80',
    serviceCategory: 'Maintenance',
    processSteps: [
      'System assessment and planning',
      'Equipment selection and procurement',
      'Professional installation',
      'System testing and calibration',
      'Maintenance schedule setup',
      'Ongoing support and service'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'plumbing-sanitary',
    title: 'Plumbing and Sanitary Installation',
    shortDescription: 'Complete plumbing and sanitary solutions for residential and commercial properties.',
    longDescription: 'Reliable plumbing services from installation to repair. We handle all aspects of plumbing and sanitary systems with professional expertise.',
    animationPath: '/assets/animations/plumbing.json',
    imagePath: 'https://images.unsplash.com/photo-1621921298484-4a38e81547de?w=1600&h=900&fit=crop&q=80',
    serviceCategory: 'Maintenance',
    processSteps: [
      'System design and planning',
      'Material and fixture selection',
      'Pipe installation and connection',
      'Fixture installation',
      'System testing and leak detection',
      'Final inspection and certification'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'air-conditioning',
    title: 'Air Conditioning, Ventilation and Air Filtration Systems Installation and Maintenance',
    shortDescription: 'Complete HVAC solutions including installation, maintenance, and air quality systems.',
    longDescription: 'Maintain optimal indoor air quality and comfort with our comprehensive HVAC services. From installation to regular maintenance, we keep your systems running efficiently.',
    animationPath: '/assets/animations/air-conditioning.json',
    imagePath: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=900&fit=crop&q=80',
    serviceCategory: 'Maintenance',
    processSteps: [
      'System assessment and load calculation',
      'Equipment selection and sizing',
      'Ductwork design and installation',
      'Unit installation and connection',
      'System testing and balancing',
      'Maintenance program setup'
    ],
    testimonials: [],
    galleryImages: [],
  },
  {
    id: 'painting',
    title: 'Painting Contracting',
    shortDescription: 'Professional interior and exterior painting services with premium finishes.',
    longDescription: 'Transform your space with our expert painting services. We use high-quality materials and techniques to deliver lasting, beautiful results.',
    animationPath: '/assets/animations/painting.json',
    imagePath: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&h=900&fit=crop&q=80',
    serviceCategory: 'Decorative',
    processSteps: [
      'Surface preparation and repair',
      'Primer application',
      'Color consultation and selection',
      'Professional paint application',
      'Detail work and touch-ups',
      'Final inspection and cleanup'
    ],
    testimonials: [],
    galleryImages: [],
  },
];

export const serviceCategories = [
  'All',
  'Construction',
  'Maintenance',
  'Decorative',
] as const;

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'All') return services;
  return services.filter(service => service.serviceCategory === category);
}

