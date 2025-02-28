import React from "react";
import { Link } from "react-router-dom";
const STKPushConfirm = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614977645968-6db1d7798ac7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybSUyMG1hY2hpbmVyeXxlbnwwfHwwfHx8MA%3D%3D')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="card shadow-lg text-center p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <img src="https://www.safaricom.co.ke/images/SAF-MAIN-LOGO.png" alt="Safaricom Logo" className="mb-3" width="150" />
          <h4 className="text-success">STK Push Sent</h4>
          <p className="text-muted">
            A payment request has been sent to your mobile device. Enter your M-Pesa PIN to complete the transaction.
          </p>
          <button className="btn btn-success w-100 mb-3">OK</button>
          <Link to='/en-us/authenticated/dashboard/Bookings'><a  className="btn btn-outline-secondary w-100">Back to Booking</a></Link>
        </div>
      </div>
    </div>
  );
};

export default STKPushConfirm;
