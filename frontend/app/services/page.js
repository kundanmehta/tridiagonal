import FadeUp from '@/components/animations/FadeUp';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Hexagon, Activity, Cpu, Leaf, Globe2 } from 'lucide-react';

const services = [
  { slug: "process-engineering", title: "Process Engineering", icon: <Activity size={40} />, desc: "Design, optimize and troubleshoot complex chemical processes with our expert engineering team." },
  { slug: "flow-modeling", title: "Flow Modeling", icon: <Hexagon size={40} />, desc: "Advanced CFD analysis for reactor design, fluid flow problems, and heat transfer." },
  { slug: "particle-technology", title: "Particle Technology", icon: <Globe2 size={40} />, desc: "Complete characterization and handling solutions for granular materials & particles." },
  { slug: "asset-performance", title: "Asset Performance", icon: <Cpu size={40} />, desc: "Deep monitorization and reliability enhancement for critical industrial assets." },
  { slug: "sustainability", title: "Sustainability Solutions", icon: <Leaf size={40} />, desc: "Energy efficiency and emission reduction strategies tailored for a cleaner future." }
];

export default function ServicesPage() {
  return (
    <>
      {/* Heavy Corporate Header */}
      <section className="bg-corporate-blue pt-20 pb-24 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="max-w-3xl">
               <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Services</h1>
               <p className="text-xl text-gray-300 font-light leading-relaxed">
                 We bridge the gap between applied science and core engineering to offer solutions that optimize operations across process-heavy industries.
               </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-corporate-gray/50">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <Link href={`/services/${service.slug}`} className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:border-corporate-lightBlue/30 shadow-sm hover:shadow-2xl transition-all h-full">
                 <div className="w-16 h-16 bg-corporate-blue/5 text-corporate-lightBlue rounded-xl flex items-center justify-center mb-8 group-hover:bg-corporate-lightBlue group-hover:text-white transition-colors duration-300">
                    {service.icon}
                 </div>
                 <h2 className="text-2xl font-bold text-corporate-blue mb-4">{service.title}</h2>
                 <p className="text-corporate-darkGray leading-relaxed mb-6">
                    {service.desc}
                 </p>
                 <span className="text-corporate-lightBlue font-semibold inline-flex items-center group-hover:text-corporate-blue transition-colors">
                   View Details <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                 </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
