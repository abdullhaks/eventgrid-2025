// Overview.tsx (formerly AdminDashboardOverview)
import { DollarSign, Calendar, Camera, Users, TrendingUp } from 'lucide-react';

// Mock data matching ideal MongoDB schema (e.g., collections for stats summaries and notifications)
const STATS = [
  { _id: 'revenue', label: "Total Revenue", value: "$124,500", icon: DollarSign, color: "text-green-600", bg: "bg-green-100", trend: "+12.5%" },
  { _id: 'bookings', label: "Total Bookings", value: "1,245", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100", trend: "+5.2%" },
  { _id: 'services', label: "Active Services", value: "85", icon: Camera, color: "text-purple-600", bg: "bg-purple-100", trend: "+2.4%" },
  { _id: 'users', label: "New Users", value: "342", icon: Users, color: "text-orange-600", bg: "bg-orange-100", trend: "+8.1%" },
];

const NOTIFICATIONS = [
  { _id: 1, title: "New Wedding Booking", message: "Venue 'Grand Hall' booked for 25th Dec", time: "10 mins ago", type: "booking" },
  { _id: 2, title: "Payment Received", message: "$500 received from User #1023", time: "1 hour ago", type: "payment" },
  { _id: 3, title: "New Service Review", message: "Photography Service rated 5 stars", time: "3 hours ago", type: "review" },
  { _id: 4, title: "System Update", message: "Maintenance scheduled for midnight", time: "5 hours ago", type: "system" },
];

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

const Overview = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat) => (
        <StatCard key={stat._id} stat={stat} />
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
            <NotificationItem key={notif._id} notif={notif} />
          ))}
        </div>
        <button className="p-4 text-sm text-blue-600 font-medium text-center border-t border-gray-100 hover:bg-gray-50 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  </div>
);

export default Overview;