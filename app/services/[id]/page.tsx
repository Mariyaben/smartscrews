import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceById } from '@/lib/data';
import ServiceAnimation from '@/components/ServiceAnimation';
import ContactForm from '@/components/ContactForm';

export async function generateStaticParams() {
  const { services } = await import('@/lib/data');
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceById(id);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Smartscrews`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fffffe]">
      {/* Hero Section */}
      <section className="bg-[#213f51] text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#213f51] rounded"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {service.longDescription}
              </p>
            </div>
            <div className="relative h-64 lg:h-96 bg-white/10 rounded-lg overflow-hidden">
              <ServiceAnimation serviceId={service.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-12 text-center">
          Our Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.processSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0e7888] text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <p className="text-[#213f51] leading-relaxed">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {service.testimonials.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-12 text-center">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {service.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#fffffe] p-8 rounded-lg shadow-md"
                >
                  <p className="text-[#213f51] mb-6 italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-[#213f51]">{testimonial.name}</p>
                    <p className="text-[rgba(33,63,81,0.7)]">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#213f51] mb-4 text-center">
              Request a Quote
            </h2>
            <p className="text-lg text-[rgba(33,63,81,0.7)] mb-12 text-center">
              Get a free estimate for {service.title}
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

