export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  items: ServiceItem[];
  tag: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  specialty: string;
  image: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  totalPrice?: number;
  advanceAmount?: number;
  paymentStatus?: 'success' | 'failed' | 'pending';
  paymentReference?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'hair' | 'nails' | 'makeup' | 'skin';
  image: string;
  description: string;
}
