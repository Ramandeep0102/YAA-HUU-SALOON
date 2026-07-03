import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-30 transition-transform duration-[12000ms] hover:scale-105"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFp3pSPLqAD5UGhVq1WQmo31FoiL7N7XL55blsA1qjjMLmT0aMVcjByT7EHnLiiBee33Xqsq456hOWdXzrXTxVaHF5Y8K1TR2cNn2xWCLfi_Wm_lLAMZu0HOPi5MJBeXLATGgZHLES63u0wIjnbMhlMEoYXPlQLX4IEyXvC-KqVRxgEmitxeNNiOYJNCSStkgQocggYRahDzSjZVgRiVK_2hIRhzL2eGv0AAfoWR2CbF52xzywv7WE1g')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-primary text-[12px] uppercase tracking-[0.3em] mb-4 block">Est. 2024 • Luxury Collective</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] text-white mb-6 tracking-tight">
              Unlock Your Beauty <br />
              <span className="italic font-serif text-primary">Potential</span> in Mohali.
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed font-light font-sans">
              Experience the gold standard of grooming. Precision hair styling, clinical skin rituals, nail couture, and bridal makeups delivered by Mohali's most elite styling collective.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                to="/book"
                className="w-full sm:w-auto text-center px-8 py-3.5 border border-primary text-primary text-[11px] uppercase tracking-widest hover:bg-primary hover:text-black transition-colors rounded-none bg-transparent font-mono font-bold"
              >
                Book Your Session
              </Link>
              <a 
                href="tel:62807-41173"
                className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 hover:border-primary/44 px-8 py-3.5 rounded-none font-mono text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-all text-center group bg-surface-container-lowest/40 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>Call 62807-41173</span>
              </a>
            </div>
          </div>
          
          {/* SBP City Center quick bento panel */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none studio-light space-y-6 max-w-sm mx-auto">
              <div className="border border-primary/20 flex flex-col items-center justify-center py-6 px-4 space-y-4">
                <div className="text-center">
                  <div className="text-primary text-3xl font-serif italic">15+</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Master Stylists</div>
                </div>
                <div className="w-12 h-px bg-primary/30"></div>
                <div className="text-center">
                  <div className="text-primary text-3xl font-serif italic">5k</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Happy Clients</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="font-display text-[10px] uppercase tracking-widest text-white/80 font-light">The Sanctuary</h3>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                  Shop No 7, 1st Floor, S.B.P City Center, near IMPERIAL HEIGHTS, Landran, Sector 115, Mohali
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px]">
                <span className="font-mono text-primary uppercase tracking-widest">Availability</span>
                <span className="font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Open 24 Hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-24 border-t border-white/5 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Map Container */}
            <div className="lg:col-span-8 h-[450px] relative rounded-none overflow-hidden border border-white/5 studio-light">
              <div 
                className="absolute inset-0 grayscale opacity-30 bg-cover bg-center transition-opacity hover:opacity-45 duration-500"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAS1447jw9XHO-A6xe3iwJ1V0m0X4D7NIOPu06Mbth__RmaohfgZSexsnItcIWcwJNAQpy7ZUAhrt0J_J0QJvQgbEboy8Z-14AmLyJGslS1ZnbsnMg2XupOMvszhEzwL7lLsZfj6AA1l7GXSVVNkkEwjV6DUEPQr6x6H_QOWR9IqYs1v3v3dpzBJwmmxmskAm80ChS5FQUC5whp09l9pqbZq8pyjFSPz7bhOe202LZBiDpLXvSvA7fPsA')" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-none flex items-center justify-center animate-bounce shadow-[0_0_40px_rgba(197,160,89,0.3)] border border-white/10">
                  <MapPin className="w-8 h-8 text-on-primary" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto">
                <a 
                  href="https://maps.google.com/?q=SBP+City+Center+Landran+Mohali" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-background/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-none shadow-xl hover:bg-primary hover:text-on-primary transition-all group text-white"
                >
                  <ExternalLink className="w-4 h-4 text-primary group-hover:text-on-primary" />
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Coordinates Card */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-none studio-light flex-1 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border border-primary/20 text-primary rounded-none flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-widest text-primary">Our Sanctuary</h4>
                    <p className="text-sm font-bold text-white mt-1 uppercase tracking-wider">SBP City Center</p>
                    <p className="text-xs text-white/50 mt-2 leading-relaxed font-light">
                      Shop No 7, 1st Floor, S.B.P City Center, near IMPERIAL HEIGHTS, Landran, Sector 115, Sahibzada Ajit Singh Nagar, Punjab 140307
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                  <div className="w-10 h-10 border border-primary/20 text-primary rounded-none flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-widest text-primary">Direct Hotline</h4>
                    <a href="tel:62807-41173" className="text-base font-bold text-white mt-1 block hover:text-primary transition-colors">
                      62807-41173
                    </a>
                    <p className="text-[10px] text-white/40 font-mono mt-1">Speak directly with our concierge desk</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                  <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Availability</span>
                </div>
                <h3 className="font-display text-2xl font-light uppercase text-white">Open 24 Hours</h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Always ready for your transformation</p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
