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
              专注于提供全球端到端供应链管理服务，助力企业实现高效、透明、合规的物流运作。
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
            <h3 className="text-lg font-bold mb-6 text-white">快速链接</h3>
            <ul className="space-y-4">
              {[
                { name: '首页', href: '/' },
                { name: '关于我们', href: '/about' },
                { name: '服务项目', href: '/services' },
                { name: '行业案例', href: '/cases' },
                { name: '新闻资讯', href: '/news' },
                { name: '联系我们', href: '/contact' },
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
            <h3 className="text-lg font-bold mb-6 text-white">核心服务</h3>
            <ul className="space-y-4">
              {[
                '供应链管理',
                '全球物流',
                '仓储配送',
                '关务咨询',
                '采购执行',
                'IT 系统集成',
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
            <h3 className="text-lg font-bold mb-6 text-white">联系方式</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  📍
                </div>
                <div className="text-gray-400 text-sm space-y-3">
                  <p>
                    <span className="text-white font-medium block mb-1">深圳总部：</span>
                    Room 1311, Dayunwan East Center, No. 359 Huangge Road, Longgang District, Shenzhen
                  </p>
                  <p>
                    <span className="text-white font-medium block mb-1">香港办事处：</span>
                    FLAT C, 9/F, WINNING HOUSE, NO.72-76, WING LOK STREET SHEUNG WAN, HONG KONG
                  </p>
                  <p>
                    <span className="text-white font-medium block mb-1">美国分公司：</span>
                    5487 Blossom Acres Dr, San Jose, CA, 95124
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  📞
                </div>
                <span className="text-gray-400">
                  +86-13802249796
                </span>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-500 mt-1">
                  ✉️
                </div>
                <span className="text-gray-400">
                  Chenjimmy2024@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 PSC-tech. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-white transition-colors">服务条款</Link>
            <span>沪ICP备12345678号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
