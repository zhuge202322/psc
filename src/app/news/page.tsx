import { getPaginatedPostsByCategory } from '@/lib/api';
import Link from 'next/link';
import { getSecureImageUrl } from '@/lib/utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const STATIC_NEWS = [
  { 
    id: 1, 
    title: 'Global Supply Chain Trends 2026', 
    date: '2026-01-10',
    desc: 'Analysis of the latest trends shaping the global logistics landscape, from AI adoption to sustainability.',
    image: '' 
  },
  { 
    id: 2, 
    title: 'PSC-tech Expands to North America', 
    date: '2025-12-15',
    desc: 'We are proud to announce the opening of our new distribution center in California.',
    image: '' 
  },
  { 
    id: 3, 
    title: 'Navigating Customs Regulations', 
    date: '2025-11-20',
    desc: 'A comprehensive guide to understanding the complex customs requirements for electronics import/export.',
    image: '' 
  },
];

export const metadata = {
  title: 'News & Insights | PSC-tech',
  description: 'Latest news, industry insights, and company updates.',
};

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const perPage = 10;

  let displayItems = STATIC_NEWS.map(item => {
    const d = new Date(item.date);
    return {
        ...item,
        day: d.getDate().toString().padStart(2, '0'),
        yearMonth: `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}`
    };
  });
  let totalPages = 1;

  try {
    const { posts, totalPages: pages } = await getPaginatedPostsByCategory('xinwen', currentPage, perPage);
    
    if (pages > 0) {
        totalPages = pages;
    }

    if (posts && posts.length > 0) {
      displayItems = posts.map((post: any) => {
        const desc = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 150) + '...' || '';
        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        
        const d = new Date(post.date);
        const day = d.getDate().toString().padStart(2, '0');
        const yearMonth = `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;

        return {
          id: post.id,
          title: post.title.rendered,
          day,
          yearMonth,
          desc,
          image
        };
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="relative py-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/img/4.png" 
                alt="News Background" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">News & Insights</h1>
           <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
             Stay updated with the latest industry trends and company announcements.
           </p>
        </div>
      </div>

      {/* News List */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="flex flex-col gap-6">
            {displayItems.map((item) => (
                <article 
                    key={item.id} 
                    className="bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border-b border-gray-100 last:border-0"
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image (Left) */}
                        <div className="w-full md:w-80 h-52 flex-shrink-0 overflow-hidden bg-gray-100 relative">
                             {item.image ? (
                                <img 
                                    src={getSecureImageUrl(item.image)} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                             )}
                        </div>

                        {/* Content (Middle) */}
                        <div className="flex-grow flex flex-col justify-between py-2">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                                    <Link href={`/news/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                {/* Divider Line */}
                                <div className="w-full h-px bg-gray-100 mb-6" />
                            </div>

                            <Link 
                                href={`/news/${item.id}`} 
                                className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-fit"
                            >
                                阅读更多
                            </Link>
                        </div>

                        {/* Date (Right) */}
                        <div className="flex-shrink-0 flex flex-col items-end justify-center md:pl-8 md:border-l border-gray-100 min-w-[100px]">
                            <span className="text-6xl font-bold text-gray-900 leading-none mb-2">
                                {item.day}
                            </span>
                            <span className="text-gray-400 text-sm tracking-wider">
                                {item.yearMonth}
                            </span>
                        </div>
                    </div>
                </article>
            ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-4">
                {currentPage > 1 ? (
                    <Link 
                        href={`/news?page=${currentPage - 1}`}
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
                            href={`/news?page=${page}`}
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
                        href={`/news?page=${currentPage + 1}`}
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
