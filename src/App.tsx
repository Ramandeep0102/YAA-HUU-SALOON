import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import LookbookPage from './pages/LookbookPage';
import ReviewsPage from './pages/ReviewsPage';
import BookPage from './pages/BookPage';
import { Appointment } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('yaa_huu_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('yaa_huu_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleBookingSuccess = (newApp: Appointment) => {
    setAppointments((prev) => [newApp, ...prev]);
    showToast(`Session successfully reserved for ${newApp.date} at ${newApp.time}!`);
  };

  const handleCancelBooking = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    showToast('Appointment successfully cancelled.');
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout notification={notification} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route 
            path="/book" 
            element={
              <BookPage 
                appointments={appointments} 
                handleBookingSuccess={handleBookingSuccess} 
                handleCancelBooking={handleCancelBooking} 
              />
            } 
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
