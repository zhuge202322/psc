'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                PSC-tech
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Focusing on providing global end-to-end supply chain management services, helping enterprises achieve efficient, transparent, and compliant logistics operations.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" /> {/* Placeholder icon */}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Cases', href: '/cases' },
                { name: 'News', href: '/news' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Core Services</h3>
            <ul className="space-y-4">
              {[
                'Supply Chain Management',
                'Global Logistics',
                'Warehousing & Distribution',
                'Customs Consulting',
                'Procurement Execution',
                'IT Systems Integration',
              ].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-gray-400 hover:text-teal-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  📍
                </div>
                <div className="text-gray-400 text-sm space-y-3">
                  <p>
                    <span className="text-white font-medium block mb-1">Shenzhen HQ:</span>
                    Room 1311, Dayunwan East Center, No. 359 Huangge Road, Longgang District, Shenzhen
                  </p>
                  <p>
                    <span className="text-white font-medium block mb-1">Hong Kong Office:</span>
                    FLAT C, 9/F, WINNING HOUSE, NO.72-76, WING LOK STREET SHEUNG WAN, HONG KONG
                  </p>
                  <p>
                    <span className="text-white font-medium block mb-1">USA Branch:</span>
                    5487 Blossom Acres Dr, San Jose, CA, 95124
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  📞
                </div>
                <span className="text-gray-400">
                  86+13632721370
                </span>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  ✉️
                </div>
                <span className="text-gray-400">
                  jimmy@psc-tech.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 PSC-tech. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>ICP License 12345678</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
