import{ useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Filter, Music, Camera, Utensils, Home as HOMEICON, Heart,
  Calendar,User,LogOut,Sparkles,Zap,
  Check,
  ArrowRight,
  ChevronRight,
  Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser as logout } from "../../services/apis/userApi";
import { logoutUser } from "../../redux/slices/userSlice";
import type { IUser } from '../../interfaces/user';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import { Footer } from '../LandingPage';
import { Navbar } from '../../components/Navbar';
import { CategoryFilter } from '../../components/CategoryFilter';





const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles, color: 'bg-stone-900', text: 'text-white' },
  { id: 'venue', label: 'Venues', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'wedding_planners', label: 'Wedding Planners', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'destination_wedding', label: 'Destination Wedding', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'corporate_event', label: 'Destination Wedding', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'beach_wedding', label: 'Beach Wedding', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'music_and_entertainment', label: 'Music and Entertainment', icon: Music, color: 'bg-purple-600', text: 'text-white' },
  { id: 'private_parties', label: 'Private Parties', icon: Music, color: 'bg-purple-600', text: 'text-white' },
  { id: 'catering', label: 'Catering Service', icon: Utensils, color: 'bg-emerald-600', text: 'text-white' },
  { id: 'photography&videography', label: 'Photography & Videography', icon: Camera, color: 'bg-blue-600', text: 'text-white' },
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







