import { AnimatePresence, motion } from "framer-motion";
import { GridBackground } from "../../components/gridBackground";
import { useState } from "react";
import { Login } from "./Login"; 
import { Signup } from "./Signup";
import eg_logo from '/eg-logo3.png'



function Auth() {
  const [view, setView] = useState('login'); // 'login' | 'signup'

  // Swiss Design: Asymmetric Layout
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-200 overflow-hidden flex">
      {/* Inject Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* LEFT PANEL: Art & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-5/12 bg-stone-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="z-10">
           <div className="flex items-center">
          <img src={eg_logo} className="h-28" alt="EVENTGRID" />
          {/* <span className="text-2xl font-bold tracking-tighter font-display">EVENTGRID</span> */}
          </div>
          <h1 className="text-6xl font-bold font-display tracking-tighter leading-none">
            Your Event.<br />
            <span className="text-orange-500">Our Grid.</span>
          </h1>
        </div>

        <div className="z-10 relative">
          <div className="space-y-6 max-w-sm">
             <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="font-serif italic text-xl mb-4">"The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style."</p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-pink-500"></div>
                   <span className="text-sm font-bold opacity-80">Josef Müller-Brockmann</span>
                </div>
             </div>
          </div>
        </div>

        {/* Organic Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-orange-600/30 to-purple-900/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"
        />
        
        {/* Grid Texture */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="w-full lg:w-7/12 relative flex flex-col">
        <GridBackground />
        
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 overflow-y-auto">
          <AnimatePresence mode="wait">
             {view === 'login' ? (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Login onNavigate={setView} />
                </motion.div>
             ) : (
                <motion.div 
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Signup onNavigate={setView} />
                </motion.div>
             )}
          </AnimatePresence>
        </div>

        {/* Mobile-only Branding Footer */}
        <div className="lg:hidden p-6 text-center text-xs text-gray-400">
          EVENTGRID © 2024
        </div>
      </div>
    </div>
  );
}

export default Auth