import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleMockPayment = () => {
    // In real app integrate Razorpay/Stripe
    toast.success("Payment successful!");
    navigate(`/ticket/${bookingId}`);
  };

  return (
    <div className="container-page py-10 flex justify-center">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <h1 className="text-xl font-semibold mb-2 text-slate-900">Payment</h1>
        <p className="text-sm text-slate-500 mb-6">
          This is a demo payment screen. Click below to simulate a successful payment.
        </p>
        <button
          onClick={handleMockPayment}
          className="w-full rounded-xl bg-slate-900 text-white text-sm font-semibold py-2.5 hover:bg-slate-800 transition"
        >
          Simulate Successful Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
