import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  Instagram
} from 'lucide-react';

interface LayoutProps {
  notification: string | null;
}

export default function Layout({ notification }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/lookbook', label: 'Lookbook' },
    { to: '/reviews', label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary selection:text-on-primary">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#0d0d0d] border border-primary/30 p-4 rounded-none shadow-2xl flex gap-3 items-start studio-light"
          >
            <div className="w-8 h-8 bg-primary/20 text-primary rounded-none flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">System Update</p>
              <p className="text-xs text-white/75 mt-1 leading-relaxed font-light">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform rounded-none">
              <Scissors className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-display text-xl font-light tracking-[0.4em] text-white block leading-none">YAA-HUU</span>
              <span className="text-[9px] font-mono text-primary tracking-[0.25em] uppercase block mt-1.5">Luxury Collective</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
            {navItems.map((item) => (
              <NavLink 
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `text-xs font-mono uppercase tracking-widest transition-colors pb-1 border-b ${
                    isActive ? 'text-white border-primary' : 'text-white/60 hover:text-white border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link 
              to="/book" 
              className="px-6 py-2 border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-colors rounded-none bg-transparent font-mono"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Btn */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 group"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0d0d0d] border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.to} 
                    to={item.to} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-left py-2 border-b border-white/5 ${
                        isActive ? 'text-primary font-bold' : 'text-white/80'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link 
                  to="/book" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 border border-[#c5a059] text-[#c5a059] rounded-none mt-2 font-bold"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-primary/30 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-base font-light tracking-[0.3em] text-white">YAA-HUU</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-sm font-sans font-light">
              The premier styling collective and beauty sanctuary in Mohali. Bringing runway-grade hair styling, medical skin rituals, and nail couture into S.B.P City Center.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com/yaa_huu_salon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/5 hover:border-primary/45 hover:bg-primary/5 rounded-none flex items-center justify-center text-white/40 hover:text-primary transition-all group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://maps.google.com/?q=SBP+City+Center+Landran+Mohali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/5 hover:border-primary/45 hover:bg-primary/5 rounded-none flex items-center justify-center text-white/40 hover:text-primary transition-all group"
              >
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-primary font-bold">Quick Links</h4>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-white/40 hover:text-white transition-colors text-left">{item.label} Base</Link>
                </li>
              ))}
              <li>
                <Link to="/book" className="text-white/40 hover:text-white transition-colors text-left">Online Booking</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-primary font-bold">Partner Networks</h4>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
              <li>Justdial Premium</li>
              <li>Magicpin Rewards</li>
              <li>S.B.P City Center</li>
              <li>Imperial Heights</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-primary font-bold">Contact Center</h4>
            <p className="text-xs text-white/40 font-sans font-light">Shop No 7, S.B.P City Center, Landran, Mohali</p>
            <a href="tel:62807-41173" className="text-sm font-bold text-primary block hover:underline transition-all">62807-41173</a>
          </div>

        </div>

        <div className="border-t border-white/5 py-8 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            © 2026 YAA HUU SALON COLLECTIVE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-mono text-white/30 uppercase tracking-wider">
            <Link to="/" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
