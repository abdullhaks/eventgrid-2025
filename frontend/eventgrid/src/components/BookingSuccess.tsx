// components/BookingSuccess.tsx (New file - add to routes as /booking-success/:bookingId)
import { useParams } from "react-router-dom";
// Optionally, fetch booking details using bookingId

export function BookingSuccess() {
  const { bookingId } = useParams<{ bookingId: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h1>
        <p className="text-lg">Your booking ID is: <strong>{bookingId}</strong></p>
        <p className="mt-2">Thank you for booking with EventGrid. You will receive a confirmation email shortly.</p>
        {/* Optional: Add button to download receipt - call a backend API to generate PDF */}
      </div>
    </div>
  );
}