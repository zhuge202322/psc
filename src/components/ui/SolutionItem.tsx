'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SolutionItemProps {
  item: {
    id: string;
    postId?: number;
    title: string;
    desc: string;
    image: string; // Used for icon or background if needed, but we might simulate the card
  };
  index: number;
}

const THEMES = [
  { // Blue/Purple Theme (like 07 in image)
    name: 'blue',
    bg: 'bg-indigo-50',
    text: 'text-indigo-950',
    subText: 'text-indigo-900/80',
    tagBg: 'bg-indigo-100',
    tagText: 'text-indigo-700',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    linkColor: 'text-indigo-700',
    accentColor: '#4f46e5', // Indigo 600
  },
  { // Green/Teal Theme (like 08 in image)
    name: 'green',
    bg: 'bg-emerald-50',
    text: 'text-emerald-950',
    subText: 'text-emerald-900/80',
    tagBg: 'bg-emerald-100',
    tagText: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    linkColor: 'text-emerald-700',
    accentColor: '#059669', // Emerald 600
  }
];

export default function SolutionItem({ item, index }: SolutionItemProps) {
  const isEven = index % 2 === 0;
  const theme = THEMES[index % THEMES.length];

  return (
    <div className="py-16 lg:py-24">
      <div className={`container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Visual Card Side */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={`${theme.bg} rounded-[2rem] p-12 relative overflow-hidden aspect-[4/3] flex items-center justify-center`}>
            {/* Dotted Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                 style={{
                   backgroundImage: `radial-gradient(${theme.accentColor} 2px, transparent 2px)`,
                   backgroundSize: '30px 30px'
                 }}
            />
            
            {/* Inner Floating Card or Featured Image */}
            {item.image ? (
                 <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover z-20 transform transition-transform hover:scale-105 duration-700"
                 />
            ) : (
                <div className="bg-white rounded-3xl shadow-xl p-10 w-64 h-48 flex flex-col items-center justify-center gap-4 relative z-10 transform transition-transform hover:scale-105 duration-500">
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-full ${theme.iconBg} ${theme.iconColor} flex items-center justify-center mb-2`}>
                    {/* Fallback Icon if no specific image */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                
                {/* Title inside card */}
                <h4 className={`text-lg font-bold ${theme.text} text-center`}>
                    {item.title}
                </h4>
                
                {/* Tag inside card */}
                <span className={`${theme.tagBg} ${theme.tagText} text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase`}>
                    SOLUTION
                </span>
                </div>
            )}
          </div>
        </motion.div>

        {/* Text Content Side */}
        <motion.div 
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
           {/* Background Number */}
           <span className="absolute -top-20 left-0 text-[120px] font-bold text-gray-100/50 select-none pointer-events-none -z-10 font-mono">
               {item.id}
           </span>

           <h3 className={`text-3xl md:text-4xl font-bold ${theme.text} mb-6 mt-4`}>
               {item.title}
           </h3>

           {/* Main Tag */}
           <div className="mb-8">
               <span className={`${theme.tagBg} ${theme.tagText} px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase`}>
                   Professional Service
               </span>
           </div>

           <p className="text-gray-500 leading-relaxed text-lg mb-8">
               {item.desc}
           </p>

           {/* Feature List */}
           <div className="space-y-4 mb-10">
               <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-full border ${theme.tagText} flex items-center justify-center`}>
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-gray-600 font-medium">Verified Supplier Network</span>
               </div>
               <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-full border ${theme.tagText} flex items-center justify-center`}>
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-gray-600 font-medium">Quality Control Plan Included</span>
               </div>
           </div>

           {/* Link */}
           <Link 
             href={`/solutions/${item.postId || item.id}`} 
             className={`group inline-flex items-center ${theme.linkColor} font-bold text-lg hover:opacity-80 transition-opacity`}
           >
             Explore {item.title}
             <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
           </Link>

        </motion.div>
      </div>
    </div>
  );
}
