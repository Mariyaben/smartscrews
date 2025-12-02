import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ScrollingBanner from '@/components/ScrollingBanner';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';

export const metadata = {
  title: 'Smart Screws - Residential and Commercial Maintenance Services | Expert Carpentry, Plumbing, HVAC & More',
  description: 'Smart Screws - Residential and commercial maintenance services in UAE and Dubai. The best maintenance, electrical, carpentry, plumbing, HVAC, tiling, painting, and construction services. Top-rated professional building and maintenance company. Expert carpentry, plumbing, air conditioning, kitchen renovation, and architectural design. Quality craftsmanship for your home and business.',
  keywords: [
    // Primary service description
    'residential and commercial maintenance services', 'residential maintenance services', 'commercial maintenance services',
    'residential maintenance services uae', 'residential maintenance services dubai',
    'commercial maintenance services uae', 'commercial maintenance services dubai',
    'residential and commercial maintenance uae', 'residential and commercial maintenance dubai',
    
    // Brand keywords - All permutations
    'smart screws', 'smart screw', 'screws smart', 'screw smart',
    'smartscrews', 'smartscrew', 'screwssmart', 'screwsmar',
    'intelligent screws', 'intelligent screw', 'screws intelligent', 'screw intelligent',
    'smart fasteners', 'intelligent fasteners', 'fasteners smart', 'fasteners intelligent',
    'smart fixings', 'intelligent fixings', 'fixings smart', 'fixings intelligent',
    'smart screws company', 'smart screw company', 'screws smart company', 'screw smart company',
    'intelligent screws company', 'intelligent screw company', 'screws intelligent company',
    'smart screws services', 'smart screw services', 'screws smart services', 'screw smart services',
    'intelligent screws services', 'intelligent screw services', 'screws intelligent services',
    'smart screws dubai', 'smart screw dubai', 'screws smart dubai', 'screw smart dubai',
    'intelligent screws dubai', 'intelligent screw dubai', 'screws intelligent dubai',
    'smart screws uae', 'smart screw uae', 'screws smart uae', 'screw smart uae',
    'intelligent screws uae', 'intelligent screw uae', 'screws intelligent uae',
    'smart screws technical services', 'smart screw technical services', 'intelligent screws technical services',
    'smart screws llc', 'smart screw llc', 'intelligent screws llc', 'intelligent screw llc',
    // Misspellings
    'smart screwws', 'smart screww', 'smar screws', 'smar screw', 'smart scre',
    'inteligent screws', 'inteligent screw', 'intellegent screws', 'intellegent screw',
    'best maintenance uae', 'best maintenance dubai',
    'best electrical uae', 'best electrical dubai', 'best carpentry uae', 'best carpentry dubai',
    'best plumbing uae', 'best plumbing dubai', 'best hvac uae', 'best hvac dubai',
    'best air conditioning uae', 'best air conditioning dubai', 'best ac uae', 'best ac dubai',
    'best tiling uae', 'best tiling dubai', 'best painting uae', 'best painting dubai',
    'best kitchen renovation uae', 'best kitchen renovation dubai', 'best construction uae', 'best construction dubai',
    'best building services uae', 'best building services dubai', 'best cleaning uae', 'best cleaning dubai',
    'best contractor uae', 'best contractor dubai', 'best handyman uae', 'best handyman dubai',
    'best renovation uae', 'best renovation dubai', 'best remodeling uae', 'best remodeling dubai',
    'top maintenance uae', 'top electrical uae', 'top carpentry uae', 'top plumbing uae',
    'leading maintenance uae', 'leading electrical uae', 'expert maintenance uae', 'expert electrical uae',
    'professional maintenance uae', 'professional electrical uae', 'quality maintenance uae', 'quality electrical uae',
    'licensed contractor uae', 'certified contractor uae', 'building services', 'maintenance services',
    'construction services', 'home improvement', 'carpentry services', 'plumbing services',
    'HVAC services', 'tiling services', 'painting services', 'kitchen renovation',
    'architectural design', 'professional contractors', '24/7 maintenance uae', 'emergency maintenance uae'
  ],
  openGraph: {
    title: 'Smart Screws - Residential and Commercial Maintenance Services',
    description: 'Expert maintenance services. Carpentry, plumbing, HVAC, tiling, painting, and more. Quality craftsmanship for your home and business.',
    url: 'https://www.smartscrews.ae',
    siteName: 'Smart Screws - SmartScrews',
    images: [
      {
        url: 'https://www.smartscrews.ae/new_hero.png',
        width: 1200,
        height: 630,
        alt: 'Smart Screws - Residential and Commercial Maintenance Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <main style={{ overflow: 'visible' }} itemScope itemType="https://schema.org/WebPage">
        <Hero />
        <ScrollingBanner />
        <AboutSection />
        <ScrollingBanner />
        <ServiceGrid />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
