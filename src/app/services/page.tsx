import { getPaginatedPostsByCategory } from '@/lib/api';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const STATIC_SERVICES = [
  { id: 1, title: 'Supply Chain Management', desc: 'Comprehensive supply chain optimization solutions, one-stop management from procurement to distribution.' },
  { id: 2, title: 'Global Logistics', desc: 'Global logistics network covering sea, air, and land transportation.' },
  { id: 3, title: 'Warehousing & Distribution', desc: 'Smart warehousing systems ensuring cargo security and improving distribution efficiency.' },
  { id: 4, title: 'Customs Consulting', desc: 'Professional customs team helping you easily navigate complex import/export regulations.' },
  { id: 5, title: 'Procurement Execution', desc: 'Assisting enterprises with global procurement, strictly controlling product quality and costs.' },
  { id: 6, title: 'IT Systems Integration', desc: 'Advanced logistics information systems achieving full supply chain visibility.' },
];

const ICONS = ['🔍', '🛍️', '🏗️', '🎫', '🛡️', '🤝', '🚚', '📦', '✈️', '🚢'];

export const metadata = {
  title: 'Our Services | PSC-tech',
  description: 'Comprehensive supply chain and logistics services.',
};

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const perPage = 9; // Grid layout usually fits more items

  let displayItems = STATIC_SERVICES;
  let totalPages = 1;

  try {
    const { posts, totalPages: pages } = await getPaginatedPostsByCategory('fuwu', currentPage, perPage);
    
    if (pages === 0) {
        // Fallback to 'service' or 'services' if 'fuwu' returns nothing?
        // For simplicity, we stick to 'fuwu' first.
        // If empty, we might show static or try another call. 
        // Let's assume 'fuwu' works as per homepage logic.
    } else {
        totalPages = pages;
    }

    if (posts && posts.length > 0) {
      displayItems = posts.map((post: any, index: number) => {
        const desc = post.excerpt.rendered.replace(/<[^>]+>/g, '') || '';
        return {
          id: post.id,
          title: post.title.rendered,
          desc,
        };
      });
    }
  } catch (error) {
    console.error('Error fetching services:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="relative py-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/img/4.png" 
                alt="Services Background" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Services</h1>
           <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
             Providing end-to-end supply chain solutions to empower your business.
           </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item, index) => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-teal-100"
                >
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-teal-50 group-hover:scale-110 transition-all duration-300">
                        {ICONS[index % ICONS.length]}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                        {item.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed mb-8 min-h-[48px] line-clamp-3">
                        {item.desc}
                    </p>
                    
                    <Link 
                        href={`/services/${item.id}`} // Assuming detailed pages exist or point to contact
                        className="inline-flex items-center text-teal-600 font-bold hover:text-teal-700"
                    >
                        Learn More
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
                {currentPage > 1 ? (
                    <Link 
                        href={`/services?page=${currentPage - 1}`}
                        className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-gray-300 cursor-not-allowed">
                        Previous
                    </span>
                )}

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/services?page=${page}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                                currentPage === page
                                    ? 'bg-black text-white font-bold'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                </div>

                {currentPage < totalPages ? (
                    <Link 
                        href={`/services?page=${currentPage + 1}`}
                        className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-gray-300 cursor-not-allowed">
                        Next
                    </span>
                )}
            </div>
        )}
      </div>

      {/* Service Standards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Service Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: '1. Turnkey NPI for Complex Products', desc: 'We optimize early designs for mass production, managing everything from prototypes to DFMA manufacturing with 1000+ partners, plus testing, packaging, and logistics.' },
                    { title: '2. Precision Custom Parts & Subassemblies', desc: 'We drive engineering, sourcing, reverse engineering, and BOM management for custom parts, ensuring the highest quality at the lowest cost.' },
                    { title: '3. High-precision Prototyping and Development', desc: 'We develop and produce high-precision prototype samples according to project requirements for the verification of functionality, structure and safety.' },
                    { title: '4. Industrial Design and Engineering Development', desc: 'We use professional software and expertise to digitally visualize our clients’ visionary product ideas on computers for them.' },
                    { title: '5. Factory Identification & Audits & Final Inspection', desc: 'We qualify suppliers, audit and oversee your supply chain, implement custom quality plans, and provide in-house inspection and metrology services. All inspections, QA, and QC processes are carried out by degreed engineers.' },
                    { title: '6. LOGISTICS', desc: 'As a 3PL, we manage global shipping, warehousing, kitting, JIT delivery, and support all Incoterms with preferential rates across all transportation modes.' },
                    { title: '7. COMPLIANCE', desc: 'We create testing and compliance plans, certifying your products meet CE, FDA, NSF, UL, and other international standards.' },
                    { title: '8. Flexible Production', desc: 'Targeting small-batch needs such as pilot production, market testing, and urgent replenishment orders. We deliver efficient and cost-competitive small-batch production services.' }
                ].map((service, idx) => (
                    <div key={idx} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-teal-600 mb-3">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
