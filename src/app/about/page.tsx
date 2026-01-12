import { getPageBySlug } from '@/lib/api';
import TeamGallery from '@/components/ui/TeamGallery';
import { getSecureImageUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us | PSC-tech',
  description: 'Learn more about PSC-tech, our mission, vision, and global supply chain services.',
};

export default async function AboutPage() {
  const page = await getPageBySlug('about');
  const title = page?.title?.rendered || 'About Us';
  const image = page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/4.png';

  const stats = [
    { label: 'Years Experience', value: '20+' },
    { label: 'Countries Served', value: '50+' },
    { label: 'Global Partners', value: '1000+' },
    { label: 'Team Members', value: '100+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-32 md:py-48 bg-gray-900 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src={getSecureImageUrl(image)} 
                alt="About Background" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
             {title}
           </h1>
           <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
             Your trusted partner in global supply chain excellence.
           </p>
        </div>
      </div>

      {/* Main Content Split Layout */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
                
                {/* Left Column: Introduction & Choose Us */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 relative inline-block">
                        Who We Are
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-full"></span>
                    </h2>
                    
                    <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 text-justify">
                        <p>With over 20 years of deep expertise in supply chain management, we empower your success through innovative customized product solutions, rigorous quality assurance, and world-class supply chain capabilities—backed by a global footprint and seamless one-stop services.</p>
                        
                        <p>Guided by an innovation-driven philosophy, we deliver tailor-made design solutions for silicone rubber components, injection-molded plastic parts, and precision metal machined parts, flexibly adapting to personalized needs across consumer electronics, automotive, medical devices, toys, apparel, and other sectors. We embed quality into every process and industry-specific standards, implementing a strict end-to-end quality control system covering raw material screening, in-line testing, and final product validation to ensure consistent, reliable products that exceed customer expectations.</p>
                        
                        <p>Leveraging a strategic global network—including supplier resources across China and Southeast Asia—we have built an agile supply chain enabling full-link efficient collaboration: from rapid prototyping and mold development to small-batch flexible production, and global logistics coordination. As your trusted partner, we offer comprehensive one-stop OEM/ODM services spanning product design, manufacturing, and after-sales support, eliminating fragmented workflows and significantly shortening time-to-market.</p>
                        
                        <p>By integrating cutting-edge innovative technology, rigorous quality commitments, and a robust global supply chain—coupled with customer-centric customization and full-cycle one-stop support—we help turn your product vision into market-ready solutions, empowering you to seize a competitive edge in the dynamic global marketplace!</p>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mt-16 mb-6">Choose Us</h3>
                    <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 text-justify">
                        <p>More than a supply chain service provider—we’re your reliable, loyal partner on the business journey! From product inspiration to micron-level refinement of precision components, and on-time small-batch delivery, we leverage core strengths in technical expertise, flexible service, and stable quality to escort you through every critical node of product R&D and production.</p>
                        <p>With clients spanning dozens of countries worldwide—from small design studios to large renowned trading firms—we excel in the development and production of plastics, hardware, silicone, wood, textiles, and wooden products. Boasting abundant high-quality supply chain resources, we accurately align with the needs of overseas clients and designers, seamlessly connecting the entire workflow from conceptualization, material selection, and process optimization to prototype validation and mass production.</p>
                        <p>Drawing on our in-depth grasp of diverse material properties and mature supply chain system, we precisely solve industry pain points such as material compatibility, cost control, and quality assurance. No cumbersome coordination—our professional team provides end-to-end support, enabling you to effortlessly turn ideas into market-leading products that meet market demands. Empowered by our professional supply chain, idea realization becomes faster and market expansion more efficient!</p>
                    </div>
                    
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-8 my-10 rounded-r-xl shadow-sm">
                        <h4 className="font-bold text-teal-900 mb-4 text-lg">One-stop Custom silicone, plastic & metal parts Manufacturer</h4>
                        <ul className="list-disc list-inside space-y-2 text-teal-800 font-medium">
                            <li>Over 20 years of customization experiences</li>
                            <li>Full OEM&ODM solutions</li>
                            <li>Mold design and mass production</li>
                            <li>Low MOQ for maximum flexibility</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Services (Replaces Mission/Vision) */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
                            One-Stop Services
                        </h3>
                        
                        <div className="space-y-6">
                            {[
                                { title: '1. Turnkey NPI for Complex Products', desc: 'We optimize early designs for mass production, managing everything from prototypes to DFMA manufacturing with 1000+ partners, plus testing, packaging, and logistics.' },
                                { title: '2. Precision Custom Parts & Subassemblies', desc: 'We drive engineering, sourcing, reverse engineering, and BOM management for custom parts, ensuring the highest quality at the lowest cost.' },
                                { title: '3. High-precision Prototyping and Development', desc: 'We develop and produce high-precision prototype samples according to project requirements for the verification of functionality, structure and safety.' },
                                { title: '4. Industrial Design and Engineering Development', desc: 'We use professional software and expertise to digitally visualize our clients’ visionary product ideas on computers for them.' },
                                { title: '5. Factory Identification & Audits & Final Inspection', desc: 'We qualify suppliers, audit and oversee your supply chain, implement custom quality plans, and provide in-house inspection and metrology services. All inspections, QA, and QC processes are carried out by degreed engineers.' },
                                { title: '6. LOGISTICS', desc: 'As a 3PL, we manage global shipping, warehousing, kitting, JIT delivery, and support all Incoterms with preferential rates across all transportation modes.' },
                                { title: '7. COMPLIANCE', desc: 'We create testing and compliance plans, certifying your products meet CE, FDA, NSF, UL, and other international standards.' },
                                { title: '8. Flexible Production', desc: 'Targeting small-batch needs such as pilot production, market testing, and urgent replenishment orders. We deliver efficient and cost-competitive small-batch production services.' }
                            ].map((service, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <strong className="block text-teal-700 mb-2 font-bold">{service.title}</strong>
                                    <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600 text-white relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }} 
        />
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-4">
                        <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                        <div className="text-teal-100 font-medium text-lg uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-white p-10 rounded-2xl shadow-sm hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl mb-6">🤝</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
                    <p className="text-gray-500">We conduct our business with the highest standards of ethics and transparency.</p>
                </div>
                <div className="bg-white p-10 rounded-2xl shadow-sm hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl mb-6">🚀</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                    <p className="text-gray-500">We constantly seek new ways to improve efficiency and add value to our services.</p>
                </div>
                <div className="bg-white p-10 rounded-2xl shadow-sm hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl mb-6">🌍</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Global Perspective</h3>
                    <p className="text-gray-500">We understand diverse cultures and markets to better serve our global clientele.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Team Gallery Section */}
      <TeamGallery />
    </div>
  );
}
