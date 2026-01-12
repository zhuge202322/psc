'use client';

import { motion } from 'framer-motion';

const TEAM_IMAGES = [
  { src: '/img/1.png', alt: 'Team Activity 1' },
  { src: '/img/3.png', alt: 'Team Activity 2' },
  { src: '/img/4.png', alt: 'Team Activity 3' },
  { src: '/img/1.png', alt: 'Team Activity 4' }, // Repeating for demo
  { src: '/img/3.png', alt: 'Team Activity 5' },
  { src: '/img/4.png', alt: 'Team Activity 6' },
];

export default function TeamGallery() {
  return (
    <section className="py-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                Building connections and delivering value across the globe.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_IMAGES.map((img, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                >
                    <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Optional Overlay/Caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium tracking-wide">Global Team Event</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
