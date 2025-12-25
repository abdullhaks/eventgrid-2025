// components/BookingFailed.tsx (New file - add to routes as /booking-failed)
export function BookingFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Booking Failed</h1>
        <p className="text-lg">We're sorry, but your payment could not be processed.</p>
        <p className="mt-2">Please try again or contact support if the issue persists.</p>
      </div>
    </div>
  );
}