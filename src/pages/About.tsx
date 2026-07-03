import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Heart, 
  ThumbsUp, 
  Instagram, 
  Twitter, 
  Facebook, 
  Star, 
  ArrowRight,
  Award,
  BookOpen,
  Eye,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const WHY_CHOOSE_US = [
  {
    id: 'stylists',
    icon: Users,
    title: 'Professional Stylists',
    description: 'Our master artisans are globally trained, regularly styling for premier runway fashion shows and editorial lookbooks.'
  },
  {
    id: 'products',
    icon: Sparkles,
    title: 'Premium Products',
    description: 'We use strictly certified bio-active formulations, pH-balanced hair elixirs, and bespoke clinical skin care lines.'
  },
  {
    id: 'hygiene',
    icon: ShieldCheck,
    title: 'Hygienic Environment',
    description: 'Featuring clinical-grade air filtration and multi-stage ultraviolet sterilization protocols for every client station.'
  },
  {
    id: 'pricing',
    icon: Tag,
    title: 'Affordable Luxury',
    description: 'We offer an elite, runway-grade experience structured with highly transparent and accessible packaging options.'
  },
  {
    id: 'personalized',
    icon: Heart,
    title: 'Personalized Styling',
    description: 'Every session begins with an extensive visual and scalp diagnostic consultation to customize your exact look.'
  },
  {
    id: 'satisfaction',
    icon: ThumbsUp,
    title: 'Guaranteed Glow',
    description: 'Our commitment is absolute: if your style does not feel perfect, we offer complimentary adjustments within 7 days.'
  }
];

const EXPERTS = [
  {
    id: 'expert-1',
    name: 'Aura Vance',
    role: 'Master Creative Director',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    instagram: 'https://instagram.com',
    specialty: 'Bespoke Balayage & Avant-Garde Cuts'
  },
  {
    id: 'expert-2',
    name: 'Marcus Thorne',
    role: 'Premier Hair Sculptor',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    instagram: 'https://instagram.com',
    specialty: 'Precision Razor Shaves & Modern Colorations'
  },
  {
    id: 'expert-3',
    name: 'Sasha Grey',
    role: 'Nail Couture Lead',
    experience: '6+ Years',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    instagram: 'https://instagram.com',
    specialty: '3D Gel Sculptures & Russian Manicures'
  },
  {
    id: 'expert-4',
    name: 'Elena Rostova',
    role: 'Clinical Skin Therapist',
    experience: '9+ Years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    instagram: 'https://instagram.com',
    specialty: 'Medical Hydro-Facials & Skin Rejuvenation'
  }
];

const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    title: 'Precision Styling Area',
    category: 'Interior'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
    title: 'The Luxe Wash Station',
    category: 'Comfort'
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    title: 'Bespoke Balayage Ritual',
    category: 'Hair'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800',
    title: 'Nail Couture Detailing',
    category: 'Nails'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    title: 'Editorial Makeup Application',
    category: 'Makeup'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    title: 'Clinical Skincare Sanctuary',
    category: 'Skin'
  },
  {
    id: 'gal-7',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    title: 'Consultation Lounge',
    category: 'Interior'
  },
  {
    id: 'gal-8',
    url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800',
    title: 'Premium Cosmetic Counter',
    category: 'Products'
  }
];

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Aishwarya Sen',
    role: 'Editorial Model',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Yaa-Huu Salon has completely redefined luxury grooming in Mohali. Aura Vance is an absolute genius with balayage—my hair feels richer, healthier, and perfectly runway-ready.'
  },
  {
    id: 'test-2',
    name: 'Rohan Malhotra',
    role: 'Tech Executive',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'The precision and clinical standards here are unmatched. Marcus Thorne understood my aesthetic instantly and delivered the cleanest razor fade and hot towel treatment I have ever had.'
  },
  {
    id: 'test-3',
    name: 'Kiran Preet',
    role: 'Fashion Designer',
    image: 'https://images.unsplash.com/photo-1534751516642-a131ffd473fd?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Outstanding skin rejuvenation therapy by Elena Rostova. The Hydra-facial treatment left an incredible, long-lasting glow. S.B.P City Center is lucky to have this masterpiece!'
  }
];

