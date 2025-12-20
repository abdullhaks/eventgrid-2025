import { useState, useEffect } from 'react';
import { Search, MapPin, MoreVertical, Plus, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type IPhotoAndVideoDocument } from '../../interfaces/photoAndVideo';
import GeoapifyAutocomplete from '../../components/GeoapifyAutocomplete';

const formSchema = z.object({
  serviceBy: z.string().min(3, 'Service name must be at least 3 characters').max(100),
  provider: z.string().min(2, 'Provider name must be at least 2 characters').max(100),
  location: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
    text: z.string().min(1, 'Location is required'),
  }),
  services: z.string().min(10, 'Services description must be at least 10 characters'),
  contact: z.string().regex(/^[\w.-]+@[\w.-]+\.\w+$|^\+?\d[\d\s-]{10,}$/, 'Valid email or phone required'),
  price: z.number().positive('Price must be greater than 0'),
  status: z.number().int().min(1).max(3),
  referLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverImageFile: z.any()
    .refine((files: FileList | undefined) => files && files.length === 1, 'Cover image is required')
    .refine((files: FileList | undefined) => files && files[0]?.type.startsWith('image/'), 'Must be an image')
    .refine((files: FileList | undefined) => files && files[0]?.size <= 5 * 1024 * 1024, 'Max 5MB'),
  galleryFiles: z.any()
    .refine((files: FileList | undefined) => !files || files.length <= 10, 'Maximum 10 gallery images')
    .refine((files: FileList | undefined) => !files || [...files].every(f => f.type.startsWith('image/')), 'All files must be images')
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const initialData: IPhotoAndVideoDocument[] = [
  // ... (your initial data unchanged)
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
  // ... other entries unchanged
];

const LIMIT = 5;

const getStatusBadge = (status: number) => {
  const styles: { [key: number]: string } = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-amber-100 text-amber-800',
    3: 'bg-red-100 text-red-800',
  };
  const labels: { [key: number]: string } = { 1: 'Active', 2: 'Busy', 3: 'Booked' };
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{labels[status] || 'Unknown'}</span>;
};

const AddModal = ({ 
  open, 
  onClose, 
  onSubmit 
}: { 
  open: boolean; 
  onClose: () => void; 
  onSubmit: (data: FormData) => Promise<void> 
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue, clearErrors } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 1,
      price: undefined,
    }
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ type: 'Point'; coordinates: [number, number]; text: string } | null>(null);

  const coverFile = watch('coverImageFile');
  const galleryFiles = watch('galleryFiles');
  const coverPreview = coverFile && coverFile[0] ? URL.createObjectURL(coverFile[0]) : null;
  const galleryPreviews = galleryFiles ? Array.from(galleryFiles).map((f:any) => URL.createObjectURL(f)) : [];

  const onFormSubmit = async (data: FormData) => {
    setSubmitError(null);
    clearErrors();
    try {
      await onSubmit(data);
      reset();
      setLocation(null);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to add service.');
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setLocation(null);
      setSubmitError(null);
    }
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-5">
          {submitError && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
              <input {...register('serviceBy')} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.serviceBy && <p className="mt-1 text-xs text-red-600">{errors.serviceBy.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider Name *</label>
              <input {...register('provider')} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.provider && <p className="mt-1 text-xs text-red-600">{errors.provider.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (City in India) *</label>
              <GeoapifyAutocomplete
                value={location?.text || ''}
                onChange={(loc) => {
                  setLocation(loc);
                  setValue('location', loc, { shouldValidate: true });
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">Location is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (per day) *</label>
              <input 
                type="number" 
                {...register('price', { valueAsNumber: true })} 
                placeholder="1500"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select {...register('status', { valueAsNumber: true })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={1}>Active</option>
                <option value={2}>Busy</option>
                <option value={3}>Booked</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Services Offered *</label>
              <textarea {...register('services')} rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              {errors.services && <p className="mt-1 text-xs text-red-600">{errors.services.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact (Email/Phone) *</label>
              <input {...register('contact')} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.contact && <p className="mt-1 text-xs text-red-600">{errors.contact.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference Link (optional)</label>
              <input {...register('referLink')} placeholder="https://example.com" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.referLink && <p className="mt-1 text-xs text-red-600">{errors.referLink.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image * (Max 5MB)</label>
              <input 
                type="file" 
                accept="image/*" 
                {...register('coverImageFile')} 
                className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {errors.coverImageFile && <p className="mt-1 text-xs text-red-600">{(errors.coverImageFile as any)?.message}</p>}
              {coverPreview && (
                <img src={coverPreview} alt="Cover preview" className="mt-3 w-full max-h-64 object-cover rounded-lg shadow" />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images (Optional, up to 10)</label>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                {...register('galleryFiles')} 
                className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {errors.galleryFiles && <p className="mt-1 text-xs text-red-600">{(errors.galleryFiles as any)?.message}</p>}
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {galleryPreviews.map((src, i) => (
                    <img key={i} src={src} alt={`Gallery ${i+1}`} className="h-24 object-cover rounded-lg shadow" />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              {isSubmitting && <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>}
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
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const start = (currentPage - 1) * LIMIT;
    const paginated = allServices.slice(start, start + LIMIT);
    setServices(paginated);
    setTotalPages(Math.ceil(allServices.length / LIMIT));
  };

  const handleAdd = async (formData: FormData) => {
    const coverUrl = URL.createObjectURL(formData.coverImageFile[0]);
    const maxId = Math.max(...allServices.map(s => s._id as number), 0);

    const newService: IPhotoAndVideoDocument = {
      _id: maxId + 1,
      serviceBy: formData.serviceBy,
      provider: formData.provider,
      location: formData.location.text,
      services: formData.services,
      contact: formData.contact,
      price: `$${formData.price}/day`,
      status: formData.status,
      referLink: formData.referLink || '',
      coverImage: coverUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setAllServices(prev => [...prev, newService]);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, allServices.length]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photography & Videography Services</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all registered service providers in India</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
          </div>
        </div>
      </div>

      {/* Table/Card View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full hidden md:table">
            <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Provider</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Cover</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{s.serviceBy}</td>
                  <td className="px-6 py-4 text-gray-600">{s.provider}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-1"><MapPin size={14} /> {s.location}</td>
                  <td className="px-6 py-4 font-medium">{s.price}</td>
                  <td className="px-6 py-4">{getStatusBadge(s.status)}</td>
                  <td className="px-6 py-4"><img src={s.coverImage} alt="cover" className="w-16 h-16 object-cover rounded-lg shadow" /></td>
                  <td className="px-6 py-4 text-right"><MoreVertical size={18} className="text-gray-400 hover:text-gray-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {services.map((s) => (
              <div key={s._id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{s.serviceBy}</h4>
                    <p className="text-sm text-gray-600">{s.provider}</p>
                  </div>
                  {getStatusBadge(s.status)}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500"><MapPin size={14} /> {s.location}</div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{s.price}</span>
                  <img src={s.coverImage} alt="cover" className="w-20 h-20 object-cover rounded-lg shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t flex justify-center gap-3 text-sm">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200">Previous</button>
            <span className="flex items-center px-3 text-gray-600">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200">Next</button>
          </div>
        )}
      </div>

      <AddModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
};

export default Photography;