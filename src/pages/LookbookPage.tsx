import Lookbook from '../components/Lookbook';

export default function LookbookPage() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Our Masterpieces</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white">
            The Client <span className="italic font-serif text-primary">Lookbook</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
          <p className="text-xs text-white/50 font-sans font-light pt-2">
            Real transformations, real results. Browse through our signature creations spanning precision hairstyles, high-fashion makeup, and elegant nails.
          </p>
        </div>

        <Lookbook />
      </div>
    </section>
  );
}
