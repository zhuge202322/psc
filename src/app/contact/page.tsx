'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-32 md:py-48 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
             {/* Using a dark abstract background or image */}
             <div className="absolute inset-0 bg-[#020617]" />
             <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-purple-900/20" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-6xl font-bold text-white mb-6"
           >
             Contact Us
           </motion.h1>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6" 
           />
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
           >
             We'd love to hear from you. Let's start a conversation.
           </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-teal-500 rounded-full"></span>
                Contact Information
              </h2>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h3>
                    <a href="mailto:Chenjimmy2024@gmail.com" className="text-lg font-medium text-gray-900 hover:text-teal-600 transition-colors">
                      Chenjimmy2024@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</h3>
                    <a href="tel:+8613802249796" className="text-lg font-medium text-gray-900 hover:text-teal-600 transition-colors">
                      +86-13802249796
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Headquarters</h3>
                    <p className="text-lg font-medium text-gray-900 leading-relaxed">
                      Room 1311, Dayunwan East Center, No. 359 Huangge Road, Longgang District, Shenzhen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Offices */}
            <div className="pt-8 border-t border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Our Global Offices</h3>
               <div className="space-y-8">
                 {/* Hong Kong */}
                 <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                        <strong className="block text-gray-900 text-lg mb-1">Hong Kong</strong>
                        <span className="text-gray-600 leading-relaxed block">FLAT C, 9/F, WINNING HOUSE, NO.72-76, WING LOK STREET</span>
                    </div>
                 </div>

                 {/* USA */}
                 <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <strong className="block text-gray-900 text-lg mb-1">USA (San Jose)</strong>
                        <span className="text-gray-600 leading-relaxed block">5487 Blossom Acres Dr, San Jose, CA, 95124</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Company</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all" placeholder="Company Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email *</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Service Interest</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all text-gray-600">
                        <option>Please select a service...</option>
                        <option>Product Sourcing</option>
                        <option>Logistics & Shipping</option>
                        <option>Quality Control</option>
                        <option>Factory Audit</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message *</label>
                    <textarea rows={6} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-teal-500 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/30">
                    Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
