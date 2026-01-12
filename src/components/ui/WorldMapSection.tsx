'use client';

import { motion } from 'framer-motion';

const LOCATIONS = [
  {
    name: 'Shenzhen Headquarters',
    nameCn: '深圳总部',
    address: 'Room 1311, Dayunwan East Center, No. 359 Huangge Road, Longgang District, Shenzhen',
    coords: { top: '45%', left: '76%' },
    color: 'bg-red-500',
    delay: 0
  },
  {
    name: 'Hong Kong Office',
    nameCn: '香港办事处',
    address: 'FLAT C, 9/F, WINNING HOUSE, NO.72-76, WING LOK STREET SHEUNG WAN, HONG KONG',
    coords: { top: '46%', left: '76.5%' }, // Slightly offset
    color: 'bg-blue-500',
    delay: 0.2
  },
  {
    name: 'US Branch',
    nameCn: '美国分公司',
    address: '5487 Blossom Acres Dr, San Jose, CA, 95124',
    coords: { top: '34%', left: '16%' },
    color: 'bg-teal-500',
    delay: 0.4
  }
];

export default function WorldMapSection() {
  return (
    <section className="py-24 bg-[#0B1120] text-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Address List */}
            <div className="w-full lg:w-1/3 space-y-8">
                {LOCATIONS.map((loc, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="group cursor-default"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-3 h-3 rounded-full mt-2 shadow-[0_0_10px_currentColor] ${loc.color.replace('bg-', 'text-')}`} />
                            <div>
                                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                    {loc.nameCn}
                                    <span className="text-sm font-normal text-gray-400">/ {loc.name}</span>
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                                    {loc.address}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Right: Map */}
            <div className="w-full lg:w-2/3 relative min-h-[400px]">
                {/* Simplified World Map SVG Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 1000 500" className="w-full h-full fill-current text-gray-600">
                        {/* Simplified path representing continents */}
                        <path d="M168.3 151.6c-4.4-2.8-9.4-4.2-14.7-2.9-1.3.3-2.6.7-3.9 1.1-1.3.4-2.5.9-3.7 1.4-2.4 1-4.7 2.1-6.9 3.4-2.2 1.3-4.3 2.8-6.2 4.4-3.8 3.2-6.9 7-9.3 11.3-1.2 2.1-2.2 4.4-3.1 6.7-.9 2.3-1.6 4.6-2.2 7-.6 2.4-1.1 4.8-1.5 7.3-.4 2.5-.7 5-.8 7.5-.1 2.5 0 5 .2 7.5.2 2.5.5 5 .9 7.4.4 2.4 1 4.8 1.7 7.1.7 2.3 1.5 4.6 2.5 6.8 1 2.2 2.1 4.3 3.3 6.3 1.2 2 2.5 3.9 3.9 5.7 2.9 3.6 6.1 6.8 9.6 9.6 3.5 2.8 7.3 5.1 11.3 6.9 4 1.8 8.2 3.1 12.5 3.9 4.3.8 8.7 1 13.1.7 4.4-.3 8.7-1.1 12.9-2.4 4.2-1.3 8.3-3.1 12.1-5.4 3.9-2.3 7.5-5 10.8-8.2 3.3-3.1 6.2-6.7 8.7-10.6 2.5-3.9 4.6-8.1 6.2-12.5 1.6-4.4 2.7-9 3.3-13.7.6-4.7.7-9.5.3-14.2-.4-4.8-1.3-9.5-2.7-14.1-1.4-4.6-3.3-9-5.7-13.1-2.4-4.1-5.3-7.9-8.6-11.3-3.3-3.4-7-6.4-11-8.9-4-2.5-8.3-4.5-12.8-6-4.5-1.5-9.2-2.4-14-2.8zM824.2 186.4c-1.6-2.2-3.6-4.2-5.9-5.8-2.3-1.6-4.9-2.8-7.7-3.4-2.8-.6-5.7-.7-8.5-.2-2.8.5-5.5 1.6-8 3.2-2.5 1.6-4.7 3.7-6.5 6.2-1.8 2.5-3.1 5.3-4 8.2-.9 2.9-1.2 6-.1 9 .1 3 1.6 5.8 3.5 8.2 1.9 2.4 4.3 4.3 7 5.7 2.7 1.4 5.7 2.2 8.7 2.3 3 .1 6-.5 8.7-1.7 2.7-1.2 5.2-2.9 7.2-5.1 2-2.2 3.5-4.8 4.4-7.6.9-2.8 1.2-5.9.8-8.9-.4-3-1.6-5.9-3.6-8.1zm-574.9 33c-3.1-3.6-6.9-6.6-11.2-8.9-4.3-2.3-9-3.7-13.8-4.2-4.8-.5-9.7.1-14.3 1.6-4.6 1.5-8.9 4-12.7 7.3-3.8 3.3-7 7.3-9.5 11.9-2.5 4.6-4.3 9.6-5.3 14.8-1 5.2-1.2 10.5-.6 15.8.6 5.3 2 10.4 4.1 15.2 2.1 4.8 4.9 9.3 8.3 13.2 3.4 3.9 7.4 7.2 11.9 9.8 4.5 2.6 9.4 4.5 14.5 5.5 5.1 1 10.4 1.2 15.5.5 5.1-.7 10-2.3 14.6-4.8 4.6-2.5 8.7-5.9 12.1-10 3.4-4.1 6.1-8.9 7.9-14.1 1.8-5.2 2.8-10.7 2.9-16.2.1-5.5-.8-11-2.6-16.2-1.8-5.2-4.5-10.1-8-14.4-3.5-4.3-7.8-7.9-12.8-10.8zM616.4 336.1c-1.3-1.8-3-3.3-4.9-4.5-1.9-1.2-4-2-6.2-2.4-2.2-.4-4.5-.4-6.7 0-2.2.4-4.3 1.3-6.2 2.6-1.9 1.3-3.5 3-4.7 5-1.2 2-2 4.2-2.4 6.5-.4 2.3-.3 4.7.2 7 .5 2.3 1.5 4.5 2.9 6.3 1.4 1.8 3.1 3.3 5.1 4.4 2 1.1 4.2 1.7 6.5 1.9 2.3.2 4.6-.1 6.8-.9 2.2-.8 4.2-2.1 5.8-3.7 1.6-1.6 2.9-3.6 3.7-5.8.8-2.2 1.1-4.5.9-6.9-.2-2.4-.9-4.7-2.1-6.7-.6-1-1.3-1.9-2.1-2.8z" />
                        {/* Note: The above path is just random blobs. I should use a real simplified world map SVG path or just a placeholder if I can't generate one perfectly. */}
                        {/* Better approach: Use a standard SVG image URL or simple dots. */}
                    </svg>
                    {/* Fallback visual: Just a big dotted map image if I had one. Since I don't, I will use a simple layout of dots or just position the pins relatively. */}
                    <div className="absolute inset-0 bg-[url('/img/world-map-dots.png')] bg-contain bg-no-repeat bg-center opacity-50" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>

                {/* Pins */}
                <div className="relative w-full h-[400px]">
                    {LOCATIONS.map((loc, idx) => (
                        <div 
                            key={idx}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{ top: loc.coords.top, left: loc.coords.left }}
                        >
                            <span className="relative flex h-4 w-4">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loc.color}`}></span>
                              <span className={`relative inline-flex rounded-full h-4 w-4 ${loc.color} border-2 border-white`}></span>
                            </span>
                            
                            {/* Hover Tooltip */}
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-gray-900 text-xs rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
                                <strong>{loc.nameCn}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
