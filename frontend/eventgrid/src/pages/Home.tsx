import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  Music, 
  Camera, 
  Utensils, 
  Home as HOMEICON, 
  Heart,
  ChevronDown,
  Calendar,
  User,
  LogOut,
  Sparkles,
  Zap,
  Coffee,
  Aperture
} from 'lucide-react';

// --- MOCK DATA ---

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles, color: 'bg-stone-900', text: 'text-white' },
  { id: 'venue', label: 'Venues', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'dj', label: 'Music & DJs', icon: Music, color: 'bg-purple-600', text: 'text-white' },
  { id: 'catering', label: 'Catering', icon: Utensils, color: 'bg-emerald-600', text: 'text-white' },
  { id: 'photo', label: 'Photography', icon: Camera, color: 'bg-blue-600', text: 'text-white' },
];

const SERVICES = [
  {
    id: 1,
    title: "The Grand Victorian",
    category: "venue",
    price: 2500,
    rating: 4.9,
    reviews: 128,
    location: "Downtown, Metro City",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    tags: ["Historic", "Indoor", "500 Guests"],
    color: "orange"
  },
  {
    id: 2,
    title: "DJ Neon Pulse",
    category: "dj",
    price: 800,
    rating: 5.0,
    reviews: 84,
    location: "Available Citywide",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=800",
    tags: ["EDM", "House", "Equipment Included"],
    color: "purple"
  },
  {
    id: 3,
    title: "Gourmet Earth Catering",
    category: "catering",
    price: 45,
    unit: "per plate",
    rating: 4.8,
    reviews: 215,
    location: "Metro Region",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegan Options", "Farm to Table", "Full Service"],
    color: "emerald"
  },
  {
    id: 4,
    title: "Lumina Studios",
    category: "photo",
    price: 1200,
    rating: 4.9,
    reviews: 56,
    location: "Greater Area",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=800",
    tags: ["Drone Shot", "Cinematic", "Same Day Edit"],
    color: "blue"
  },
  {
    id: 5,
    title: "Skyline Roof Gardens",
    category: "venue",
    price: 3500,
    rating: 4.7,
    reviews: 92,
    location: "Uptown District",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
    tags: ["Outdoor", "City View", "Modern"],
    color: "orange"
  },
  {
    id: 6,
    title: "Acoustic Soul Band",
    category: "dj",
    price: 1500,
    rating: 4.8,
    reviews: 45,
    location: "Travels up to 50mi",
    image: "https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=800",
    tags: ["Live Music", "Jazz", "Weddings"],
    color: "purple"
  },
  {
    id: 7,
    title: "Lens & Light",
    category: "photo",
    price: 1800,
    rating: 4.6,
    reviews: 30,
    location: "Metro City",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    tags: ["Candid", "Portrait", "Album Included"],
    color: "blue"
  }
];

// --- COMPONENTS ---

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-900 rounded-lg grid grid-cols-2 gap-1 p-1">
              <div className="bg-white rounded-sm"></div>
              <div className="bg-orange-500 rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold tracking-tight font-display hidden sm:block">EVENTGRID</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full bg-stone-100 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all shadow-inner"
              placeholder="Search for venues, artists, or services..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                <Filter size={14} className="text-stone-600" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all relative">
              <Heart size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-stone-900 leading-none">Alex Morgan</p>
                <p className="text-xs text-stone-500">Event Planner</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};

export const CategoryFilter = ({ activeCategory, setActiveCategory }:any) => {
  return (
    <div className="py-8 overflow-x-auto no-scrollbar">
      <div className="flex gap-3 px-4 sm:px-8 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all shadow-sm
                ${isActive 
                  ? `${cat.color} ${cat.text} shadow-lg ring-2 ring-offset-2 ring-transparent` 
                  : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'}
              `}
            >
              <cat.icon size={16} />
              {cat.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export const ServiceCard = ({ service, index }:any) => {
  // Dynamic color map
  const colors = {
    orange: "bg-orange-50 text-orange-700 border-orange-100 group-hover:border-orange-200",
    purple: "bg-purple-50 text-purple-700 border-purple-100 group-hover:border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-200",
  };

  const badgeColor = /*colors[service.color] ||*/ colors.orange;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute top-4 left-4 z-10 flex gap-2">
           <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
             {service.category}
           </span>
        </div>
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold font-display leading-tight mb-1">{service.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={14} className="mr-1" />
            {service.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="font-bold text-stone-900">{service.rating}</span>
            <span className="text-stone-400 text-sm">({service.reviews})</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Starting at</p>
            <p className="text-lg font-bold text-stone-900">
              ${service.price}
              {service.unit && <span className="text-sm font-normal text-stone-500">/{service.unit.replace('per ', '')}</span>}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag:any, i:number) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-md border font-medium ${badgeColor}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <button className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-orange-500/20">
            View Details
            <Zap size={16} className="group-hover:fill-current" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  return (
    <div className="relative pt-12 pb-8 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[60px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium mb-6">
              👋 Welcome back, Alex
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1] mb-6">
              Your Event. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">Our Grid.</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-lg mb-8 leading-relaxed">
              Discover and book the finest vendors for your next big moment. From intimate gatherings to grand galas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-stone-900 rounded-full font-bold hover:bg-orange-50 transition-colors">
                Create New Event
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                View My Bookings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState(SERVICES);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredServices(SERVICES);
    } else {
      setFilteredServices(SERVICES.filter(s => s.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-orange-200 pb-20">
       {/* Inject Fonts */}
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />
      
      <main>
        <HeroSection />
        
        <div className="sticky top-20 z-40 bg-stone-50/95 backdrop-blur-sm pt-4 border-b border-stone-200/50 mb-8">
          <div className="max-w-7xl mx-auto">
             <div className="px-8 mb-2 flex justify-between items-end">
                <h2 className="text-2xl font-bold font-display text-stone-900">Explore Services</h2>
                <div className="hidden sm:flex gap-2 text-sm font-medium text-stone-500">
                   <span className="text-stone-900 cursor-pointer">Recommended</span>
                   <span className="mx-2">·</span>
                   <span className="hover:text-stone-900 cursor-pointer transition-colors">Price (Low-High)</span>
                   <span className="mx-2">·</span>
                   <span className="hover:text-stone-900 cursor-pointer transition-colors">Top Rated</span>
                </div>
             </div>
            <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20 opacity-50">
              <Sparkles size={48} className="mx-auto mb-4" />
              <p className="text-xl font-medium">No services found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

