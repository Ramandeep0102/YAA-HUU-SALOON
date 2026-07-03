import { Star } from 'lucide-react';
import { REVIEWS } from '../data';

export default function ReviewsPage() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Verified Customer Reviews</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
            Loved By <span className="italic font-serif text-primary">Our Clients</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
          <p className="text-xs text-white/50 font-sans font-light pt-2">
            We are rated 4.8 stars with over 500 verified Google reviews. Here is what some of our premium clients have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-none relative studio-light flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-primary">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary shrink-0" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed font-sans font-light italic">
                  "{rev.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-none bg-primary/20 border border-primary/25 overflow-hidden flex items-center justify-center shrink-0">
                  {rev.avatar ? (
                    <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-primary font-mono font-bold text-sm uppercase">{rev.author[0]}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-xs uppercase tracking-wider text-white">{rev.author}</h4>
                  <p className="text-[10px] text-white/40 font-mono mt-0.5">Verified Google User • {rev.relativeTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
