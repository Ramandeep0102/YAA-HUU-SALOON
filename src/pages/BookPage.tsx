import BookingForm from '../components/BookingForm';
import { Appointment } from '../types';

interface BookPageProps {
  appointments: Appointment[];
  handleBookingSuccess: (newApp: Appointment) => void;
  handleCancelBooking: (id: string) => void;
}

export default function BookPage({ appointments, handleBookingSuccess, handleCancelBooking }: BookPageProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute left-10 top-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] block">Instant Scheduling</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light uppercase text-white font-light">
            Secure Your <span className="italic font-serif text-primary">Styling Slot</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-2" />
          <p className="text-xs text-white/50 font-sans font-light pt-2">
            Select your service, choose your styling specialist, choose your ideal time, and instantly log your slot in S.B.P City Center, Mohali.
          </p>
        </div>

        <BookingForm 
          onBookingSuccess={handleBookingSuccess} 
          existingBookings={appointments} 
          onCancelBooking={handleCancelBooking}
        />
      </div>
    </section>
  );
}
