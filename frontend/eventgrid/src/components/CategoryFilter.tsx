import { motion } from "framer-motion";
import { useRef } from "react";
import { Music, Camera, Utensils, Home as HOMEICON,Sparkles, MapPinHouse, Gem, Handshake, Waves, PartyPopper} from 'lucide-react';


const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles, color: 'bg-stone-900', text: 'text-white' },
  { id: 'venue', label: 'Venues', icon: MapPinHouse , color: 'bg-orange-500', text: 'text-white' },
  { id: 'catering', label: 'Catering Service', icon: Utensils, color: 'bg-emerald-600', text: 'text-white' },
  { id: 'photoAndVideo', label: 'Photography & Videography', icon: Camera, color: 'bg-blue-600', text: 'text-white' },
  { id: 'wedding_planners', label: 'Wedding Planners', icon: Gem , color: 'bg-orange-500', text: 'text-white' },
  { id: 'destination_wedding', label: 'Destination Wedding', icon: HOMEICON, color: 'bg-orange-500', text: 'text-white' },
  { id: 'corporate_event', label: 'Corporate events', icon: Handshake , color: 'bg-orange-500', text: 'text-white' },
  { id: 'beach_wedding', label: 'Beach Wedding', icon: Waves , color: 'bg-orange-500', text: 'text-white' },
  { id: 'music_and_entertainment', label: 'Music and Entertainment', icon: Music, color: 'bg-purple-600', text: 'text-white' },
  { id: 'private_parties', label: 'Private Parties', icon: PartyPopper , color: 'bg-purple-600', text: 'text-white' },

];



export const CategoryFilter = ({ activeCategory, setActiveCategory }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="py-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
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