import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Star,  Music, Camera, Utensils, 
  Home as HOMEICON, User, Sparkles, 
  ArrowRight,  SlidersHorizontal,
//   Filter,Heart, Calendar, LogOut, Play, Instagram, ChevronRight, X, Zap, Check,
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { CategoryFilter } from '../../components/CategoryFilter';

// --- MOCK DATA ---

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles, color: 'bg-stone-900', text: 'text-white' },
  { id: 'venue', label: 'Venues', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'wedding_planners', label: 'Wedding Planners', icon: User, color: 'bg-rose-500', text: 'text-white' },
  { id: 'destination_wedding', label: 'Destination Wedding', icon: MapPin, color: 'bg-blue-400', text: 'text-white' },
  { id: 'music_and_entertainment', label: 'Music & Entertainment', icon: Music, color: 'bg-purple-600', text: 'text-white' },
  { id: 'catering', label: 'Catering Service', icon: Utensils, color: 'bg-emerald-600', text: 'text-white' },
  { id: 'photography&videography', label: 'Photography', icon: Camera, color: 'bg-blue-600', text: 'text-white' },
];

// Normalized SERVICES to match CATEGORY IDs for filtering to work
const SERVICES = [
  {
    id: 1,
    title: "The Grand Victorian",
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
    category: "music_and_entertainment", // Matches Category ID
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
    category: "photography&videography", // Matches Category ID
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
    category: "music_and_entertainment", // Matches Category ID
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
    description: "Imagine celebrating the most special events of your life without worrying about a single thing.",
    category: "photography&videography", // Matches Category ID
    price: 1800,
    rating: 4.6,
    reviews: 30,
    location: "Metro City",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    tags: ["Candid", "Portrait", "Album Included"],
    color: "blue"
  }
];

