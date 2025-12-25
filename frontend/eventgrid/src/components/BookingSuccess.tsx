// components/BookingSuccess.tsx (New file - add to routes as /booking-success/:bookingId)
import { useNavigate, useParams } from "react-router-dom";
// Optionally, fetch booking details using bookingId

export function BookingSuccess() {
  
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h1>
        <p className="text-lg">Your booking ID is: <strong>{bookingId}</strong></p>
        <p className="mt-2">Thank you for booking with EventGrid. You will receive a confirmation email shortly.</p>
        <button onClick={()=> navigate('/home') } className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-red-700">
          Continue</button>
      </div>
    </div>
  );
}