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
    </div>
  );
}