export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-sliding testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Simple statistics counter state animation
  const [happyClients, setHappyClients] = useState(0);
  const [yearsExp, setYearsExp] = useState(0);
  const [stylistsCount, setStylistsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setHappyClients(Math.floor((5000 / steps) * step));
      setYearsExp(Math.floor((10 / steps) * step));
      setStylistsCount(Math.floor((25 / steps) * step));
      setServicesCount(Math.floor((15 / steps) * step));

      if (step >= steps) {
        setHappyClients(5000);
        setYearsExp(10);
        setStylistsCount(25);
        setServicesCount(15);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] text-white overflow-hidden min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-[#050505]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-6"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block">Establishing Excellence Since 2024</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light uppercase tracking-tight leading-tight">
            Where Beauty Meets <br />
            <span className="italic font-serif text-primary">Perfection</span>
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Step into Yaa-Huu Salon, Mohali's premier beauty collective. We pair master artistry with high-end therapeutic luxury to craft a style that is distinctly, flawlessly yours.
          </p>
          <div className="pt-4">
            <Link 
              to="/book" 
              className="inline-flex items-center gap-3 bg-primary text-black px-8 py-3.5 text-xs font-mono uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all rounded-none scale-100 hover:scale-105 duration-300"
            >
              Book Your Appointment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Our Story (50/50 Split) */}
      <section className="py-24 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image Side */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute inset-0 border border-primary/20 rounded-none transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="aspect-[4/3] bg-background rounded-none overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Styling session at Yaa-Huu Salon" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Story Content Side */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Our Story &amp; Heritage</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
                Crafting Elevated <span className="italic font-serif text-primary">Beauty Standards</span>
              </h2>
              <div className="w-12 h-0.5 bg-primary" />
              
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Yaa-Huu Salon was founded on the philosophy that beauty is not a checklist, but an individual masterwork. Located in the landmark <strong>S.B.P City Center, Mohali</strong>, our sanctuary stands as a beacon of high-end clinical styling and wellness.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="w-4 h-4" />
                    <h4 className="font-display text-xs uppercase tracking-widest font-bold">The Mission</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-light">
                    To deliver therapeutic beauty sessions through masterfully trained staff, innovative technologies, and certified premium elixirs.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Eye className="w-4 h-4" />
                    <h4 className="font-display text-xs uppercase tracking-widest font-bold">The Vision</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-light">
                    To establish ourselves as Mohali's premier salon collective, setting runway-grade benchmarks for luxury customer satisfaction.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (6-Card Grid) */}
      <section className="py-24 border-b border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Unrivaled Quality</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
              Why Elite Clients <span className="italic font-serif text-primary">Choose Yaa-Huu</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
            <p className="text-xs text-white/50 font-sans font-light pt-2">
              Every detail is calibrated to deliver a highly relaxing, clinical-grade grooming and styling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="bg-[#0c0c0c] border border-white/5 p-8 rounded-none transition-all duration-300 hover:border-primary/30 hover:bg-[#111] group studio-light flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 border border-primary/20 text-primary rounded-none flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-sm uppercase tracking-wider text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-end text-[10px] text-primary/40 group-hover:text-primary font-mono uppercase tracking-widest transition-colors">
                    <span>Premium Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Statistics Section (Animated Counters) */}
      <section className="py-20 border-b border-white/5 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="text-primary text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
                {happyClients.toLocaleString()}+
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-mono">Happy Clients</div>
              <p className="text-[9px] text-white/30 font-light max-w-[150px] mx-auto">Verified Google Reviews &amp; logs</p>
            </div>

            <div className="space-y-1">
              <div className="text-primary text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
                {yearsExp}+
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-mono">Years Combined Experience</div>
              <p className="text-[9px] text-white/30 font-light max-w-[150px] mx-auto">Runway and boutique history</p>
            </div>

            <div className="space-y-1">
              <div className="text-primary text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
                {stylistsCount}+
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-mono">Elite Stylists</div>
              <p className="text-[9px] text-white/30 font-light max-w-[150px] mx-auto">Certified master technicians</p>
            </div>

            <div className="space-y-1">
              <div className="text-primary text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
                {servicesCount}+
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-mono">Signature Services</div>
              <p className="text-[9px] text-white/30 font-light max-w-[150px] mx-auto">Hair, skin, makeup, and couture nails</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Meet Our Experts (Stylists) */}
      <section className="py-24 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Our Master Artisans</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
              Meet Our <span className="italic font-serif text-primary">Styling Experts</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
            <p className="text-xs text-white/50 font-sans font-light pt-2">
              Bespoke designers committed to realizing your absolute beauty potential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXPERTS.map((stylist) => (
              <div key={stylist.id} className="group relative bg-[#0c0c0c] border border-white/5 p-4 rounded-none transition-all duration-500 hover:border-primary/20 studio-light">
                {/* Square Profile Frame */}
                <div className="aspect-square w-full bg-background overflow-hidden relative border border-white/5">
                  <img 
                    src={stylist.image} 
                    alt={stylist.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      <a href={stylist.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-none border border-primary/40 bg-black/80 hover:bg-primary hover:text-black flex items-center justify-center text-primary transition-all scale-90 hover:scale-110">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-none border border-primary/40 bg-black/80 hover:bg-primary hover:text-black flex items-center justify-center text-primary transition-all scale-90 hover:scale-110">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-none border border-primary/40 bg-black/80 hover:bg-primary hover:text-black flex items-center justify-center text-primary transition-all scale-90 hover:scale-110">
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Identity info */}
                <div className="pt-4 text-center space-y-1">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{stylist.role}</span>
                  <h4 className="font-display text-base uppercase tracking-wider text-white font-light">{stylist.name}</h4>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-white/40">
                    <TrendingUp className="w-3 h-3 text-primary" />
                    <span>Experience: {stylist.experience}</span>
                  </div>
                  <p className="text-[11px] text-white/50 pt-2 font-sans font-light italic leading-snug border-t border-white/5 mt-2">
                    "{stylist.specialty}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Salon Gallery (Masonry Grid with Hover Zoom) */}
      <section className="py-24 border-b border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Our Visual Showcase</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
              The Salon <span className="italic font-serif text-primary">Sanctuary Gallery</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
            <p className="text-xs text-white/50 font-sans font-light pt-2">
              Take a virtual tour through our modern styling floor, clinical skin therapy suite, and high-fashion treatment bays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((img) => (
              <div 
                key={img.id} 
                className="group relative aspect-[4/5] overflow-hidden bg-[#0c0c0c] border border-white/5 rounded-none studio-light"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest">{img.category}</span>
                  <h4 className="font-display text-sm uppercase tracking-wider text-white font-light mt-1">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials (Auto-sliding Carousel) */}
      <section className="py-24 border-b border-white/5 bg-[#080808] relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Verified Customer Testimonials</span>
            <h2 className="font-display text-2xl sm:text-3xl font-light uppercase text-white mt-2">
              Loved By <span className="italic font-serif text-primary">Our Luxury Clients</span>
            </h2>
          </div>

          {/* Carousel Slider */}
          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((test, index) => {
                if (index !== activeTestimonial) return null;
                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-6 w-full"
                  >
                    <div className="flex justify-center gap-1 text-primary">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary shrink-0" />
                      ))}
                    </div>

                    <p className="font-sans font-light italic text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                      "{test.text}"
                    </p>

                    <div className="flex flex-col items-center gap-2 pt-4">
                      <div className="w-12 h-12 rounded-none bg-primary/20 border border-primary/25 overflow-hidden flex items-center justify-center">
                        <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-display text-xs uppercase tracking-wider text-white font-bold">{test.name}</h4>
                        <p className="text-[10px] text-primary font-mono uppercase tracking-widest mt-0.5">{test.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-none transition-all ${
                  idx === activeTestimonial ? 'bg-primary w-6' : 'bg-white/15 hover:bg-white/30'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="py-28 bg-[#050505] relative overflow-hidden text-center border-t border-white/5">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <div className="absolute right-10 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-8">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block">Your Glow Transformation Awaits</span>
          <h2 className="font-display text-4xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
            Ready for Your <br />
            <span className="italic font-serif text-primary">New Masterpiece Look?</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto" />
          <p className="text-sm text-white/50 leading-relaxed font-light font-sans max-w-xl mx-auto">
            Book now and elevate your style in our Mohali sanctuary. Open 24 Hours to cater to your beauty, skin, and grooming needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              to="/book" 
              className="w-full sm:w-auto bg-primary text-black px-10 py-4 text-xs font-mono uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all rounded-none"
            >
              Book Your Appointment
            </Link>
            <a 
              href="tel:62807-41173" 
              className="w-full sm:w-auto border border-white/10 hover:border-primary/40 px-10 py-4 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-primary transition-all rounded-none"
            >
              Call 62807-41173
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
