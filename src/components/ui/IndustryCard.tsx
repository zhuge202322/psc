'use client';

import { useState } from 'react';
import Link from 'next/link';

interface IndustryProps {
  id: string;
  postId?: number;
  title: string;
  name: string;
  desc: string;
  image: string;
}

export default function IndustryCard({ id, postId, title, name, desc, image }: IndustryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[420px] rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景图片层 */}
      <div className="absolute inset-0 z-0">
        <img 
            src={image} 
            alt={name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110 blur-sm' : 'scale-100'}`} 
        />
        {/* 遮罩层：默认有一点遮罩确保文字可读，悬停时加深 */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
      </div>

      {/* 默认内容 (悬停时隐藏/淡出) */}
      <div className={`absolute inset-0 z-10 transition-all duration-500 ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="h-full flex items-center justify-between px-10 border-2 border-white/20 rounded-[2rem] m-2"> {/* 加了 margin 模拟内边框 */}
          
          {/* 左侧：ID 和 英文标题 */}
          <div className="flex flex-col gap-2 w-1/4">
            <span className="text-white/80 font-mono text-2xl font-light">{id}</span>
            <span className="text-teal-400 font-bold tracking-widest text-xs uppercase opacity-90">{title}</span>
          </div>

          {/* 中间：中文名称 */}
          <div className="flex-grow flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/20">
                <span className="text-2xl text-white font-bold">{name[0]}</span>
             </div>
             <div>
                <h3 className="text-3xl font-bold text-white tracking-wide shadow-black drop-shadow-lg">
                  {name}
                </h3>
             </div>
          </div>

          {/* 右侧：装饰和加号 */}
          <div className="flex items-center gap-8 w-auto justify-end">
            <div className="h-px w-24 bg-white/30 hidden md:block" />
            <div className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center text-2xl backdrop-blur-sm">
              +
            </div>
          </div>
        </div>
      </div>

      {/* 悬停内容 (悬停时显示) */}
      <div 
        className={`absolute inset-0 z-20 px-12 flex items-center justify-between transition-all duration-500 ease-out ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* 左侧：标题信息 */}
        <div className="w-1/3 border-r border-white/20 pr-8">
            <span className="text-teal-400 font-bold tracking-widest text-xs uppercase mb-2 block">{title}</span>
            <h3 className="text-3xl font-bold text-white mb-2">
              {name}
            </h3>
            <div className="w-10 h-1 bg-teal-500 rounded-full" />
        </div>

        {/* 中间：描述 */}
        <div className="w-1/2 px-8">
            <p className="text-gray-200 leading-relaxed text-sm">
            {desc}
            </p>
        </div>

        {/* 右侧：按钮 */}
        <div className="w-auto flex-shrink-0">
            <Link 
            href={`/solutions/${postId || id}`} 
            className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center hover:scale-110 hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            </Link>
        </div>
      </div>
    </div>
  );
}
