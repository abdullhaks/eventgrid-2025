// Photography.tsx
import { Search, MapPin, MoreVertical } from 'lucide-react';

// Mock data matching ideal MongoDB schema for Photography services collection
const PHOTOGRAPHY_DATA = [
  { _id: 101, name: "Golden Hour Studios", provider: "John Doe", price: "$1500/day", rating: 4.8, status: "Active", location: "New York, NY" },
  { _id: 102, name: "Candid Moments", provider: "Sarah Smith", price: "$1200/day", rating: 4.5, status: "Busy", location: "Brooklyn, NY" },
  { _id: 103, name: "Pixel Perfect", provider: "Mike Ross", price: "$2000/day", rating: 4.9, status: "Active", location: "Queens, NY" },
];

const Photography = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Photography</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all registered photography services</p>
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
              {PHOTOGRAPHY_DATA.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 group">
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
          {!PHOTOGRAPHY_DATA.length && (
            <div className="p-16 text-center text-gray-400">No services found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photography;