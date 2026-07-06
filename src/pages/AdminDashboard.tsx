import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Appointment } from '../types';
import { Check, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .in('status', ['pending', 'confirmed'])
      .order('createdAt', { ascending: false });

    if (error) {
      setError('Unable to fetch appointments.');
      console.error('Admin fetch error:', error);
    } else {
      setAppointments(data ?? []);
    }
    setLoading(false);
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from('appointments')
      .update({ status: 'confirmed' })
      .eq('id', appointmentId);

    if (error) {
      setError('Could not confirm the appointment.');
      console.error('Confirm update error:', error);
      setLoading(false);
      return;
    }

    await triggerClientNotifications(appointmentId);
    await fetchPendingAppointments();
    setLoading(false);
  };

  const triggerClientNotifications = async (appointmentId: string) => {
    try {
      await fetch('/api/notify-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId }),
      });
    } catch (err) {
      console.error('Webhook notification failed:', err);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-display text-white">Admin Dashboard</h1>
          <p className="mt-3 text-sm text-white/60">Review new bookings and confirm appointments once the advance payment is validated.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#0d0d0d] border border-white/10 p-4 rounded-none">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Pending & Confirmed</p>
              <p className="text-sm text-white/70">Total appointments loaded: {appointments.length}</p>
            </div>
            <button
              type="button"
              onClick={fetchPendingAppointments}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white hover:border-primary transition"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-none">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-[#050505] border border-white/5 p-6 rounded-none text-center text-white/60">Loading appointments…</div>
          ) : appointments.length === 0 ? (
            <div className="bg-[#050505] border border-white/5 p-6 rounded-none text-center text-white/50">No appointments found.</div>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-[#050505] border border-white/5 p-5 rounded-none">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-mono">{appointment.status?.toUpperCase() ?? 'PENDING'}</p>
                      <h2 className="text-lg text-white font-display uppercase tracking-wider">{appointment.serviceName}</h2>
                      <p className="text-sm text-white/70">{appointment.clientName} • {appointment.clientPhone}</p>
                      <p className="text-sm text-white/60">{appointment.date} • {appointment.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/40 uppercase font-mono">Total</p>
                      <p className="text-lg text-primary font-bold">₹{appointment.totalPrice?.toFixed(0) ?? '0'}</p>
                      <p className="text-[11px] text-white/50">Advance paid: ₹{appointment.advanceAmount?.toFixed(0) ?? '0'}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-xs text-white/50 space-y-1">
                      <p>Email: {appointment.clientEmail || 'N/A'}</p>
                      <p>Payment: {appointment.paymentStatus ?? 'pending'}</p>
                    </div>
                    <button
                      onClick={() => handleConfirmAppointment(appointment.id)}
                      disabled={appointment.status === 'confirmed' || loading}
                      className={`px-5 py-3 uppercase tracking-[0.3em] text-xs font-bold rounded-none transition ${
                        appointment.status === 'confirmed'
                          ? 'bg-white/10 text-white/50 cursor-not-allowed'
                          : 'bg-primary text-black hover:bg-primary/90'
                      }`}
                    >
                      <Check className="w-4 h-4 inline-block mr-2" />
                      {appointment.status === 'confirmed' ? 'Confirmed' : 'Confirm Appointment'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
