import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
// import thinkletLogo from "../assets/thinklet.png"
// import { GridBackground } from "../components/gridBackground";


// Landing Page
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Camera, 
  Utensils, 
  Home, 
  ArrowRight, 
  Menu, 
  X, 
  Calendar, 
  Star, 
  CheckCircle,
  Play,
  Instagram
} from 'lucide-react';
import eg_logo from '/eg-logo1.png'
import eg_img_1 from '/eg-img-1.png'

// --- Assets & Data ---

const CATEGORIES = [
  {
    id: 1,
    title: "Venues & Spaces",
    subtitle: "Architecture for Memories",
    icon: Home,
    color: "bg-stone-800",
    textColor: "text-stone-50",
    accent: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    description: "From grand ballrooms to intimate gardens."
  },
  {
    id: 2,
    title: "Sonic Atmosphere",
    subtitle: "DJs & Live Bands",
    icon: Music,
    color: "bg-purple-600",
    textColor: "text-white",
    accent: "bg-lime-400",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    description: "Curated soundscapes for every vibe."
  },
  {
    id: 3,
    title: "Culinary Arts",
    subtitle: "Catering & Mixology",
    icon: Utensils,
    color: "bg-emerald-700",
    textColor: "text-emerald-50",
    accent: "bg-yellow-400",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    description: "Tastes that linger longer than the night."
  },
  {
    id: 4,
    title: "Visual Legacy",
    subtitle: "Photo & Cinema",
    icon: Camera,
    color: "bg-blue-600",
    textColor: "text-blue-50",
    accent: "bg-pink-400",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=800",
    description: "Capturing moments, framing eternity."
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-0 bg-white/90 backdrop-blur-md border-b border-gray-100' : 'py-0 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-0 flex justify-between items-center">
        <div className="flex items-center">
          <img src={eg_logo} className="h-28" alt="EVENTGRID" />
          {/* <span className="text-2xl font-bold tracking-tighter font-display">EVENTGRID</span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#" className="hover:text-orange-600 transition-colors">Locations</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Talent</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Catering</a>
          <a href="#" className="hover:text-orange-600 transition-colors">About</a>
          <button onClick={()=>navigate('/user/start')} className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-medium text-lg">
              <a href="#" className="block py-2 border-b border-gray-100">Locations</a>
              <a href="#" className="block py-2 border-b border-gray-100">Talent</a>
              <a href="#" className="block py-2 border-b border-gray-100">Catering</a>
              <button onClick={()=>navigate('/user/start')} className="bg-black text-white w-full py-3 rounded-xl mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center overflow-hidden">
      {/* Background Grid - Swiss Style */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* Organic Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-orange-200 to-pink-200 rounded-full blur-[100px] -z-10 opacity-60"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-blue-100 to-purple-100 rounded-full blur-[100px] -z-10 opacity-60"
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-2 px-4 rounded-full bg-orange-100 text-orange-700 font-bold text-sm tracking-wide mb-6">
              REIMAGINE GATHERINGS
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black tracking-tighter leading-[0.9] font-display">
              Your Event.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-pink-500 to-purple-600">
                Our Grid.
              </span><br />
              Infinite Possibilities.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-500 max-w-xl leading-relaxed"
          >
            Curate world-class experiences through a unified platform. 
            From underground DJs to mountaintop venues.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center gap-2">
              Start Planning
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-100 text-black rounded-full font-bold text-lg hover:border-black transition-all flex items-center gap-2">
              <Play size={18} fill="currentColor" /> Watch Showreel
            </button>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative  lg:block">
           {/* Abstract Composition */}
           <div className="relative w-full aspect-4/5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute top-0 right-0 w-3/4 h-3/4 bg-stone-900 rounded-4xl overflow-hidden"
              >
                <img src={eg_img_1} alt="EVENTGRID" className="w-full h-full object-cover opacity-80" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-orange-500 rounded-4xl flex items-center justify-center p-8 text-white shadow-2xl"
              >
                 <div className="space-y-2">
                    <p className="text-5xl font-bold font-display">25k+</p>
                    <p className="text-lg font-medium opacity-90">Events Executed</p>
                    <div className="flex -space-x-3 pt-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-orange-500 bg-gray-200 bg-cover" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`}}></div>
                      ))}
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  return (
    <section className="py-24 px-6 bg-white relative z-10">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-display">
          Curated Categories
        </h2>
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="h-full bg-black"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[400px]">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group relative rounded-4xl overflow-hidden ${cat.color} ${cat.textColor} p-8 flex flex-col justify-between shadow-xl cursor-pointer`}
          >
            {/* Background Image on Hover */}
            <motion.div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
              style={{ backgroundImage: `url(${cat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${cat.accent} text-black`}>
                <cat.icon size={24} />
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>

            <div className="relative z-10 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-3xl font-bold tracking-tight font-display">{cat.title}</h3>
              <p className="opacity-80 font-medium">{cat.subtitle}</p>
              <p className="text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300 pt-2 border-t border-white/20 mt-4">
                {cat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 bg-stone-50 rounded-t-[3rem] -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-purple-600 font-bold tracking-wider text-sm uppercase mb-4 block">Why EventGrid?</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 font-display text-stone-900">
              Swiss Precision.<br/>Organic Flow.
            </h2>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">
              We don't just list vendors; we curate an ecosystem. Our grid system ensures every element of your event aligns perfectly, while our organic approach allows for spontaneity and magic.
            </p>
            
            <div className="space-y-6">
              {[
                "Real-time availability checking",
                "Unified contract management",
                "3D Venue Walkthroughs",
                "Automated Vendor Coordination"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-green-500">
                    <CheckCircle size={20} />
                  </div>
                  <span className="text-lg font-medium text-stone-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-r from-purple-200 to-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-4xl shadow-lg flex flex-col gap-4"
              >
                <div className="h-32 bg-purple-100 rounded-2xl w-full flex items-center justify-center text-purple-600">
                   <Music size={40} />
                </div>
                <div>
                   <h4 className="font-bold text-xl">Artist Booking</h4>
                   <p className="text-sm text-gray-500">Direct access to talent.</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-stone-900 text-white p-6 rounded-4xl shadow-lg flex flex-col gap-4 mt-8"
              >
                <div className="h-32 bg-stone-800 rounded-2xl w-full flex items-center justify-center text-orange-500">
                   <Calendar size={40} />
                </div>
                <div>
                   <h4 className="font-bold text-xl">Smart Scheduling</h4>
                   <p className="text-sm text-gray-400">Timeline perfection.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Marquee = () => {
  return (
    <div className="bg-black py-8 overflow-hidden flex whitespace-nowrap relative z-30">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-16 items-center text-white/30 font-display font-bold text-6xl md:text-8xl"
      >
        <span>WEDDINGS</span>
        <Star className="text-orange-500" size={48} />
        <span>CONCERTS</span>
        <Star className="text-purple-500" size={48} />
        <span>CORPORATE</span>
        <Star className="text-lime-500" size={48} />
        <span>FESTIVALS</span>
        <Star className="text-blue-500" size={48} />
        <span>WEDDINGS</span>
        <Star className="text-orange-500" size={48} />
        <span>CONCERTS</span>
        <Star className="text-purple-500" size={48} />
      </motion.div>
    </div>
  )
}

export const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-20 px-6 relative z-30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-white text-3xl font-bold font-display mb-6 tracking-tight">EVENTGRID</h2>
          <p className="max-w-md text-lg">
            Reimagining the chaos of event planning into a structured symphony of infinite possibilities.
          </p>
          <div className="flex gap-4 mt-8">
            <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"><Instagram size={20} className=""/></div>
            <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">TW</div>
            <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors cursor-pointer">LI</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Vendor Portal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Event Calculator</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>

         <div>
                <h4 className="text-white font-bold mb-4">Newsletter</h4>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email Address" className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-orange-500"/>
                    <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"><ArrowRight size={18}/></button>
                </div>
          </div>

      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between text-sm">
        <p>© 2024 EventGrid Inc. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

// --- Main App ---

export  function LandingPage() {
  return (
    <div className="font-sans text-stone-900 bg-stone-50 selection:bg-orange-200">
      {/* Inject Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&display=swap');
        
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <Navbar />
      <Hero />
      <Marquee />
      <BentoGrid />
      <Features />
      
      {/* Call to Action */}
      <section className="py-32 px-6 bg-white relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter mb-8">
            Ready to grid<br/> your vision?
          </h2>
          <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto">
            Join thousands of event planners, venues, and artists creating magic on EventGrid.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-5 bg-black text-white text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-orange-500/20">
              Get Started for Free
            </button>
            <button className="px-10 py-5 bg-white border-2 border-stone-200 text-stone-900 text-xl font-bold rounded-full hover:border-black transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}