export const ServiceCard = ({ service, index }:any) => {
  // Dynamic color map
  const colors = {
    orange: "bg-orange-50 text-orange-700 border-orange-100 group-hover:border-orange-200",
    purple: "bg-purple-50 text-purple-700 border-purple-100 group-hover:border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-200",
  };

  const badgeColor = colors[service.color as keyof typeof colors] || colors.orange;

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
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold font-display leading-tight mb-1">{service.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={14} className="mr-1" />
            {service.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
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

  const navigate = useNavigate();

  return (
    <div className="relative pt-12 pb-8 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-linear-to-br from-orange-500 to-pink-500 rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-pink-400">Our Grid.</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-lg mb-8 leading-relaxed">
              Discover and book the finest vendors for your next big moment. From intimate gatherings to grand galas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={()=> navigate('/search')} className="px-6 py-3 bg-white text-stone-900 rounded-full font-bold hover:bg-orange-50 transition-colors cursor-pointer">
                Create New Event
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors cursor-pointer">
                View My Bookings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};



const VenueShowcase = ({ services }: { services: any[] }) => {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12">
                <div>
                    <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2">The Foundation</h2>
                    <h3 className="font-serif text-4xl md:text-5xl text-stone-900">Breathtaking Venues</h3>
                </div>
                <p className="max-w-md text-stone-500 mt-4 md:mt-0 text-right md:text-left">
                    Find the perfect backdrop for your story. From historic ballrooms to modern rooftop gardens.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Featured Large Card */}
                <div className="lg:col-span-7">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
                    >
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Featured Venue" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <div className="bg-orange-500 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">Editor's Choice</div>
                            <h4 className="font-serif text-3xl mb-2">The Grand Victorian Estate</h4>
                            <p className="text-stone-300 line-clamp-2 max-w-lg mb-4">An architectural masterpiece featuring lush gardens and a ballroom that whispers history.</p>
                            <span className="flex items-center gap-2 text-sm font-bold border-b border-white/30 pb-1 w-fit">Explore Venue <ArrowRight size={14}/></span>
                        </div>
                    </motion.div>
                </div>
                
                {/* Side List */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    {services.slice(0, 2).map((service, idx) => (
                         <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                         >
                            <ServiceCard service={service} variant="minimal" />
                         </motion.div>
                    ))}
                    <button className="w-full py-4 border-2 border-stone-200 rounded-2xl text-stone-600 font-bold hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2">
                        View All Venues <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    )
}

// 2. PHOTOGRAPHY - Dark Mode, Cinematic, Gallery Grid
const PhotographyShowcase = ({ services }: { services: any[] }) => {
    return (
        <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-3xl rounded-full pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Camera size={20} className="text-blue-400 mr-2" />
                        <span className="text-sm font-medium tracking-wide">Capture The Emotion</span>
                    </motion.div>
                    <h3 className="font-serif text-5xl mb-6">Cinematic Memories</h3>
                    <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                        Talented storytellers who freeze time. Find photographers who match your aesthetic, from moody & dramatic to bright & airy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`${idx === 1 ? 'md:-mt-12' : ''}`}
                        >
                            <ServiceCard service={service} variant="dark" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// 3. CATERING - Clean, Delicious, Circular Accents
const CateringShowcase = ({ services }: { services: any[] }) => {
    return (
        <section className="py-20 bg-stone-50 relative">
            <div className="max-w-7xl mx-auto px-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" 
                                className="rounded-t-[4rem] rounded-b-2xl h-64 w-full object-cover shadow-xl" 
                                alt="Food 1" 
                            />
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600" 
                                className="rounded-t-2xl rounded-b-[4rem] h-64 w-full object-cover mt-12 shadow-xl" 
                                alt="Food 2" 
                            />
                        </div>
                    </div>
                    
                    <div className="order-1 md:order-2">
                        <div className="flex items-center gap-2 text-emerald-600 mb-4 font-bold tracking-widest text-sm uppercase">
                            <Utensils size={18} />
                            <span>A Taste of Excellence</span>
                        </div>
                        <h3 className="font-serif text-5xl text-stone-900 mb-6 leading-tight">
                            Exquisite Flavors for <br/>Your Guests
                        </h3>
                        <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                            From farm-to-table freshness to avant-garde culinary art. Explore caterers who transform simple ingredients into unforgettable experiences.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><Check size={20}/></div>
                                <div>
                                    <h4 className="font-bold text-stone-900">Customized Menus</h4>
                                    <p className="text-sm text-stone-500">Tailored to your dietary needs and theme.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><User size={20}/></div>
                                <div>
                                    <h4 className="font-bold text-stone-900">Top-Tier Service</h4>
                                    <p className="text-sm text-stone-500">Professional waitstaff and bartenders.</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors">
                            Find Caterers
                        </button>
                    </div>
                 </div>
            </div>
        </section>
    )
}

// 4. MUSIC - Vibrant, Gradient, Energetic
const MusicShowcase = ({ services }: { services: any[] }) => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-900 via-indigo-900 to-purple-800 text-white" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-center mb-12">
                     <h3 className="font-serif text-4xl md:text-5xl text-white">Set The Vibe</h3>
                     <div className="hidden md:flex gap-2">
                         <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"><ChevronRight className="rotate-180" /></button>
                         <button className="p-3 bg-white text-purple-900 rounded-full hover:bg-stone-200 transition-colors"><ChevronRight /></button>
                     </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x">
                    {services.map((service, idx) => (
                        <motion.div 
                            key={idx}
                            className="min-w-[300px] md:min-w-[350px] snap-center"
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl h-full hover:bg-white/20 transition-colors">
                                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                     <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                         <div className="bg-white/20 backdrop-blur-lg p-3 rounded-full border border-white/50">
                                            <Play size={24} className="fill-white text-white ml-1" />
                                         </div>
                                     </div>
                                </div>
                                <h4 className="text-xl font-bold mb-1">{service.title}</h4>
                                <div className="flex gap-2 text-sm text-purple-200 mb-3">
                                    {service.tags.map((t:string) => <span key={t}>#{t}</span>)}
                                </div>
                                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                                    <span className="font-bold text-lg">${service.price}</span>
                                    <div className="flex items-center gap-1 text-sm"><Star size={14} className="fill-orange-400 text-orange-400"/> {service.rating}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* CTA Card */}
                    <div className="min-w-[200px] flex items-center justify-center">
                        <button className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group">
                            <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                                <ArrowRight size={24} />
                            </div>
                            <span className="font-bold">View All DJs</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}



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

        <VenueShowcase services={SERVICES.filter(s => s.category === 'venue')} />
        <PhotographyShowcase services={SERVICES.filter(s => s.category === 'photography')} />
        <CateringShowcase services={SERVICES.filter(s => s.category === 'catering')} />
        <MusicShowcase services={SERVICES.filter(s => s.category === 'music' || s.category === 'dj')} />

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
        <Footer/>
      </main>

  
    </div>
  );
};

