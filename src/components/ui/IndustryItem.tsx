'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import IndustryCard from './IndustryCard';

interface IndustryItemProps {
  item: {
    id: string;
    postId?: number;
    title: string;
    name: string;
    desc: string;
    image: string;
  };
  index: number;
  isLast: boolean;
}

export default function IndustryItem({ item, index, isLast }: IndustryItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="overflow-hidden"> {/* 防止初始位置超出屏幕导致横向滚动条 */}
      <div 
        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
      >
        {/* 卡片区域 - 占据 55% */}
        {/* 奇数行(index偶数)从左边进，偶数行(index奇数)从右边进 */}
        <motion.div 
          className="w-full lg:w-[55%]"
          initial={{ opacity: 0, x: isEven ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        >
          <div className="transition-all duration-500 hover:scale-[1.02]">
            <IndustryCard {...item} />
          </div>
        </motion.div>

        {/* 文字内容区域 - 占据 45% */}
        {/* 与卡片相反方向进入 */}
        <motion.div 
          className="w-full lg:w-[45%] flex flex-col justify-center"
          initial={{ opacity: 0, x: isEven ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.2 }}
        >
            {/* 序号 */}
            <div className="text-gray-100 text-6xl md:text-8xl font-bold mb-4 font-mono select-none">
                {item.id}
            </div>
            
            {/* 标题 */}
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {item.title}
            </h3>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase border border-teal-100">
                    Supply Chain
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase border border-blue-100">
                    Global Logistics
                </span>
            </div>

            {/* 描述 */}
            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                {item.desc}
            </p>

            {/* 特性列表 (模拟数据) */}
            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 font-medium">Verified Supplier Network</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 font-medium">Quality Control Plan Included</span>
                </div>
            </div>

            {/* 链接 */}
            <Link 
                href={`/solutions/${item.postId || item.id}`} 
                className="group inline-flex items-center text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
                Explore {item.title}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </motion.div>
      </div>

      {/* 分割线 - 除去最后一个 */}
      {!isLast && (
          <motion.div 
            className="w-full h-px bg-[#16BC9C]/20 my-24 relative"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
              {/* 中间加一个小圆点装饰 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#16BC9C] rounded-full opacity-50"></div>
          </motion.div>
      )}
    </div>
  );
}
