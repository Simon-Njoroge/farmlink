import React, {useState,useEffect}from "react";
import Sidebar from "../../components/rentdashboard/sidenav";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Dashboard = () => {
  const [equipments, setEquipments] = useState([]);
  const fetchEquipments = async () => {
    try {
      const response = await axios.get(`${api}/all-equipments`);
      setEquipments(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Sample Data
  const data = [
    { name: "Jan", bookings: 30 },
    { name: "Feb", bookings: 40 },
    { name: "Mar", bookings: 50 },
    { name: "Apr", bookings: 20 },
    { name: "May", bookings: 60 },
  ];

  return (
    <div className="d-flex" style={{ overflowY: "auto", flex: 1, maxHeight: "100vh" , overflowY: "auto",maxHeight: "100vh",paddingBottom: "50px", marginBottom: "auto" }}>
     

      {/* Main Content */}
      <div className="container-fluid p-4" style={{ overflowY: "auto", flex: 1, maxHeight: "100vh" }}>
        <h2 className="mb-4">Dashboard</h2>
        
        {/* Metrics Section */}
        <div className="row">
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Total Equipment</h5>
              <h3>{}</h3>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Active Bookings</h5>
              <h3>{}</h3>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="p-3 text-center shadow">
              <h5>Total Revenue</h5>
              <h3>Ksh {}</h3>
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
