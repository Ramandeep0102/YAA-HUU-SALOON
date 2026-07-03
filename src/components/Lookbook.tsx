import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ZoomIn, Calendar, CheckCircle } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Lookbook() {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'nails' | 'makeup' | 'skin'>('all');

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const filterTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'hair', label: 'Hair Sculpting' },
    { id: 'nails', label: 'Nail Couture' },
    { id: 'makeup', label: 'Radiant Makeup' },
    { id: 'skin', label: 'Glow Rituals' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 border-b border-white/5 pb-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-none text-xs font-mono uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-on-primary font-bold border border-primary scale-105'
                : 'bg-[#0d0d0d] hover:bg-[#121212] text-white/50 hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0d0d0d] border border-white/5 rounded-none studio-light"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-1.5 text-xs text-primary font-mono uppercase tracking-widest">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Lookbook Transformation</span>
                  </div>
                  <h4 className="font-display text-base uppercase tracking-wider text-white font-light">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[10px] text-primary uppercase tracking-widest font-mono">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Session Details</span>
                  </div>
                </div>
              </div>

              {/* Tag Pin */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-none text-[10px] font-mono uppercase tracking-widest text-primary">
                {item.category}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Stylist Verification badge */}
      <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto studio-light">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-primary shrink-0" />
          <div className="text-center sm:text-left">
            <h5 className="font-display text-sm uppercase tracking-wider text-white font-light">Runway Standard Guaranteed</h5>
            <p className="text-xs text-white/50 font-sans mt-1 font-light">
              All styles shown above are original client sessions performed live in our Mohali salon sanctuary.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/40">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-light">Updated July 2026</span>
        </div>
      </div>
    </div>
  );
}
