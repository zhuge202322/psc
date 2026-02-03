'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Pages that should always have a solid navbar background
  const isSolidPage = pathname.startsWith('/solutions') || pathname.startsWith('/services') || pathname.startsWith('/news') || pathname.startsWith('/about') || pathname.startsWith('/contact');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'News', href: '/news' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isSolidPage || isMobileMenuOpen ? 'bg-[#020617] py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            P
          </div>
          <span className="text-white font-bold text-xl tracking-wide">
            PSC-<span className="text-teal-400">TECH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white hover:text-teal-400 text-sm font-medium transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="/contact"
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
              isScrolled 
                ? 'bg-teal-500 text-white hover:bg-teal-600' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#020617]'
            }`}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
            className="md:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '100vh' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="fixed inset-0 bg-[#020617] pt-24 px-6 md:hidden overflow-hidden"
                >
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-2xl font-bold text-white hover:text-teal-400 block py-2 border-b border-gray-800"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                            className="mt-4"
                        >
                            <Link 
                                href="/contact"
                                className="block w-full text-center py-4 bg-teal-500 text-white rounded-xl font-bold text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
