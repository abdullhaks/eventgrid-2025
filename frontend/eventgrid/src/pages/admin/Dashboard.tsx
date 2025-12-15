import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Camera,  Utensils, HeartHandshake, Music, CreditCard, 
  RotateCcw,  DollarSign,  Bell, Search,   Menu, ChevronDown,  User,  LogOut, MoreVertical,Calendar, MapPin,
  TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../redux/slices/adminSlice';
import { logoutAdmin as logout } from '../../services/apis/adminApi';
import ConfirmModal from '../../components/ConfirmModal';



// --- Mock Data ---
const NOTIFICATIONS = [
  { id: 1, title: "New Wedding Booking", message: "Venue 'Grand Hall' booked for 25th Dec", time: "10 mins ago", type: "booking" },
  { id: 2, title: "Payment Received", message: "$500 received from User #1023", time: "1 hour ago", type: "payment" },
  { id: 3, title: "New Service Review", message: "Photography Service rated 5 stars", time: "3 hours ago", type: "review" },
  { id: 4, title: "System Update", message: "Maintenance scheduled for midnight", time: "5 hours ago", type: "system" },
];

const SERVICES_DATA = {
  photography: [
    { id: 101, name: "Golden Hour Studios", provider: "John Doe", price: "$1500/day", rating: 4.8, status: "Active", location: "New York, NY" },
    { id: 102, name: "Candid Moments", provider: "Sarah Smith", price: "$1200/day", rating: 4.5, status: "Busy", location: "Brooklyn, NY" },
    { id: 103, name: "Pixel Perfect", provider: "Mike Ross", price: "$2000/day", rating: 4.9, status: "Active", location: "Queens, NY" },
  ],
  catering: [
    { id: 201, name: "Royal Feast Catering", provider: "Chef Ramsey", price: "$50/plate", rating: 4.7, status: "Active", location: "Chicago, IL" },
    { id: 202, name: "Green Leaf Vegan", provider: "Lisa Ray", price: "$45/plate", rating: 4.6, status: "Active", location: "Austin, TX" },
  ],
  weddings: [
    { id: 301, name: "Sunset Beach Resort", provider: "Resort Mgmt", price: "$5000/day", rating: 4.9, status: "Booked", location: "Miami, FL" },
    { id: 302, name: "Mountain View Lodge", provider: "Alpine Corp", price: "$3500/day", rating: 4.8, status: "Active", location: "Aspen, CO" },
  ],
  music: [
    { id: 401, name: "DJ Bass Drop", provider: "Alex Turn", price: "$800/night", rating: 4.5, status: "Active", location: "Los Angeles, CA" },
    { id: 402, name: "Classical Quartet", provider: "Harmony Group", price: "$1200/event", rating: 4.9, status: "Active", location: "Boston, MA" },
  ]
} as const;

const STATS = [
  { label: "Total Revenue", value: "$124,500", icon: DollarSign, color: "text-green-600", bg: "bg-green-100", trend: "+12.5%" },
  { label: "Total Bookings", value: "1,245", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100", trend: "+5.2%" },
  { label: "Active Services", value: "85", icon: Camera, color: "text-purple-600", bg: "bg-purple-100", trend: "+2.4%" },
  { label: "New Users", value: "342", icon: Users, color: "text-orange-600", bg: "bg-orange-100", trend: "+8.1%" },
];

// --- Components ---
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

const StatCard = ({ stat }: { stat: typeof STATS[0] }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${stat.bg}`}>
        <stat.icon size={20} className={stat.color} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-1 text-sm">
      <TrendingUp size={14} className="text-green-500" />
      <span className="text-green-500 font-medium">{stat.trend}</span>
      <span className="text-gray-400">vs last month</span>
    </div>
  </div>
);

const NotificationItem = ({ notif }: { notif: typeof NOTIFICATIONS[0] }) => (
  <div className="flex gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
    <div className="mt-1">
      <div className={`w-2 h-2 rounded-full ${
        notif.type === 'booking' ? 'bg-blue-500' : 
        notif.type === 'payment' ? 'bg-green-500' : 
        notif.type === 'review' ? 'bg-purple-500' : 'bg-orange-500'
      }`} />
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-gray-800">{notif.title}</h4>
      <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
      <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
    </div>
  </div>
);

const ServiceManager = ({ title, type }: { title: string; type: keyof typeof SERVICES_DATA }) => {
  const data = SERVICES_DATA[type];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage {title}</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all registered {title.toLowerCase()} services</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Add New Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Service Name</th>
                <th className="px-6 py-4 text-left">Provider</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-medium text-gray-800">{service.name}</td>
                  <td className="px-6 py-4 text-gray-600">{service.provider}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {service.location}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{service.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${service.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        service.status === 'Busy' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">⭐ {service.rating}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data.length && (
            <div className="p-16 text-center text-gray-400">No services found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboardOverview = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, idx) => (
        <StatCard key={idx} stat={stat} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Revenue Analytics</h3>
          <select className="text-sm border border-gray-200 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="h-64 flex items-end justify-around gap-3">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div key={i} className="flex-1 bg-blue-50 rounded-t-lg hover:bg-blue-100 transition-colors relative group">
              <div 
                className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-around mt-6 text-xs text-gray-500 font-medium">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">4 New</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {NOTIFICATIONS.map(notif => (
            <NotificationItem key={notif.id} notif={notif} />
          ))}
        </div>
        <button className="p-4 text-sm text-blue-600 font-medium text-center border-t border-gray-100 hover:bg-gray-50 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  </div>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
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
      case 'dashboard': return <AdminDashboardOverview />;
      case 'bookings': 
      case 'photography': return <ServiceManager title="Photography" type="photography" />;
      case 'catering': return <ServiceManager title="Catering" type="catering" />;
      case 'weddings': return <ServiceManager title="Destination Weddings" type="weddings" />;
      case 'music': return <ServiceManager title="Music Events" type="music" />;
      case 'payments':
      case 'returns':
      case 'revenue':
        return (
          <div className="flex items-center justify-center h-96 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-2xl text-gray-500 font-medium">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module Coming Soon
            </p>
          </div>
        );
      default: return <AdminDashboardOverview />;
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

      {/* Sidebar - Hidden on mobile, visible on lg+ */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-gray-300 flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
          <span className="font-bold text-white text-xl tracking-tight">EventGlow</span>
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
          <SidebarItem icon={DollarSign} label="Revenue" active={activeTab === 'revenue'} onClick={() => { setActiveTab('revenue'); setSidebarOpen(false); }} />
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

                  <button onClick={()=> setShowConfirm(true)} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
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

export default Dashboard;