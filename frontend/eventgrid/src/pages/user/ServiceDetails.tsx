import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Calendar as CalendarIcon, User } from "lucide-react";
import Calendar from "react-calendar"; // Assuming installed: npm install react-calendar
import "react-calendar/dist/Calendar.css"; // Basic styles, can customize
import { addDays, isBefore, isSameDay, format } from "date-fns"; // Assuming installed: npm install date-fns
import { createRazorpayOrder, getServiceById, verifyPayment, 
// getBookedDates, 
} from "../../services/apis/userApi";

import { useRazorpay } from "react-razorpay"; // Assuming installed: npm install react-razorpay
import { useSelector } from "react-redux";
import type { IUser } from "../../interfaces/user";



const DUMMY_BOOKED_DATES = [
  new Date("2026-01-11"),
  new Date("2026-01-21"),
  new Date("2026-01-30"),
]; // Example booked dates

interface RootState {
  user: { user: IUser };
};


export function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const { Razorpay } = useRazorpay();
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_ID;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const serviceData = await getServiceById(serviceId || "");

        console.log("service data is ",serviceId);
        setService(serviceData);
        // const booked = await getBookedDates(serviceId);
        // setBookedDates(booked.map((d: string) => new Date(d)));

        // Use dummy for now
        // setService(DUMMY_SERVICE);
        setBookedDates(DUMMY_BOOKED_DATES);
      } catch (err: any) {
        setError(err.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

  const minBookingDate = addDays(new Date(), 4);

  const isDateDisabled = ({ date }: { date: Date }) => {
    return (
      isBefore(date, minBookingDate) ||
      bookedDates.some((booked) => isSameDay(booked, date))
    );
  };

  const handleBook = async () => {
    if (!selectedDate || isDateDisabled({ date: selectedDate })) return;

    setBookingLoading(true);
    try {
      // Create Razorpay order with amount in paisa, serviceId, and selectedDate
      const order = await createRazorpayOrder({
        amount: service.bookingPrice * 100, // Convert to paisa
        serviceId: serviceId || "",
        selectedDate: format(selectedDate, "yyyy-MM-dd"),
        userId: user._id
      });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Eventgrid",
        description: `Payment for booking ${service.serviceName}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              // Navigate to success page with bookingId
              navigate(`/booking-success/${verifyRes.bookingId}`);
            } else {
              navigate("/booking-failed");
            }
          } catch (err: any) {
            navigate("/booking-failed");
          }
        },
        prefill: {
          name: "John Doe", // Replace with actual user data (e.g., from context or auth)
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: "Razorpay Corporate Office",
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            navigate("/booking-failed");
          },
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();

      // Handle payment failure event
      rzpay.on("payment.failed", function () {
        navigate("/booking-failed");
      });
    } catch (err: any) {
      setError(err.message || "Failed to initiate payment");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="bg-red-50 p-6 rounded-xl text-center">{error || "Service not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .react-calendar { width: 100%; border: none; background: white; border-radius: 1rem; padding: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .react-calendar__tile--disabled { background: #f5f5f5; color: #ccc; }
        .react-calendar__tile--active { background: #f97316 !important; color: white !important; }
      `}</style>

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.serviceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-2">{service.serviceName}</h1>
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {service.location}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-orange-400 fill-orange-400" /> 4.8 (124 reviews)
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <section>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-stone-600 leading-relaxed">{service.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Provider Information</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-orange-500" />
                  <span className="font-medium">Provider: {service.providerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-orange-500" />
                  <span>{service.contact}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-orange-500" />
                  <span>{service.location}</span>
                </div>
              </div>
            </section>

            {/* Add more sections like reviews, etc. if needed */}
          </motion.div>

          {/* Right Column: Booking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Book This Service</h2>
              <div className="mb-6">
                <span className="text-3xl font-bold text-stone-900">₹{service.price.toLocaleString()}</span>
                <span className="text-sm text-stone-500"> / event</span>
              </div>
              <div className="mb-6">
                <p className="text-sm text-stone-600 mb-2">Booking Deposit: ₹{service.bookingPrice.toLocaleString()}</p>
                <p className="text-xs text-stone-500">Refundable under certain conditions</p>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 font-medium mb-4">
                  <CalendarIcon size={20} className="text-orange-500" />
                  Select Date
                </label>
                <Calendar
                  onChange={(value) => setSelectedDate(value as Date)}
                  value={selectedDate}
                  minDate={minBookingDate}
                  tileDisabled={isDateDisabled}
                  className="w-full"
                />
                <p className="text-xs text-stone-500 mt-2">
                  Available dates are selectable. Minimum 4 days in advance.
                </p>
              </div>

              <button
                onClick={handleBook}
                disabled={!selectedDate || bookingLoading || isDateDisabled({ date: selectedDate })}
                className="w-full py-4 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {bookingLoading ? "Booking..." : "Book Now"}
              </button>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="font-display font-bold text-xl">
              EVENT<span className="text-orange-500">GRID</span>
            </span>
          </div>
          <p className="text-sm">© 2024 EventGrid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}