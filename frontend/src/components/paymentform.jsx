import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.amount) {
      setAmount(location.state.amount);
    }
  }, [location.state]);

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    const formattedPhoneNumber = phoneNumber.replace(/^0/, "254");

    try {
      const response = await fetch("http://127.0.0.1:8000/pay/mpesa/stkpush/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formattedPhoneNumber,
          amount: amount,
        }),
      });

      const data = await response.json();
      if (data.ResponseCode === "0") {
        setMessage("STK Push sent. Check your phone!");
        pollPaymentStatus(data.CheckoutRequestID);
      } else {
        setMessage("Error: " + data.errorMessage);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const pollPaymentStatus = async (transactionId) => {
    let status = "Pending";
    while (status === "Pending") {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s

      const res = await fetch(
        `http://127.0.0.1:8000/pay/payment/status/${transactionId}/`
      );
      const data = await res.json();

      if (data.status === "Paid") {
        setMessage("Payment successful!");
        status = "Paid";
      } else if (data.status === "Not Found") {
        setMessage("Transaction not found. Please retry.");
        status = "Not Found";
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: "url('https://aspee.com/attachments/blogs/small-farm-mechanisation.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          maxWidth: "380px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <img
          src="https://www.safaricom.co.ke/images/SAF-MAIN-LOGO.png"
          alt="Safaricom"
          className="img-fluid d-block mx-auto mb-3"
          style={{ width: "120px" }}
        />
        <h2 className="text-center text-white mb-4" style={{ fontSize: "20px" }}>
          Make a Payment
        </h2>
        <div className="mb-3">
          <label className="form-label text-white" style={{ fontSize: "14px" }}>
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone Number (07...)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ fontSize: "14px", padding: "10px" }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white" style={{ fontSize: "14px" }}>
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ fontSize: "14px", padding: "10px" }}
          />
        </div>
        <button
          onClick={handlePayment}
          className="btn btn-success w-100"
          style={{ fontSize: "14px", textTransform: "uppercase" }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && (
          <div className="alert alert-success mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
