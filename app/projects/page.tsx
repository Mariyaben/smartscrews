import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Projects',
  description: 'View our portfolio of completed projects showcasing our quality craftsmanship and attention to detail.',
};

const projects = [
  {
    id: 1,
    title: 'Modern Office Renovation',
    category: 'Construction',
    description: 'Complete office space renovation including flooring, ceiling, and painting.',
    image: '/assets/images/project-1.jpg',
  },
  {
    id: 2,
    title: 'Residential Kitchen Remodel',
    category: 'Construction',
    description: 'Custom carpentry and tiling work for a luxury kitchen renovation.',
    image: '/assets/images/project-2.jpg',
  },
  {
    id: 3,
    title: 'Commercial HVAC Installation',
    category: 'Maintenance',
    description: 'Full HVAC system installation for a commercial building.',
    image: '/assets/images/project-3.jpg',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fffffe]">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#213f51] mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-[rgba(33,63,81,0.7)] max-w-2xl mx-auto">
              Explore our portfolio of completed projects showcasing quality craftsmanship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-[#2f5a65] flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm opacity-75">Project Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-[#0e7888] font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold text-[#213f51] mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[rgba(33,63,81,0.7)]">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#0e7888] text-white rounded-lg font-medium hover:bg-[#2f5a65] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e7888] focus:ring-offset-2"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

