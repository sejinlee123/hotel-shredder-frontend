import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PaymentForm from "./PaymentForm";
import ApiService from "../../service/ApiService";

const PaymentPage = () => {
  const {bookingReference, amount} = useParams();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const paymentData = {bookingReference, amount};
        const uniquePaymentSecret =
          await ApiService.proceedForPayment(paymentData);
        setClientSecret(uniquePaymentSecret);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchClientSecret();
  }, [bookingReference, amount]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const stripePromise = loadStripe(stripePublicKey);

  const handlePaymentStatus = async (
    paymentStatus,
    transactionId = "",
    failureReason = "",
  ) => {
    try {
      const paymentData = {
        bookingReference,
        amount,
        transactionId,
        success: paymentStatus === "succeeded",
        failureReason,
      };

      await ApiService.updateBookingPaymeent(paymentData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-page">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
        <PaymentForm
          clientSecret={clientSecret}
          amount={amount}
          onPaymentSuccess={(transactionId) => {
            setPaymentStatus("succeeded");
            handlePaymentStatus("succeeded", transactionId);
            navigate(`/payment-success/${bookingReference}`);
          }}
          onPaymentError={(error) => {
            setPaymentStatus("failed");
            handlePaymentStatus("failed", "", error.message);
            navigate(`/payment-failed/${bookingReference}`);
          }}
        />
      </Elements>
      )}

      {paymentStatus && <div>Payment Status: {paymentStatus}</div>}
    </div>
  );
};

export default PaymentPage;
