import React, { useState } from "react";
import Sidebar from "../../components/rentdashboard/sidenav";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars } from "react-icons/fa";

const Rentdashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{ overflowY: "hidden", width: "100%" }}
    >
      {/* Top Navbar */}
      <nav
        className="navbar navbar-light px-3 d-flex justify-content-between align-items-center shadow"
        style={{ backgroundColor: "#228B22", color: "#fff" }}
      >
        <button
          className="btn d-md-none text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={24} />
        </button>

        <span className="navbar-brand mb-0 h4 text-white">Farm Link</span>

        <span className="navbar-text text-white fw-bold">
          Welcome back, Simon! 👋
        </span>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar - Hidden on small screens */}
        <div
          style={{
            width: "250px",
            height: "100vh",
            backgroundColor: "#228B22",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "#fff #228B22",
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Rentdashboard;
