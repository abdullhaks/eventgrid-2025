// Returns.tsx (similar to Payments, for refunds/returns)
import { Search, Calendar, MoreVertical } from 'lucide-react';

// Mock data matching ideal MongoDB schema for Returns collection
const RETURNS_DATA = [
  { _id: 601, bookingId: 3, amount: "$1500", reason: "Cancellation", date: "2025-11-05", status: "Processed" },
  { _id: 602, bookingId: 4, amount: "$2000", reason: "Service Issue", date: "2025-10-20", status: "Pending" },
];

const CancelledBookings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Returns</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all returns/refunds</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Process New Return
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search returns..." 
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
                <th className="px-6 py-4 text-left">Booking ID</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Reason</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RETURNS_DATA.map((ret) => (
                <tr key={ret._id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-medium text-gray-800">{ret.bookingId}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{ret.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{ret.reason}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                    <Calendar size={14} /> {ret.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${ret.status === 'Processed' ? 'bg-green-100 text-green-700' : 
                        'bg-orange-100 text-orange-700'}`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!RETURNS_DATA.length && (
            <div className="p-16 text-center text-gray-400">No returns found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancelledBookings;