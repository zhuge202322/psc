'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { WPPost } from '@/types/wordpress';
import { useEffect, useState } from 'react';

interface NewsCarouselProps {
  posts: WPPost[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
  // 如果文章太少，复制几份以确保滚动流畅
  const [displayPosts, setDisplayPosts] = useState<WPPost[]>([]);

  useEffect(() => {
    if (posts.length === 0) return;
    // 至少保证有6个元素来滚动，如果原数据少于6个，就多复制几倍
    let repeated = [...posts];
    while (repeated.length < 6) {
      repeated = [...repeated, ...posts];
    }
    // 为了无缝滚动，我们需要两组完整的数据
    setDisplayPosts([...repeated, ...repeated]);
  }, [posts]);

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden py-10">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: "-50%" }}
        transition={{
          duration: 30, // 滚动速度，越小越快
          ease: "linear",
          repeat: Infinity,
        }}
        // 鼠标悬停时暂停滚动
        whileHover={{ animationPlayState: "paused" }} 
      >
        {displayPosts.map((post, index) => (
          <div 
            key={`${post.id}-${index}`} 
            className="w-[400px] flex-shrink-0 group cursor-pointer"
          >
            <Link href={`/news/${post.id}`}>
                {/* 图片区域 */}
                <div className="relative h-[280px] w-full overflow-hidden mb-6">
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                        <img 
                            src={post._embedded['wp:featuredmedia'][0].source_url} 
                            alt={post.title.rendered}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            {/* 随机占位图或纯色 */}
                            <div className={`w-full h-full bg-gradient-to-br ${index % 2 === 0 ? 'from-teal-100 to-blue-100' : 'from-purple-100 to-pink-100'} opacity-50`} />
                        </div>
                    )}
                    {/* 遮罩层，悬停时出现 */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 内容区域 */}
                <div className="pr-4">
                    {/* 日期 */}
                    <div className="text-[#C5A365] text-sm font-medium mb-3 uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>

                    {/* 标题 */}
                    <h3 
                        className="text-2xl font-serif font-medium text-gray-900 mb-4 leading-tight group-hover:text-[#C5A365] transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* 摘要 */}
                    <div 
                        className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    {/* Read More */}
                    <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-[#C5A365] transition-colors border-b border-gray-200 pb-1 group-hover:border-[#C5A365]">
                        Read More
                    </div>
                </div>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
