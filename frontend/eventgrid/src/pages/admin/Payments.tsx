// Payments.tsx
import { Search, Calendar, MoreVertical } from 'lucide-react';

// Mock data matching ideal MongoDB schema for Payments collection
const PAYMENTS_DATA = [
  { _id: 501, bookingId: 1, amount: "$5000", method: "Credit Card", date: "2025-12-01", status: "Completed" },
  { _id: 502, bookingId: 2, amount: "$3000", method: "PayPal", date: "2026-01-01", status: "Pending" },
  { _id: 503, bookingId: 3, amount: "$1500", method: "Bank Transfer", date: "2025-11-01", status: "Refunded" },
];

const Payments = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Payments</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all payments</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Add New Payment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search payments..." 
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
                <th className="px-6 py-4 text-left">Method</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PAYMENTS_DATA.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-medium text-gray-800">{payment.bookingId}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                    <Calendar size={14} /> {payment.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        payment.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {payment.status}
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
          {!PAYMENTS_DATA.length && (
            <div className="p-16 text-center text-gray-400">No payments found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;