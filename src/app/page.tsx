import { getPosts, getCategories, wpApi } from '@/lib/api';
import { WPPost } from '@/types/wordpress';
import Link from 'next/link';
import DigitalEarth from '@/components/ui/DigitalEarth';
import IndustryItem from '@/components/ui/IndustryItem';
import NewsCarousel from '@/components/ui/NewsCarousel';

// Force dynamic rendering to ensure fresh data from WordPress
export const dynamic = 'force-dynamic';

// Fallback data in case API fails or is empty
const STATIC_INDUSTRIES = [
  { id: '01', title: 'Consumer Electronics', name: 'Consumer Electronics', desc: 'End-to-end logistics with high security standards for high-value, short-cycle electronic products.', image: '/img/1.png' },
  { id: '02', title: 'Automotive Parts', name: 'Automotive Parts', desc: 'Optimized supply chain network supporting JIT production, reducing inventory costs and improving turnover.', image: '/img/1.png' },
  { id: '03', title: 'New Energy', name: 'New Energy', desc: 'Professional transport for lithium batteries and PV modules, compliant with DG regulations.', image: '/img/1.png' },
];

export default async function Home() {
  let posts: WPPost[] = [];
  let industryPosts: WPPost[] = [];
  let servicePosts: WPPost[] = [];
  let displayIndustries = STATIC_INDUSTRIES; 
  let displayServices: any[] = [];
  let debugInfo = ''; 
  
  try {
    // 1. Get all posts and categories
    const [allPosts, categories] = await Promise.all([
      getPosts(),
      getCategories()
    ]);
    
    posts = allPosts;
    const time = new Date().getTime();

    // 2. Find and fetch 'hangye' category
    const hangyeSlug = 'hangye';
    const hangyeCat = categories.find((c: any) => c.slug.toLowerCase() === hangyeSlug.toLowerCase());

    if (hangyeCat) {
        try {
            const res = await wpApi.get(`/wp/v2/posts?categories=${hangyeCat.id}&_embed&per_page=20&t=${time}`);
            industryPosts = res.data;
        } catch (err) {
            debugInfo += ` Error fetching hangye: ${err};`;
        }
    } else {
        debugInfo += ` Category "hangye" NOT found.;`;
    }

    // 3. Find and fetch 'fuwu' category
    const fuwuSlug = 'fuwu';
    const fuwuCat = categories.find((c: any) => c.slug.toLowerCase() === fuwuSlug.toLowerCase());

    if (fuwuCat) {
        try {
            const res = await wpApi.get(`/wp/v2/posts?categories=${fuwuCat.id}&_embed&per_page=7&t=${time}`); // Fetch 7 to leave room for "More+"
            servicePosts = res.data;
        } catch (err) {
            debugInfo += ` Error fetching fuwu: ${err};`;
        }
    } else {
         // Try finding 'service' or 'services' if 'fuwu' fails
         const serviceCat = categories.find((c: any) => c.slug.toLowerCase().includes('service') || c.slug.toLowerCase() === '服务');
         if(serviceCat) {
             try {
                const res = await wpApi.get(`/wp/v2/posts?categories=${serviceCat.id}&_embed&per_page=7&t=${time}`);
                servicePosts = res.data;
             } catch(err) {
                 debugInfo += ` Error fetching services (fallback): ${err};`;
             }
         } else {
             debugInfo += ` Category "fuwu" (or service) NOT found.;`;
         }
    }

    // 4. Find and fetch 'xinwen' category for Industry Insights
    const xinwenSlug = 'xinwen';
    const xinwenCat = categories.find((c: any) => c.slug.toLowerCase() === xinwenSlug.toLowerCase());

    if (xinwenCat) {
        try {
            const res = await wpApi.get(`/wp/v2/posts?categories=${xinwenCat.id}&_embed&per_page=10&t=${time}`);
            posts = res.data;
        } catch (err) {
            debugInfo += ` Error fetching xinwen: ${err};`;
        }
    } else {
         debugInfo += ` Category "xinwen" NOT found.;`;
    }

    // Process Industry Posts
    if (industryPosts.length > 0) {
      displayIndustries = industryPosts.map((post, index) => {
        const id = (index + 1).toString().padStart(2, '0');
        const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/1.png';
        const desc = post.excerpt.rendered.replace(/<[^>]+>/g, '') || '';
        return {
          id,
          postId: post.id,
          title: post.title.rendered,
          name: post.title.rendered, 
          desc,
          image
        };
      });
    }

    // Process Service Posts
    const icons = ['🔍', '🛍️', '🏗️', '🎫', '🛡️', '🤝', '🚚', '📦', '✈️', '🚢'];
    if (servicePosts.length > 0) {
        displayServices = servicePosts.map((post, index) => {
             const desc = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 50) + '...';
             return {
                 title: post.title.rendered,
                 desc: desc,
                 icon: icons[index % icons.length], // Cycle through icons
                 isMore: false
             };
        });
    } else {
        // Fallback static services if no posts found
        displayServices = [
            { title: '1688 Price Analysis', desc: 'Fast and reliable factory selection and best price negotiation.', icon: '🔍' },
            { title: 'Turnkey Sourcing', desc: 'Comprehensive sourcing support: negotiation, control, and ordering.', icon: '🛍️' },
            { title: 'Turnkey Projects', desc: 'Complete solutions for construction, interiors, and material supply.', icon: '🏗️' },
            { title: 'Exhibition Representation', desc: 'Visit Chinese exhibitions, collect data, and prepare reports.', icon: '🎫' },
            { title: 'Quality Control', desc: 'Production inspection, container loading check, and compliance control.', icon: '🛡️' },
            { title: 'China Business Visit', desc: 'Organize business visits, exhibitions, and supplier meetings.', icon: '🤝' },
            { title: 'Central Asia & Russia Logistics', desc: 'Selecting reliable carriers and freight support.', icon: '🚚' },
        ];
    }
    
    // Always append "More+" button
    displayServices.push({ title: 'More+', desc: 'Learn more information', icon: '', isMore: true });

  } catch (error) {
    console.error('Failed to fetch data:', error);
    debugInfo = `Critical Error: ${error}`;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Debug Info Block (Temporary) */}
      {debugInfo && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 fixed bottom-0 right-0 z-50 m-4 max-w-md shadow-lg">
              <p className="font-bold">Debug Info:</p>
              <p>{debugInfo}</p>
          </div>
      )}

      {/* 3D Hero Section */}
      <section className="relative h-[500px] md:h-[800px] bg-[#020617]">
        <DigitalEarth />
      </section>

      {/* Industry Solutions - 交互式卡片网格 */}
      <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* 背景装饰线 */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Industry Solutions</h2>
            <div className="w-16 md:w-20 h-1 bg-teal-500 mx-auto" />
            <p className="mt-4 md:mt-6 text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
              Tailored supply chain strategies for the unique demands of your specific market.
            </p>
          </div>

          <div className="flex flex-col">
            {displayIndustries.map((item, index) => (
              <IndustryItem 
                key={item.id} 
                item={item} 
                index={index} 
                isLast={index === displayIndustries.length - 1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: 'url(/img/1.png)' }}>
        <div className="absolute inset-0 bg-[#3b2d66]/90 mix-blend-multiply" /> {/* 紫色调遮罩，模仿参考图氛围 */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
                <div className="w-16 md:w-20 h-1 bg-yellow-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayServices.map((service, idx) => (
                    <div 
                        key={idx} 
                        className={`group relative p-8 h-80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                            service.isMore 
                                ? 'bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 hover:border-yellow-400 hover:bg-white/20 cursor-pointer text-white items-center justify-center' 
                                : 'bg-[#f8f9fa] hover:shadow-2xl hover:shadow-yellow-400/20'
                        }`}
                    >
                        {!service.isMore ? (
                            <>
                                {/* 图标区域 (模拟3D图标) */}
                                <div className="w-16 h-16 mb-6 text-4xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-inner">
                                    {service.icon}
                                </div>
                                
                                <div>
                                    {/* 标题带左侧竖线 */}
                                    <div className="flex border-l-4 border-yellow-400 pl-4 mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
                                    
                                    {/* 描述 */}
                                    <div className="flex gap-2">
                                        <span className="text-gray-400">——</span>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="text-2xl font-bold">More +</span>
                                <div className="w-10 h-1 bg-yellow-400 mt-4 transition-all group-hover:w-20" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* 左侧装饰背景 */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-purple-50 to-transparent -skew-x-12 transform -translate-x-20 hidden lg:block" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* 左侧引导文案 (桌面端显示) */}
            <div className="hidden lg:flex lg:w-1/3 flex-col justify-center pt-20">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute top-0 -right-4 w-20 h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                    <h3 className="text-4xl font-bold text-gray-900 mb-6 relative z-10">Let's Start a Conversation</h3>
                    <p className="text-gray-500 text-lg leading-relaxed relative z-10">
                        Whether you have a specific project in mind or just want to explore possibilities, we're here to help you navigate the global market.
                    </p>
                </div>
            </div>

            {/* 表单主体 */}
            <div className="w-full lg:w-2/3 max-w-4xl">
              <div className="mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-6 tracking-tight">Contact Us</h2>
                <div className="w-16 h-1 bg-purple-600 mb-6" />
                <p className="text-lg md:text-xl text-gray-600">We are always in touch — just leave a message.</p>
              </div>

              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {/* Name */}
                  <div className="group relative">
                    <input type="text" placeholder="Name *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                  {/* Company */}
                  <div className="group relative">
                    <input type="text" placeholder="Company *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                  {/* Location */}
                  <div className="group relative">
                    <input type="text" placeholder="Location *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                  {/* Email */}
                  <div className="group relative">
                    <input type="email" placeholder="Email *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                  {/* Phone */}
                  <div className="group relative">
                    <input type="tel" placeholder="Phone *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                  {/* Service */}
                  <div className="group relative">
                    <input type="text" placeholder="Service Interest *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 group-hover:border-gray-400" />
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="group relative mt-4">
                  <textarea rows={4} placeholder="Product Sourcing Requirements *" className="w-full border-b border-gray-300 py-4 text-lg focus:border-purple-600 outline-none transition-colors bg-transparent placeholder-gray-400 resize-none group-hover:border-gray-400" />
                </div>

                <div className="pt-8">
                  <button type="button" className="px-12 py-5 bg-black text-white text-lg font-bold rounded-full hover:bg-purple-600 transition-all duration-300 shadow-xl hover:shadow-purple-600/30 flex items-center gap-3 transform hover:-translate-y-1">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News (From WordPress) */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Industry Insights</h2>
              <p className="text-gray-500">Stay updated with the latest logistics trends and supply chain insights.</p>
            </div>
            <Link href="/news" className="text-blue-600 font-semibold hover:text-blue-700 transition">
              View All News →
            </Link>
          </div>
          
          {/* News Carousel */}
          <NewsCarousel posts={posts} />

        </div>
      </section>
    </div>
  );
}

