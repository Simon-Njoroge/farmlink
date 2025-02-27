import React from "react";
import Sidebar from "../../components/rentdashboard/sidenav";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  // Sample Data
  const data = [
    { name: "Jan", bookings: 30 },
    { name: "Feb", bookings: 40 },
    { name: "Mar", bookings: 50 },
    { name: "Apr", bookings: 20 },
    { name: "May", bookings: 60 },
  ];

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
     

      {/* Main Content */}
      <div className="container-fluid p-4" style={{ overflowY: "auto", flex: 1, maxHeight: "100vh" }}>
        <h2 className="mb-4">Dashboard</h2>
        
        {/* Metrics Section */}
        <div className="row">
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Total Equipment</h5>
              <h3>120</h3>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Active Bookings</h5>
              <h3>45</h3>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Total Revenue</h5>
              <h3>Ksh 150,000</h3>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mt-4">
          <div className="col-md-12">
            <Card className="p-4 shadow">
              <h5>Monthly Bookings</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#228B22" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
