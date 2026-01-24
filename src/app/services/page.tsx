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
  const perPage = 8; // Grid layout updated to 2 columns

  let displayItems = STATIC_SERVICES;
  let totalPages = 1;

  try {
    const { posts, totalPages: pages } = await getPaginatedPostsByCategory('fuwu', currentPage, perPage);
    
    if (pages > 0) {
      totalPages = pages;
    }

    if (posts && posts.length > 0) {
      displayItems = posts.map((post: any) => {
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
    <div className="min-h-screen bg-white">
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
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">ONE STOP SERVICE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayItems.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-start h-full"
                >
                    <h3 className="text-xl font-bold text-teal-600 mb-3">
                        {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                        {item.desc}
                    </p>
                    
                    <Link 
                        href={`/services/${item.id}`}
                        className="inline-flex items-center text-teal-600 font-bold hover:text-teal-700 mt-auto"
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
    </div>
  );
}