export const ServiceCard = ({ service, layout = "grid" }: { service: any, layout?: "grid" | "list" }) => {
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className={`group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 ${
                layout === 'list' ? 'flex flex-row h-48' : 'flex flex-col h-full'
            }`}
        >
            {/* Image Section */}
            <div className={`relative overflow-hidden ${layout === 'list' ? 'w-1/3' : 'h-56 w-full'}`}>
                <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-stone-900">
                    <Star size={12} className="text-orange-500 fill-orange-500" /> 
                    {service.rating} ({service.reviews})
                </div>
            </div>
            
            {/* Content Section */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md bg-${service.color}-100 text-${service.color}-600 uppercase tracking-wider`}>
                            {CATEGORIES.find(c => c.id === service.category)?.label || service.category}
                        </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-stone-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                        {service.title}
                    </h3>

                    {/* New: Description (truncated with fade + hover expand) */}
                    {service.description && (
                        <p className="text-sm text-stone-600 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                            {service.description}
                        </p>
                    )}

                    <div className="flex items-center gap-1 text-xs text-stone-500 mt-3">
                        <MapPin size={12} /> {service.location}
                    </div>

                    {/* Optional: Tags (small pills) */}
                    {service.tags && layout !== 'list' && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {service.tags.slice(0, 3).map((tag: string) => (
                                <span 
                                    key={tag}
                                    className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                            {service.tags.length > 3 && (
                                <span className="text-xs text-stone-400">+{service.tags.length - 3}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Price + CTA */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                    <div>
                        <span className="font-bold text-lg text-stone-900">
                            ${service.price.toLocaleString()}
                        </span>
                        {service.unit && <span className="text-xs text-stone-500">/{service.unit}</span>}
                    </div>
                    <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white transition-all group">
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export const HeroSection = () => (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1519225468359-69df09777559?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-60" 
                alt="Hero Background"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="font-serif text-5xl md:text-7xl text-white font-medium leading-tight mb-6">
                    Curated Events, <br/>
                    <span className="italic text-orange-200">Unforgettable Memories</span>
                </h1>
                <p className="text-lg text-stone-200 font-light max-w-2xl mx-auto">
                    Explore the finest venues, planners, and creatives to bring your vision to life.
                </p>
            </motion.div>
        </div>
    </div>
);

// --- SHOWCASE SECTIONS (Used when no filters active) ---

export const VenueShowcase = ({ services }: { services: any[] }) => {
    if (services.length === 0) return null;
    return (
        <section className="py-16">
            <div className="flex items-end justify-between mb-8 px-4">
                <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-stone-900">Premier Venues</h3>
                    <p className="text-stone-500 mt-2">The foundation of a perfect event.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">View All <ArrowRight size={16}/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {services.slice(0, 3).map(service => <ServiceCard key={service.id} service={service} />)}
            </div>
        </section>
    )
}

export const CreativeShowcase = ({ services }: { services: any[] }) => {
    if (services.length === 0) return null;
    return (
        <section className="py-16 bg-stone-900 text-white rounded-3xl my-8 mx-4 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full" />
            <div className="relative z-10">
                <div className="text-center mb-12">
                    <h3 className="font-serif text-3xl md:text-4xl mb-4">Creative Minds</h3>
                    <p className="text-stone-400 max-w-xl mx-auto">Photographers, Musicians, and Entertainers who add the soul to your celebration.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map(service => (
                       <div key={service.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group">
                          <img src={service.image} className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform" alt={service.title} />
                          <h4 className="font-bold text-lg text-white">{service.title}</h4>
                          
                          {service.description && (
                              <p className="text-sm text-stone-300 mt-2 line-clamp-2">
                                  {service.description}
                              </p>
                          )}
                          
                          <div className="flex justify-between mt-4 text-sm">
                              <span className="text-white font-semibold">${service.price}</span>
                              <span className="flex items-center gap-1 text-orange-400">
                                  <Star size={12} className="fill-current" /> {service.rating}
                              </span>
                          </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function SearchConsole() {
   const [activeCategory, setActiveCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [sortOption, setSortOption] = useState('recommended'); // recommended, price_asc, price_desc, rating
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Detect sticky state for styling
  useEffect(() => {
    const handleScroll = () => {
        if (scrollRef.current) {
            setIsFilterSticky(window.scrollY > 500); // Approximate hero height
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter & Sort Logic
  const processedServices = useMemo(() => {
    let result = [...SERVICES];

    // 1. Filter by Category
    if (activeCategory !== 'all') {
        result = result.filter(s => s.category === activeCategory);
    }

    // 2. Filter by Search (Title or Tags)
    if (searchValue) {
        const q = searchValue.toLowerCase();
        result = result.filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    // 3. Filter by Location
    if (locationValue) {
        const l = locationValue.toLowerCase();
        result = result.filter(s => s.location.toLowerCase().includes(l));
    }

    // 4. Sort
    switch (sortOption) {
        case 'price_asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            result.sort((a, b) => b.reviews - a.reviews);
            break;
        default:
            // Recommended (default ID order or random logic)
            break;
    }

    return result;
  }, [activeCategory, searchValue, locationValue, sortOption]);

  const isFiltering = searchValue !== '' || locationValue !== '' || activeCategory !== 'all' || sortOption !== 'recommended';

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans">
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar /*searchValue={searchValue} setSearchValue={setSearchValue}*/ />
      
      <main>
        {/* Only show Hero if not deep searching to save space */}
        {!searchValue && <HeroSection />}
        
        {/* --- STICKY FILTER BAR --- */}
        <div ref={scrollRef} className={`sticky top-20 z-40 transition-all duration-300 ${isFilterSticky ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
             
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                {/* 1. Category Scroller */}
              <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                

                {/* 2. Filters & Sort (Right Side) */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                    {/* Location Input */}
                    <div className="relative group hidden sm:block">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Location..." 
                            value={locationValue}
                            onChange={(e) => setLocationValue(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-full border border-stone-200 bg-white text-sm focus:ring-2 focus:ring-orange-500/20 outline-none w-40 hover:w-56 transition-all"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-full border border-stone-200 bg-white text-sm font-medium focus:outline-none cursor-pointer hover:border-orange-500 transition-colors"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                        <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
             </div>

             {/* Mobile Location Input (Visible only on small screens) */}
             <div className="sm:hidden relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Filter by location..." 
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
             </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */} 
        <div className="max-w-7xl mx-auto">
            {/* Logic: If browsing (no filters), show nice sections. If filtering, show efficient grid. */}
            
            {!isFiltering ? (
                // BROWSING MODE
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="px-4 py-8">
                        <h2 className="text-xl font-bold text-stone-400 uppercase tracking-widest mb-2">Curated Collections</h2>
                    </div>
                    
                    <VenueShowcase services={SERVICES.filter(s => s.category === 'venue')} />
                    
                    <CreativeShowcase services={SERVICES.filter(s => s.category === 'photography&videography' || s.category === 'music_and_entertainment')} />
                    
                    <div className="px-4 py-12">
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif text-3xl text-stone-900">All Services</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                             {SERVICES.slice(0, 8).map(service => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : (
                // FILTERING/SEARCH MODE
                <motion.div 
                    layout
                    className="px-4 py-8 min-h-[50vh]"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold font-display text-stone-900">
                            {processedServices.length} Result{processedServices.length !== 1 && 's'} Found
                        </h2>
                        {(searchValue || locationValue || activeCategory !== 'all') && (
                            <button 
                                onClick={() => {
                                    setSearchValue('');
                                    setLocationValue('');
                                    setActiveCategory('all');
                                    setSortOption('recommended');
                                }}
                                className="text-xs font-bold text-orange-600 hover:underline ml-2"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {processedServices.length > 0 ? (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence>
                                {processedServices.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                                <Search size={40} className="text-stone-300" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">No matches found</h3>
                            <p className="text-stone-500 max-w-xs">
                                Try adjusting your search, location, or category filters to find what you're looking for.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>

      </main>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-2 mb-6 text-white">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
                <span className="font-display font-bold text-xl">EVENT<span className="text-orange-500">GRID</span></span>
            </div>
            <p className="text-sm">© 2024 EventGrid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
