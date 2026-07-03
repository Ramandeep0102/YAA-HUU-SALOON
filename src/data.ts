import { ServiceCategory, Stylist, GalleryItem } from './types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hair',
    title: 'Hair Artistry',
    iconName: 'scissors',
    tag: 'Premium Hair Styling',
    description: 'Precision cutting, trendsetting styling, and transformative luxury chemical treatments.',
    items: [
      { id: 'hair-1', name: 'Master Colouring', price: '₹2,499+', description: 'Couture hair colouring with imported bond-protecting formulas.' },
      { id: 'hair-2', name: 'Keratin Infusion', price: '₹5,999', description: 'Advanced deep-conditioning keratin therapy for sleek, frizz-free hair.' },
      { id: 'hair-3', name: 'Premium Hair Extensions', price: 'Custom Quote', description: 'Bespoke high-volume hair extensions for length and style.' },
      { id: 'hair-4', name: 'Japanese Straightening', price: '₹8,999', description: 'Permanent thermal reconditioning for glass-like straight hair.' },
      { id: 'hair-5', name: 'Beard Grooming & Styling', price: '₹899', description: 'Hot towel luxury shave, precise beard trimming, and styling.' },
    ]
  },
  {
    id: 'skin',
    title: 'Skin Rituals',
    iconName: 'sparkles',
    tag: 'Clinical Glow',
    description: 'Advanced medical-grade dermatological treatments for instant rejuvenation and everlasting glow.',
    items: [
      { id: 'skin-1', name: 'O2 Hydrafacial Premium', price: '₹3,499', description: 'Multi-stage skin extraction, deep hydration, and oxygen infusion.' },
      { id: 'skin-2', name: 'Charcoal Active Detox', price: '₹2,800', description: 'Pore-tightening charcoal peel with ultrasonic cellular stimulation.' },
      { id: 'skin-3', name: 'Hydrating Glow Facial', price: '₹1,999', description: 'Soothing organic essential oils with facial massage and masks.' }
    ]
  },
  {
    id: 'nails',
    title: 'Nail Couture',
    iconName: 'nail-polish',
    tag: 'Bespoke Nail Art',
    description: 'Elegant nail sculpting, signature hand rituals, and intricate, hand-painted nail artwork.',
    items: [
      { id: 'nails-1', name: 'Gel Perfection & Extension', price: '₹1,599', description: 'Overlay extension with premium durability gel polish.' },
      { id: 'nails-2', name: 'Signature Spa Pedicure', price: '₹1,299', description: 'Revitalizing milk and honey foot soak with therapeutic massage.' },
      { id: 'nails-3', name: '3D Nail Artistry', price: '₹500+', description: 'Custom hand-crafted nail embellishments tailored to your style.' }
    ]
  },
  {
    id: 'grooming',
    title: 'The Grooming Room',
    iconName: 'crown',
    tag: 'Elite Transformations',
    description: 'Bespoke packages and high-fashion makeups tailored for weddings and grand milestones.',
    items: [
      { id: 'groom-1', name: 'Signature Groom Package', price: '₹15,000', description: 'All-inclusive premium skin, hair, and makeup layout for your special day.' },
      { id: 'groom-2', name: 'HD Airbrushing Makeup', price: '₹6,000', description: 'Ultra-light, flawless, camera-ready look with premium branding.' },
      { id: 'groom-3', name: 'Event Glamour styling', price: '₹4,500', description: 'Red-carpet-ready makeup and hair styling for elite parties.' }
    ]
  },
  {
    id: 'waxing',
    title: 'Waxing Essentials',
    iconName: 'flower',
    tag: 'Smooth Perfection',
    description: 'Pain-free, premium hair removal with soothing natural organic resins.',
    items: [
      { id: 'waxing-1', name: 'Full Body Sculpt', price: '₹2,499', description: 'Gentle organic waxing covering arms, legs, and basic zones.' },
      { id: 'waxing-2', name: 'Underarm Smoothness', price: '₹399', description: 'Rapid organic resin waxing with deep post-soothing gel.' }
    ]
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st-1',
    name: 'Amritpal Singh',
    role: 'Master Hair Architect',
    rating: 4.9,
    specialty: 'High-Fashion Hair Styling & Colouring',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'st-2',
    name: 'Simran Sandhu',
    role: 'Elite Dermatological Specialist',
    rating: 4.8,
    specialty: 'Medical-Grade Hydrafacials & Skin Peels',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'st-3',
    name: 'Deepak Sharma',
    role: 'Nail Couture Artisan',
    rating: 4.9,
    specialty: 'Bespoke 3D Nail Sculpting & Extensions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'st-4',
    name: 'Harpreet Kaur',
    role: 'Bridal & HD Airbrushing Expert',
    rating: 4.9,
    specialty: 'HD Airbrush Makeup & Elite Bridal Layouts',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Sanctuary Studio',
    category: 'all',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDczxg7J2gm17GE97hx0PkkZMSf_PRIJBRhszcw2rlXIUc97xSa3Yxzz_86FVgYFnrsVfT-RUha74PAsSbAOtEjV85bZo_nsTNev3WjcM2es7dKnFb3r_XPu8HEQN7hA1j6MH0nMFIL7vbhQvv94eWNA_j6eOp2XMrcZk1bbovgTUVDKtB-WNZhLhdrBxlFDL-sfFLt1x_Ap3FYvebZiS4vRgAsj8f1WHErs1rHZySaDRYI3NFne-RLgg',
    description: 'Premium S.B.P City Center interior, Mohali'
  },
  {
    id: 'g-2',
    title: 'Elite Hair Sculpting',
    category: 'hair',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfHOufHKM4JJZ-rANE2onR9ZrA8LGO6PQRjyhY3xWgj6X0Xicq1qyPobU1Jc9sgtq45lV7msru5sbtNAip4sZpVd2p0fr1K0rYqDboE3Xmu7Dc2uoDCEXDlqm7rnhgNZ5odjBpW4spe8xZQPk1YGV0nUBLs4WzczGcpZMODYVF0Vkx2lVANaOZYbqwnVvxA8YIVU-KS_KDJZ0s2FifGi5sWAr7BnwL9aLd10ejbTfwvZCYOMtq87cCZA',
    description: 'Precision cut and dynamic luxury locks'
  },
  {
    id: 'g-3',
    title: 'Couture Nail Extension',
    category: 'nails',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5JGCMkf8lk-yhLXsHEOvWL6tKSf_Jka-16hZ6SO_1pU0be4MfQKKD-VIapsjSbDaQyyECaECo2ux1R0WTLnsHzuyrSdZzHqVElKQ7ra5qL2ZSDy4Oabx3Na_L9kaXAnY6qYNsxH5k1PT_WwRLSk0B-K8VQploLySlixCCpvT-jzOaCPqTANIL6nDRH-13c3koR03QvzuH1WXM7P2k375oUrXqFe7PBhV0a98Ffo3eNmaM5YHAzBW9Ow',
    description: 'Intricate 3D pink shimmer nail overlays'
  },
  {
    id: 'g-4',
    title: 'HD Airbrush Bridal Glamour',
    category: 'makeup',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIsKfWCi0UfAMRr9prAhHqRKOf31Bd8WKjBwW685bOXennhOsdk3fedCewuHNXLV6IDaDD8t9zlfxuGL3VqeoHOT6ECt_HiX1LkcM6vlCLKxTxTgQHOmjpdI_Y0KEjph75AY5sKClEzf07YYvPwCyPwlU1SCshCQVS_t7nwP5K1Bd83KhKOFwTqpGTFPwqXnv5nYNjqW4_ecdpt1R7t1HZiN-PPWgyZFvGCV8pRcHhdHqyLiRhtVphEQ',
    description: 'Radiant glowing makeup and skin finish'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Priya Sharma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMEiaC5ZwYJKEiTDLGkZsacwjWhdBpAP4Aq8adft7tqkGKmF-9EC4YKAaoP6AEktIlGHJiHlDyYIfTBwQ4_mZTeteO7p2nh_I2bgelEABswpLL4Ol7Sv9fyiGnevYlf3h2rNOQhf4Gc-9cXAtzk1FREZJIr8XkpvFpXNFZx7fR-vR2-7Oy82ebtu6x3McwJNvk5_Whi5toz5qHAYlHsqB7Y6lnMeawwilSTezPZ5qRWsuJUbiPNR9llQ',
    rating: 5,
    relativeTime: '2 weeks ago',
    text: 'I got my nails done here, they did a great job and the price was so affordable. The attention to detail is truly high-fashion standard.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Aniket Singh',
    avatar: '',
    rating: 5,
    relativeTime: '3 days ago',
    text: 'Good service and good staff. They really know how to make you feel like a VIP from the moment you step in. The hair styling is unmatched.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Jaspreet Kaur',
    avatar: '',
    rating: 5,
    relativeTime: '1 week ago',
    text: 'The best salon services in Mohali! Extremely polite staff, and the place is so clean and beautifully lit. I loved my Hydrafacial session.',
    verified: true
  }
];
