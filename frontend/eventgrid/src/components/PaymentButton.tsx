import { useRazorpay } from "react-razorpay";
import { createRazorpayOrder } from "../services/apis/userApi";



export default function PaymentButton() {
  
  const { Razorpay } = useRazorpay();
  
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_ID;

  const handlePayment = async () => {
    try {
      // Make the API call to backend
      const response = await fetch("http://localhost:3001/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 5000 }),
      });

      const order = await response.json();
      console.log(order)
    // add option for the payment gateway it can be dynamic if you want 
    // we can use prop drilling to make it dynamic
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Eventgrid", // Add company details
        description: "Payment for your booking", // Add order details
        order_id: order.id,
        // this is make function which will verify the payment
        // after making the payment 
        handler: async (response:any) => {
          try {
            await fetch("http://localhost:3001/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            // Add onPaymentSuccessfull function here
            alert("Payment successful!");
          } catch (err:any) {
            // Add onPaymentUnSuccessfull function here
            alert("Payment failed: " + err.message);
          }
        },
        prefill: {
          name: "John Doe", // add customer details
          email: "john@example.com", // add customer details
          contact: "9999999999", // add customer details
        },
        notes: "Razorpay Corporate Office",
        theme: {
    // you can change the gateway color from here according to your
    // application theme
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      // this will open razorpay window for take the payment in the frontend
      // under the hood it use inbuild javascript windows api 
      rzpay.open();
    } catch (err:any) {
      alert("Error creating order: " + err.message);
    }
  };

  return <button onClick={handlePayment}>Pay with Razorpay</button>;
}