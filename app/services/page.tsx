import ServiceGrid from '@/components/ServiceGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Services',
  description: 'Comprehensive building and maintenance solutions including carpentry, plumbing, HVAC, tiling, painting, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fffffe]">
        <ServiceGrid />
      </main>
      <Footer />
    </>
  );
}

