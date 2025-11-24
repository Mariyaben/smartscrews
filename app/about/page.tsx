import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Smartscrews, our team, certifications, and commitment to quality building and maintenance services.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fffffe]">
        {/* Hero Section */}
        <section className="bg-[#213f51] text-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About Smartscrews
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Building trust through quality craftsmanship and professional service since our founding.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-[rgba(33,63,81,0.7)] leading-relaxed">
              <p>
                Smartscrews was founded with a simple mission: to provide exceptional building 
                and maintenance services that homeowners and businesses can trust. We combine 
                traditional craftsmanship with modern techniques to deliver results that stand 
                the test of time.
              </p>
              <p>
                Our team of certified professionals brings years of experience across all aspects 
                of building and maintenance. From intricate carpentry work to complex HVAC 
                installations, we approach every project with attention to detail and a commitment 
                to excellence.
              </p>
              <p>
                We believe in building lasting relationships with our clients through transparent 
                communication, fair pricing, and reliable service. Every project, big or small, 
                receives the same level of care and professionalism.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Quality First</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  We never compromise on quality, using only the best materials and techniques.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Team Excellence</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  Our certified professionals work together to deliver exceptional results.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0e7888] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#213f51] mb-2">Fair Pricing</h3>
                <p className="text-[rgba(33,63,81,0.7)]">
                  Transparent, competitive pricing with no hidden fees or surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-6 text-center">
              Certifications & Licenses
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2f9d7a] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#213f51]">Licensed General Contractor</h3>
                    <p className="text-[rgba(33,63,81,0.7)]">Fully licensed and insured for all construction work</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2f9d7a] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#213f51]">HVAC Certified Technicians</h3>
                    <p className="text-[rgba(33,63,81,0.7)]">NATE certified for air conditioning and ventilation systems</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2f9d7a] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#213f51]">Plumbing License</h3>
                    <p className="text-[rgba(33,63,81,0.7)]">Master plumber certification for all plumbing work</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#2f9d7a] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#213f51]">OSHA Safety Certified</h3>
                    <p className="text-[rgba(33,63,81,0.7)]">All team members trained in workplace safety standards</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#213f51] text-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get in touch to discuss your project and receive a free quote.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#0e7888] text-white rounded-lg font-medium hover:bg-[#2f5a65] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#213f51]"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

