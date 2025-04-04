import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaTools, FaClipboardList, FaCreditCard, FaCog, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { clearUser,setUser } from '../../slices/userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const dispatch=useDispatch()
  const user = useSelector((state) => state.user);
  const Navigate=useNavigate()
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    Navigate("/en-us/auth/farmlink/login");
  };
  return (
<div
  className="d-flex flex-column flex-shrink-0 p-3 text-white">

      <h4 className="text-center">Farm Link</h4>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/en-us/authenticated/dashboard/equipments" className="nav-link text-white">
            <FaTools className="me-2" /> Book Equipment
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/en-us/authenticated/dashboard/Bookings" className="nav-link text-white">
            <FaClipboardList className="me-2" /> My Bookings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/en-us/authenticated/dashboard/Payment" className="nav-link text-white">
            <FaCreditCard className="me-2" /> Payment History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/en-us/authenticated/dashboard/setting" className="nav-link text-white">
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
      </ul>
      <hr />
      <button className="btn btn-light w-100 text-dark" onClick={handleLogout}>
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
