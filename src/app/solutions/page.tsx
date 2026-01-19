import { getPaginatedPostsByCategory } from '@/lib/api';
import SolutionItem from '@/components/ui/SolutionItem';
import Link from 'next/link';

// Force dynamic rendering to ensure searchParams are handled correctly
export const dynamic = 'force-dynamic';

// Fallback data
const STATIC_INDUSTRIES = [
  { id: '01', title: 'Consumer Electronics', desc: 'End-to-end logistics with high security standards for high-value, short-cycle electronic products, ensuring timely new product launches.', image: '' },
  { id: '02', title: 'Automotive Parts', desc: 'Optimized parts supply chain network supporting JIT (Just-In-Time) production, reducing inventory costs and improving turnover efficiency.', image: '' },
  { id: '03', title: 'New Energy', desc: 'Professional transport solutions for lithium batteries and PV modules, compliant with DG regulations, providing global warehousing and distribution.', image: '' },
  { id: '04', title: 'Apparel & Textiles', desc: 'Flexible fashion manufacturing. From fabric sourcing and pattern grading to fast-turnaround production.', image: '' },
  { id: '05', title: 'Medical Devices', desc: 'Strict compliance with medical regulations, temperature-controlled logistics for sensitive equipment.', image: '' },
];

export const metadata = {
  title: 'Industry Solutions | PSC-tech',
  description: 'Customized supply chain solutions for various industries.',
};

export default async function SolutionsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const perPage = 5;
  
  let displayItems = STATIC_INDUSTRIES;
  let totalPages = 1;

  try {
    const { posts, totalPages: pages } = await getPaginatedPostsByCategory('hangye', currentPage, perPage);
    totalPages = pages;
    
    if (posts && posts.length > 0) {
      displayItems = posts.map((post: any, index: number) => {
        // Calculate continuous ID based on page number
        const idNum = (currentPage - 1) * perPage + index + 1;
        const id = idNum.toString().padStart(2, '0');
        
        const desc = post.excerpt.rendered.replace(/<[^>]+>/g, '') || '';
        // Featured image could be used if we update SolutionItem to use real images
        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        
        return {
          id,
          postId: post.id,
          title: post.title.rendered,
          desc,
          image
        };
      });
    }
  } catch (error) {
    console.error('Error fetching solutions:', error);
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Page Header */}
      <div className="relative py-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/img/4.png" 
                alt="Industry Solutions Background" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Industry Solutions</h1>
           <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
             Tailored supply chain strategies for the unique demands of your specific market.
           </p>
        </div>
      </div>

      {/* Solutions List */}
      <div className="py-12 bg-white">
        {displayItems.map((item, index) => (
          <SolutionItem key={item.id} item={item} index={index} />
        ))}
        
        {/* Pagination */}
        {totalPages > 1 && (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center gap-4">
                {/* Previous Page */}
                {currentPage > 1 ? (
                    <Link 
                        href={`/solutions?page=${currentPage - 1}`}
                        className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-gray-300 cursor-not-allowed">
                        Previous
                    </span>
                )}

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/solutions?page=${page}`}
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

                {/* Next Page */}
                {currentPage < totalPages ? (
                    <Link 
                        href={`/solutions?page=${currentPage + 1}`}
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
      <section className="py-20 bg-gray-50">
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
                    <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
