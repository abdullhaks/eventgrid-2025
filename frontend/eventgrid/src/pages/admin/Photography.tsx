import { useState, useEffect } from 'react';
import { Search, MapPin, MoreVertical, Plus, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type IPhotoAndVideoDocument } from '../../interfaces/photoAndVideo';

// Placeholder API function - replace with your actual adminApi call
// const addPhotoService = async (formData: FormData): Promise<void> => {
//   // Example: await adminApi.addPhotoAndVideoService(formData);
//   // For now, simulate API call
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Submitting to backend:', formData);
//       // reject(new Error('Simulated backend error')); // Uncomment to test error
//       resolve();
//     }, 1000);
//   });
// };

const districtsOfKerala = [
  'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam',
  'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta',
  'Thiruvananthapuram', 'Thrissur', 'Wayanad'
];

// Fixed schema: handle FileList safely
const formSchema = z.object({
  serviceBy: z.string().min(3, 'Service name must be at least 3 characters').max(100),
  provider: z.string().min(2, 'Provider name must be at least 2 characters').max(100),
  location: z.string().refine(val => districtsOfKerala.includes(val), 'Please select a valid district in Kerala'),
  services: z.string().min(10, 'Services description must be at least 10 characters'),
  contact: z.string().regex(/^[\w.-]+@[\w.-]+\.\w+$|^\+?\d[\d\s-]{10,}$/, 'Enter a valid email or phone number'),
  price: z.string().regex(/^\$\d+(\/\w+)?$/, 'Price must be in format like $1500/day'),
  status: z.number().int().min(1).max(3),
  referLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverImageFile: z.any() // Use z.any() first to avoid direct FileList issues
    .refine((files: FileList | undefined) => files && files.length === 1, 'Please upload exactly one image')
    .refine((files: FileList | undefined) => files && files[0]?.type.startsWith('image/'), 'File must be an image')
    .refine((files: FileList | undefined) => files && files[0]?.size <= 5 * 1024 * 1024, 'Image must be less than 5MB'),
});

type FormData = z.infer<typeof formSchema>;

