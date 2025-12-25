import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Music,
  Camera,
  Utensils,
  Home as HOMEICON,
  User,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  //   Filter,Heart, Calendar, LogOut, Play, Instagram, ChevronRight, X, Zap, Check,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { CategoryFilter } from "../../components/CategoryFilter";
import { searchServices } from "../../services/apis/userApi";
import type { IServiceDocument } from "../../interfaces/service";
import { Link } from "react-router-dom";
const DEBOUNCE_DELAY = 500;

// Map frontend category ids → backend serviceType values
const CATEGORY_MAPPING: Record<string, string> = {
  all: "",
  venue: "venue",
  wedding_planners: "wedding_planner",
  destination_wedding: "destination_wedding",
  music_and_entertainment: "music_entertainment",
  catering: "catering",
  photoAndVideo: "photoAndVideo", // or "photo_video" – adjust according to your DB
};

// --- MOCK DATA ---

const CATEGORIES = [
  {
    id: "all",
    label: "All",
    icon: Sparkles,
    color: "bg-stone-900",
    text: "text-white",
  },
  {
    id: "venue",
    label: "Venues",
    icon: HOMEICON,
    color: "bg-orange-500",
    text: "text-white",
  },
  {
    id: "wedding_planners",
    label: "Wedding Planners",
    icon: User,
    color: "bg-rose-500",
    text: "text-white",
  },
  {
    id: "destination_wedding",
    label: "Destination Wedding",
    icon: MapPin,
    color: "bg-blue-400",
    text: "text-white",
  },
  {
    id: "music_and_entertainment",
    label: "Music & Entertainment",
    icon: Music,
    color: "bg-purple-600",
    text: "text-white",
  },
  {
    id: "catering",
    label: "Catering Service",
    icon: Utensils,
    color: "bg-emerald-600",
    text: "text-white",
  },
  {
    id: "photoAndVideo",
    label: "Photography",
    icon: Camera,
    color: "bg-blue-600",
    text: "text-white",
  },
];

export const ServiceCard = ({
  service,
  layout = "grid",
}: {
  service: any;
  layout?: "grid" | "list";
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 ${
        layout === "list" ? "flex flex-row h-48" : "flex flex-col h-full"
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          layout === "list" ? "w-1/3" : "h-56 w-full"
        }`}
      >
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
            <span
              className={`text-xs font-bold px-2 py-1 rounded-md bg-${service.color}-100 text-${service.color}-600 uppercase tracking-wider`}
            >
              {CATEGORIES.find((c) => c.id === service.category)?.label ||
                service.category}
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
          {service.tags && layout !== "list" && (
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
                <span className="text-xs text-stone-400">
                  +{service.tags.length - 3}
                </span>
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
            {service.unit && (
              <span className="text-xs text-stone-500">/{service.unit}</span>
            )}
          </div>
          <Link
            to={`/service/${service._id}`}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white transition-all group"
          >
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-5xl md:text-7xl text-white font-medium leading-tight mb-6">
          Curated Events, <br />
          <span className="italic text-orange-200">Unforgettable Memories</span>
        </h1>
        <p className="text-lg text-stone-200 font-light max-w-2xl mx-auto">
          Explore the finest venues, planners, and creatives to bring your
          vision to life.
        </p>
      </motion.div>
    </div>
  </div>
);


export function SearchConsole() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  const [services, setServices] = useState<IServiceDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isFiltering = useMemo(
    () =>
      debouncedSearch.trim() !== "" ||
      locationValue.trim() !== "" ||
      activeCategory !== "all" ||
      sortOption !== "recommended",
    [debouncedSearch, locationValue, activeCategory, sortOption]
  );

  // Sticky filter bar
  useEffect(() => {
    const handleScroll = () => setIsFilterSticky(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Proper debounce only for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const fetchServices = useCallback(
    async (page = 1, append = false) => {
      if (!isFiltering && page === 1) return;

      setLoading(true);
      setError(null);

      try {
        const params: any = {
          page,
          limit: 12,
          sort: sortOption === "recommended" ? "newest" : sortOption,
        };

        const backendCategory = CATEGORY_MAPPING[activeCategory];
        if (backendCategory) params.category = backendCategory;

        if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
        if (locationValue.trim()) params.location = locationValue.trim();

        const data = await searchServices(params);

        setServices((prev) => (append ? [...prev, ...data.services] : data.services));
        setPagination(data.pagination);
      } catch (err: any) {
        setError(err.message || "Failed to load services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [isFiltering, activeCategory, debouncedSearch, locationValue, sortOption]
  );

  // Reset & fetch when important filters change
  useEffect(() => {
    setServices([]);
    setPagination((p) => ({ ...p, currentPage: 1 }));
    fetchServices(1);
  }, [activeCategory, sortOption, debouncedSearch, locationValue, fetchServices]);

  const handleLoadMore = () => {
    if (pagination.hasNext && !loading) {
      fetchServices(pagination.currentPage + 1, true);
    }
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setLocationValue("");
    setActiveCategory("all");
    setSortOption("recommended");
    setError(null);
  };

  // Map backend document to frontend expected shape
  const adaptedServices = services.map((s: any) => ({
    _id: s._id,
    title: s.serviceName,
    image: s.coverImage,
    category: s.serviceType,
    location: s.location,
    price: s.price,
    unit: undefined, // add if you have it
    description: s.description,
    rating: 4.8, // ← placeholder! you should add real rating later
    reviews: 124, // ← placeholder
    tags: [], // ← add if you want
    color: getCategoryColor(s.serviceType), // helper function below
  }));

  function getCategoryColor(type: string): string {
  const map: Record<string, string> = {
    venue: "orange",
    wedding_planner: "rose",
    catering: "emerald",
    photography: "blue",
    // ...
  };
  return map[type] || "stone";
}

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

      <main>
        {/* Hero only in pure browsing mode */}
        {!isFiltering && <HeroSection />}

        {/* Sticky Filter Bar */}
        <div
          ref={scrollRef}
          className={`sticky top-20 z-40 transition-all duration-300 ${
            isFilterSticky ? "bg-white/95 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

              <div className="flex items-center gap-2 self-end md:self-auto">
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

        <div className="max-w-7xl mx-auto px-4">
          {isFiltering && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {loading && services.length === 0
                    ? "Searching..."
                    : error
                    ? "Error"
                    : `${pagination.totalItems} Result${pagination.totalItems !== 1 ? "s" : ""}`}
                </h2>
                <button onClick={handleClearFilters} className="text-sm text-orange-600 hover:underline">
                  Clear all
                </button>
              </div>

              {error && <div className="bg-red-50 p-6 rounded-xl mb-8 text-center">{error}</div>}

              {loading && services.length === 0 ? (
                <div className="flex justify-center py-32">
                  <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-orange-500" />
                </div>
              ) : adaptedServices.length === 0 ? (
                <div className="py-32 text-center">
                  <Search className="h-20 w-20 text-stone-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">No matches found</h3>
                </div>
              ) : (
                <>
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                    <AnimatePresence>
                      {adaptedServices.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {pagination.hasNext && (
                    <div className="text-center py-10">
                      <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-10 py-4 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 disabled:opacity-50"
                      >
                        {loading ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Browsing mode (no filters) */}
          {!isFiltering && (
            <div className="py-12">
              <h2 className="text-3xl font-bold mb-8">Featured Services</h2>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {adaptedServices.slice(0, 8).map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="font-display font-bold text-xl">
              EVENT<span className="text-orange-500">GRID</span>
            </span>
          </div>
          <p className="text-sm">© 2024 EventGrid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
