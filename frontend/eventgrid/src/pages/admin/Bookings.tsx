// Bookings.tsx
import { Search, Calendar, MoreVertical } from 'lucide-react';

// Mock data matching ideal MongoDB schema for Bookings collection
const BOOKINGS_DATA = [
  { _id: 1, user: "John Doe", eventType: "Wedding", date: "2025-12-25", venue: "Grand Hall", status: "Confirmed", amount: "$5000" },
  { _id: 2, user: "Sarah Smith", eventType: "Corporate Event", date: "2026-01-15", venue: "Conference Center", status: "Pending", amount: "$3000" },
  { _id: 3, user: "Mike Ross", eventType: "Birthday Party", date: "2025-11-10", venue: "Beach Resort", status: "Cancelled", amount: "$1500" },
];

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all bookings</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Add New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
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
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Event Type</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Venue</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BOOKINGS_DATA.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-medium text-gray-800">{booking.user}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.eventType}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                    <Calendar size={14} /> {booking.date}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{booking.venue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{booking.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!BOOKINGS_DATA.length && (
            <div className="p-16 text-center text-gray-400">No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;