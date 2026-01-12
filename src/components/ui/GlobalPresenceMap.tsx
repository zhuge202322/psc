'use client';

import { motion } from 'framer-motion';

// Equirectangular projection coordinates
const LOCATIONS = [
  {
    name: 'Shenzhen Headquarters',
    nameCn: '深圳总部',
    address: 'Room 1311, Dayunwan East Center, No. 359 Huangge Road, Longgang District, Shenzhen',
    // Lat 22.5 N, Lon 114.0 E -> Top 37.5%, Left 81.6%
    coords: { top: '37.5%', left: '81.6%' },
    color: 'bg-red-500',
    delay: 0
  },
  {
    name: 'Hong Kong Office',
    nameCn: '香港办事处',
    address: 'FLAT C, 9/F, WINNING HOUSE, NO.72-76, WING LOK STREET SHEUNG WAN, HONG KONG',
    // Lat 22.3 N, Lon 114.1 E -> Top 37.6%, Left 81.7%
    // Offset slightly to avoid complete overlap
    coords: { top: '39%', left: '81.7%' },
    color: 'bg-blue-500',
    delay: 0.2
  },
  {
    name: 'US Branch',
    nameCn: '美国分公司',
    address: '5487 Blossom Acres Dr, San Jose, CA, 95124',
    // Lat 37.3 N, Lon 121.9 W -> Top 29.2%, Left 16.1%
    coords: { top: '29.2%', left: '16.1%' },
    color: 'bg-teal-500',
    delay: 0.4
  }
];

export default function GlobalPresenceMap() {
  return (
    <section className="py-24 bg-[#0B1120] text-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Address List */}
            <div className="w-full lg:w-1/3 space-y-8 z-10">
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
            <div className="w-full lg:w-2/3 relative h-[300px] md:h-[450px] flex items-center justify-center bg-[#111827] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                {/* World Map Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src="/earth_specular_2048.jpg" 
                        alt="World Map" 
                        className="w-full h-full object-cover opacity-80 invert sepia-[.2] transition-all duration-700"
                    />
                </div>

                {/* Pins */}
                <div className="absolute inset-0 w-full h-full">
                    {LOCATIONS.map((loc, idx) => (
                        <div 
                            key={idx}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{ top: loc.coords.top, left: loc.coords.left }}
                        >
                            <span className="relative flex h-4 w-4 cursor-pointer">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loc.color}`}></span>
                              <span className={`relative inline-flex rounded-full h-4 w-4 ${loc.color} border-2 border-white box-content shadow-[0_0_15px_currentColor]`}></span>
                            </span>
                            
                            {/* Hover Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-white text-gray-900 text-xs rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10 font-bold">
                                {loc.nameCn}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
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
