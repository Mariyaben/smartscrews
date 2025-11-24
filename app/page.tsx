import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import AboutSection from '@/components/AboutSection';
import ScrollRotator from '@/components/ScrollRotator';
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
        
        {/* Scroll Rotator - Rotating element on scroll */}
        <ScrollRotator />
        
        {/* Trust Signals Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-4">
                Why Choose Smartscrews
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Certified Professionals</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  All our technicians are certified and experienced in their respective fields.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Timely Service</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  We respect your time and deliver projects on schedule, every time.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Quality Guarantee</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  We stand behind our work with comprehensive warranties and quality assurance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
