// Layout.tsx
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Camera, Utensils, HeartHandshake, Music, CreditCard, 
  RotateCcw, Bell,  Menu, ChevronDown, User, LogOut ,
// Search,DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../redux/slices/adminSlice';
import { logoutAdmin as logout } from '../../services/apis/adminApi';
import ConfirmModal from '../../components/ConfirmModal';
import Overview from './Overview';
import Bookings from './Bookings';
import Photography from './Photography';
import Catering from './Catering';
import Weddings from './Weddings';
import MusicEvent from './MusicEvent';
import Payments from './Payments';
import CancelledBookings from './CancelledBookings';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-3 transition-colors duration-200 rounded-lg mx-3
      ${active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-400 hover:bg-slate-800 hover:text-white'
      }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Overview />;
      case 'bookings': return <Bookings />;
      case 'photography': return <Photography />;
      case 'catering': return <Catering />;
      case 'weddings': return <Weddings />;
      case 'music': return <MusicEvent />;
      case 'payments': return <Payments />;
      case 'returns': return <CancelledBookings />;
      default: return <Overview />;
    }
  };

  const pageTitle = activeTab === 'dashboard' 
    ? 'Overview' 
    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1');

  const handleLogout = () => {
    dispatch(logoutAdmin());
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-gray-300 flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          {/* <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div> */}
          <span className="font-bold text-white text-xl tracking-tight">Eventgrid</span>
          <span className="text-white text-sm tracking-tight">Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 no-scrollbar">
          <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Main</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }} />
          <SidebarItem icon={LayoutDashboard} label="Bookings" active={activeTab === 'bookings'} onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }} />

          <div className="px-3 mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Services</div>
          <SidebarItem icon={Camera} label="Photography" active={activeTab === 'photography'} onClick={() => { setActiveTab('photography'); setSidebarOpen(false); }} />
          <SidebarItem icon={Utensils} label="Catering" active={activeTab === 'catering'} onClick={() => { setActiveTab('catering'); setSidebarOpen(false); }} />
          <SidebarItem icon={HeartHandshake} label="Weddings" active={activeTab === 'weddings'} onClick={() => { setActiveTab('weddings'); setSidebarOpen(false); }} />
          <SidebarItem icon={Music} label="Music Events" active={activeTab === 'music'} onClick={() => { setActiveTab('music'); setSidebarOpen(false); }} />

          <div className="px-3 mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Finance</div>
          <SidebarItem icon={CreditCard} label="Payments" active={activeTab === 'payments'} onClick={() => { setActiveTab('payments'); setSidebarOpen(false); }} />
          <SidebarItem icon={RotateCcw} label="Returns" active={activeTab === 'returns'} onClick={() => { setActiveTab('returns'); setSidebarOpen(false); }} />
          {/* <SidebarItem icon={DollarSign} label="Revenue" active={activeTab === 'revenue'} onClick={() => { setActiveTab('revenue'); setSidebarOpen(false); }} /> */}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-400">admin@eventgrid.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-gray-800">Abdullha ks</div>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Admin</div>
                </div>
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" 
                  alt="Admin" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">Abdullha ks</p>
                    <p className="text-sm text-gray-500">admin@eventgrid.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3">
                    <User size={16} /> My Profile
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={() => setShowConfirm(true)} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {showConfirm && <ConfirmModal message="Are you sure you want to log out?" onConfirm={handleLogout} onCancel={() => setShowConfirm(false)} />}
      </div>
    </div>
  );
};

export default Layout;