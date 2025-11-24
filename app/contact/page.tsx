import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Smartscrews for a free quote on your building or maintenance project.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fffffe]">
        {/* Hero Section */}
        <section className="bg-[#213f51] text-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Request a free quote or schedule a site visit. We're here to help with all your 
              building and maintenance needs.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#213f51] mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#213f51] mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#0e7888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className="text-[rgba(33,63,81,0.7)] hover:text-[#0e7888] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2 rounded"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div>
                  <h3 className="font-bold text-[#213f51] mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#0e7888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </h3>
                  <a
                    href="mailto:info@smartscrews.com"
                    className="text-[rgba(33,63,81,0.7)] hover:text-[#0e7888] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2 rounded"
                  >
                    info@smartscrews.com
                  </a>
                </div>
                <div>
                  <h3 className="font-bold text-[#213f51] mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#0e7888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <p className="text-[rgba(33,63,81,0.7)]">
                    123 Main Street<br />
                    City, State 12345<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#213f51] mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#0e7888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Business Hours
                  </h3>
                  <p className="text-[rgba(33,63,81,0.7)]">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#213f51] mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

