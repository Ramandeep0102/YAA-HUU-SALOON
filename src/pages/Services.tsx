import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id);

  const currentCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Our Elite Offerings</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
            Best-in-Class <span className="italic font-serif text-primary">Salon Services</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
          <p className="text-xs text-white/50 font-sans font-light pt-2">
            We utilize only the finest global formulations. Every session is carried out with medical-grade safety standards.
          </p>
        </div>

        {/* Category selection tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-10 border-b border-white/5 pb-6">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-none text-xs font-mono uppercase tracking-widest transition-all border ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary border-primary font-bold'
                  : 'bg-transparent border-white/5 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Service display bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Category details card */}
          <div className="lg:col-span-4 bg-[#0d0d0d] border border-white/5 rounded-none p-8 flex flex-col justify-between studio-light">
            <div className="space-y-4">
              <div className="w-12 h-12 border border-primary/25 text-primary rounded-none flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-white font-light">
                {currentCategory?.title}
              </h3>
              <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-none text-[10px] font-mono uppercase tracking-widest font-bold">
                {currentCategory?.tag}
              </span>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light pt-2">
                {currentCategory?.description}
              </p>
            </div>
            <div className="pt-8 border-t border-white/5 mt-8 space-y-4">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Appointment slots available today</p>
              <Link 
                to="/book"
                className="w-full flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-black py-3 rounded-none text-xs font-mono uppercase tracking-widest font-bold transition-all bg-transparent"
              >
                <span>Secure Slot</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Items listing card */}
          <div className="lg:col-span-8 bg-[#0d0d0d] border border-white/5 rounded-none p-6 sm:p-8 studio-light flex flex-col justify-between">
            <div className="divide-y divide-white/5">
              {currentCategory?.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-4 group">
                  <div className="space-y-1">
                    <h4 className="font-display text-sm uppercase tracking-wider text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/50 font-sans leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-mono text-sm font-bold text-primary block">{item.price}</span>
                    <span className="text-[9px] uppercase font-mono text-white/40 block mt-0.5">Base Rate</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-white/5 text-center sm:text-left">
              <p className="text-xs text-white/40 leading-relaxed font-sans font-light">
                * Rates listed above are indicative of basic packages. Customized overlays and premium product enhancements may carry a customized valuation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
