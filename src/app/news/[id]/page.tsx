import { getPost } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title.rendered} | PSC-tech`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative py-32 bg-gray-900 border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/img/4.png" 
                alt="Background" 
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pt-10">
           {/* Breadcrumb */}
           <div className="flex justify-center items-center gap-2 text-gray-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/news" className="hover:text-white transition-colors">News</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[200px]">Article</span>
           </div>

           <h1 
             className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto"
             dangerouslySetInnerHTML={{ __html: post.title.rendered }}
           />
           
           <div className="text-gray-300 text-lg flex items-center justify-center gap-4">
              <span>{date}</span>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Featured Image */}
        {image && (
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative aspect-video">
            <img 
              src={image} 
              alt={post.title.rendered}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-img:rounded-2xl">
           <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>

        {/* Navigation / Back */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
            <Link 
              href="/news"
              className="inline-flex items-center text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
        </div>
      </article>
    </div>
  );
}
