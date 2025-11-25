import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ScrollingBanner from '@/components/ScrollingBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Smartscrews - Professional Building & Maintenance Services',
  description: 'Trusted craftsmanship for your home and business. From carpentry to HVAC, we deliver quality solutions with attention to detail and professional service.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ overflow: 'visible' }}>
        <Hero />
        <ScrollingBanner />
        <AboutSection />
        <ServiceGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
