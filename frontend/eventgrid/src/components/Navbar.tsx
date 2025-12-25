import { useDispatch, useSelector } from "react-redux";
import type { IUser } from "../interfaces/user";
import { Search, Filter, Check, Heart, User, Calendar, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import ConfirmModal from "./ConfirmModal";
import { logoutUser as logoutApi } from "../services/apis/userApi";
import eg_logo_1 from '/eg-logo1.png';

interface RootState {
  user: { user: IUser };
}

interface NavbarProps {
  searchValue: string ;
  setSearchValue: (value: string) => void | null;
}

// const DEBOUNCE_DELAY = 600;

export const Navbar = ({ searchValue, setSearchValue }: NavbarProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [showFilter, setShowFilter] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    logoutApi();
    navigate("/");
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search value update
  // const debouncedSetSearch = useCallback(
  //   debounce((value: string) => setSearchValue(value), DEBOUNCE_DELAY),
  //   [setSearchValue]
  // );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterOptions = ["All", "Venue", "DJ", "Catering", "Photography", "Decor"];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <img src={eg_logo_1} className="h-18" alt="EVENTGRID" />
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-12 py-2.5 border-none rounded-full bg-stone-100 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all shadow-inner"
                placeholder={`Search for ${searchCategory.toLowerCase()}...`}
              />
              <div className="absolute inset-y-0 right-2 flex items-center" ref={filterRef}>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`p-1.5 rounded-full shadow-sm hover:shadow-md transition-all ${
                    showFilter ? "bg-orange-100 text-orange-600" : "bg-white text-stone-600"
                  }`}
                >
                  <Filter size={14} />
                </button>

                {showFilter && (
                  <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-3 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      Filter By
                    </div>
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSearchCategory(option);
                          setShowFilter(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center justify-between transition-colors"
                      >
                        <span>{option}</span>
                        {searchCategory === option && <Check size={14} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Profile & Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-stone-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all relative group">
                <Heart size={20} className="group-hover:fill-red-500 transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-stone-200" ref={profileRef}>
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-stone-900 leading-none">{user?.firstName || "Guest"}</p>
                </div>

                <div className="relative z-10">
                  <div
                    onClick={() => setShowProfile(!showProfile)}
                    className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform active:scale-95"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                      alt="User"
                    />
                  </div>

                  {showProfile && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      <div className="lg:hidden px-4 py-3 border-b border-stone-100 bg-stone-50">
                        <p className="text-sm font-bold text-stone-900">{user?.firstName || "Guest"}</p>
                        <p className="text-xs text-stone-500">Event Planner</p>
                      </div>

                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center gap-3 transition-colors">
                          <User size={16} /> Profile
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center gap-3 transition-colors">
                          <Calendar size={16} /> My Events
                        </button>
                      </div>

                      <div className="border-t border-stone-100 py-1">
                        <button
                          onClick={() => setShowConfirm(true)}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

// Simple debounce utility
// function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   };
// }