const initialData: IPhotoAndVideoDocument[] = [
  // ... (your full initialData remains unchanged - kept exactly as provided)
  {
    _id: 1,
    serviceBy: "Golden Hour Studios",
    provider: "John Doe",
    location: "Thiruvananthapuram",
    services: "Wedding photography, videography, drone shots",
    contact: "john@example.com / +1-123-456-7890",
    price: "$1500/day",
    status: 1,
    referLink: "https://goldenhour.com",
    coverImage: "https://crystallinestudio.com/image_gallery_big/Crystalline-photography-1794.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 2,
    serviceBy: "Candid Moments",
    provider: "Sarah Smith",
    location: "Ernakulam",
    services: "Event videography, photo editing",
    contact: "sarah@example.com / +1-987-654-3210",
    price: "$1200/day",
    status: 2,
    referLink: "https://candidmoments.com",
    coverImage: "https://wevaphotography.com/wp-content/uploads/2021/08/Kerala-Wedding-Photography-38.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 3,
    serviceBy: "Pixel Perfect",
    provider: "Mike Ross",
    location: "Kozhikode",
    services: "Portrait photography, cinematic videos",
    contact: "mike@example.com / +1-555-123-4567",
    price: "$2000/day",
    status: 1,
    referLink: "https://pixelperfect.com",
    coverImage: "https://crystallinestudio.com/image_gallery_big/Crystalline-photography-2061.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 4,
    serviceBy: "Sunset Captures",
    provider: "Emily White",
    location: "Alappuzha",
    services: "Beach weddings, sunset videography",
    contact: "emily@example.com / +1-444-555-6666",
    price: "$1800/day",
    status: 3,
    referLink: "https://sunsetcaptures.com",
    coverImage: "https://talkingpicturesindia.com/wp-content/uploads/2020/04/1-1.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 5,
    serviceBy: "Urban Lens",
    provider: "David Lee",
    location: "Thrissur",
    services: "Urban events, drone photography",
    contact: "david@example.com / +1-777-888-9999",
    price: "$1400/day",
    status: 1,
    referLink: "https://urbanlens.com",
    coverImage: "https://wevaphotography.com/wp-content/uploads/2016/09/vivek-and-neetu-ramada-resort10.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 6,
    serviceBy: "Vivid Visions",
    provider: "Anna Green",
    location: "Kottayam",
    services: "Music video production, event coverage",
    contact: "anna@example.com / +1-222-333-4444",
    price: "$2200/day",
    status: 2,
    referLink: "https://vividvisions.com",
    coverImage: "https://www.framehunt.com/wp-content/uploads/2021/03/Kerala-Hindu-Wedding-Videography.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 7,
    serviceBy: "Eternal Frames",
    provider: "Robert Brown",
    location: "Palakkad",
    services: "Wedding videos, photo booths",
    contact: "robert@example.com / +1-666-777-8888",
    price: "$1600/day",
    status: 1,
    referLink: "https://eternalframes.com",
    coverImage: "https://chiragentertainment.in/wp-content/uploads/2020/02/videography.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 8,
    serviceBy: "Dynamic Shots",
    provider: "Lisa Taylor",
    location: "Malappuram",
    services: "Corporate events, promotional videos",
    contact: "lisa@example.com / +1-999-000-1111",
    price: "$1900/day",
    status: 3,
    referLink: "https://dynamicshots.com",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?fm=jpg&q=60&w=3000",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const LIMIT = 5;

const getStatusBadge = (status: number) => {
  const styles: { [key: number]: string } = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-orange-100 text-orange-700',
    3: 'bg-red-100 text-red-700',
  };
  const styleClass = styles[status] || 'bg-gray-100 text-gray-700';
  const labels: { [key: number]: string } = { 1: 'Active', 2: 'Busy', 3: 'Booked' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleClass}`}>{labels[status] || 'Unknown'}</span>;
};

const AddModal = ({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: FormData) => Promise<void> }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, /*setError,*/  clearErrors } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedFile = watch('coverImageFile');
  const previewUrl = selectedFile && selectedFile[0] ? URL.createObjectURL(selectedFile[0]) : null;

  const onFormSubmit = async (data: FormData) => {
    setSubmitError(null);
    clearErrors();
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to add service. Please try again.');
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setSubmitError(null);
    }
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Photography & Videography Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All form fields remain exactly the same */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service By *</label>
              <input {...register('serviceBy')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.serviceBy && <p className="mt-1 text-sm text-red-600">{errors.serviceBy.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Provider *</label>
              <input {...register('provider')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.provider && <p className="mt-1 text-sm text-red-600">{errors.provider.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location (District in Kerala) *</label>
              <select {...register('location')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select District</option>
                {districtsOfKerala.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
              <select {...register('status', { valueAsNumber: true })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value={1}>Active</option>
                <option value={2}>Busy</option>
                <option value={3}>Booked</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Services Offered *</label>
              <textarea {...register('services')} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact (Email or Phone) *</label>
              <input {...register('contact')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
              <input {...register('price')} placeholder="$1500/day" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Link (optional)</label>
              <input {...register('referLink')} placeholder="https://example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              {errors.referLink && <p className="mt-1 text-sm text-red-600">{errors.referLink.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image * (Single image, max 5MB)</label>
              <input type="file" accept="image/*" {...register('coverImageFile')} className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {errors.coverImageFile && <p className="mt-1 text-sm text-red-600">{(errors.coverImageFile as any)?.message || 'Invalid image'}</p>}
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg object-cover mx-auto shadow-md" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
              {isSubmitting && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isSubmitting ? 'Adding...' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Photography = () => {
  const [allServices, setAllServices] = useState<IPhotoAndVideoDocument[]>(initialData);
  const [services, setServices] = useState<IPhotoAndVideoDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    console.log(loading);
    
    setLoading(true);
    const dummyGet = new Promise<{ data: IPhotoAndVideoDocument[]; totalPages: number }>((resolve) => {
      setTimeout(() => {
        const start = (currentPage - 1) * LIMIT;
        const paginated = allServices.slice(start, start + LIMIT);
        resolve({
          data: paginated,
          totalPages: Math.ceil(allServices.length / LIMIT),
        });
      }, 500);
    });
    const res = await dummyGet;
    setServices(res.data);
    setTotalPages(res.totalPages);
    setLoading(false);
  };

  const handleAdd = async (formData: FormData) => {
    try {
      // Pass the actual File object to backend via FormData or directly
      const payload = new FormData();
      payload.append('serviceBy', formData.serviceBy);
      payload.append('provider', formData.provider);
      payload.append('location', formData.location);
      payload.append('services', formData.services);
      payload.append('contact', formData.contact);
      payload.append('price', formData.price);
      payload.append('status', formData.status.toString());
      if (formData.referLink) payload.append('referLink', formData.referLink);
      payload.append('coverImage', formData.coverImageFile[0]); // Send actual file

      // await addPhotoService(payload);

      // On success, refetch data (or optimistically update)
      // For demo, we'll add dummy entry with object URL
      const maxId = allServices.length > 0 ? Math.max(...allServices.map(s => s._id as number)) : 0;
      const tempImageUrl = URL.createObjectURL(formData.coverImageFile[0]);
      const newService: IPhotoAndVideoDocument = {
        _id: maxId + 1,
        serviceBy: formData.serviceBy,
        provider: formData.provider,
        location: formData.location,
        services: formData.services,
        contact: formData.contact,
        price: formData.price,
        status: formData.status,
        referLink: formData.referLink || '',
        coverImage: tempImageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAllServices(prev => [...prev, newService]);
    } catch (error) {
      throw error; // Let modal handle error display
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, allServices.length]);

  // Rest of the component (table, pagination, etc.) remains unchanged
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Photography & Videography</h2>
          <p className="text-gray-500 text-sm mt-1">All registered photo and video service providers in Kerala</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Filter</button>
        </div>
      </div>

      {/* Table / Card View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="w-full text-sm hidden md:table">
            <thead className="bg-gray-50 text-gray-500 font-medium uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Service</th>
                <th className="px-6 py-4 text-left">Provider</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Cover</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{s.serviceBy}</td>
                  <td className="px-6 py-4 text-gray-600">{s.provider}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {s.location}
                  </td>
                  <td className="px-6 py-4 font-medium">{s.price}</td>
                  <td className="px-6 py-4">{getStatusBadge(s.status)}</td>
                  <td className="px-6 py-4">
                    <img src={s.coverImage} alt="cover" className="w-16 h-16 object-cover rounded-lg shadow" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 transition">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100">
            {services.map((s) => (
              <div key={s._id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{s.serviceBy}</h4>
                    <p className="text-sm text-gray-600">{s.provider}</p>
                  </div>
                  {getStatusBadge(s.status)}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} /> {s.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{s.price}</span>
                  <img src={s.coverImage} alt="cover" className="w-20 h-20 object-cover rounded-lg shadow" />
                </div>
                <div className="text-right">
                  <button className="text-gray-400 hover:text-blue-600 transition">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition">
              Previous
            </button>
            <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition">
              Next
            </button>
          </div>
        )}
      </div>

      <AddModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
};

export default Photography;