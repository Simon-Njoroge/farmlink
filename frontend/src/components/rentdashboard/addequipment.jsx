import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { api } from "../navbar";

const AddEquipment = () => {
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_day: "",
    location: "",
    available: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("User is not logged in!");
      return;
    }

    const url = `${api}/all-equipments/`;

    const data = new FormData();
    data.append("owner", user.id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price_per_day", formData.price_per_day);
    data.append("location", formData.location);
    data.append("available", formData.available);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to add equipment");
      }

      toast.success("Equipment added successfully!");
      setFormData({
        name: "",
        description: "",
        price_per_day: "",
        location: "",
        available: true,
        image: null,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3 mb-4 text-success">Add New Equipment</h2>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 bg-white shadow-sm p-4 rounded">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="text"
                name="name"
                placeholder="Equipment Name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-12">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>

            <div className="col-md-6">
              <input
                type="number"
                name="price_per_day"
                placeholder="Price Per Day"
                value={formData.price_per_day}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-12 d-flex align-items-center">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="form-check-input me-2"
              />
              <label>Available</label>
            </div>

            <div className="col-12">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn w-100 text-white"
                style={{ backgroundColor: "#228B22" }}
              >
                Add Equipment
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddEquipment;
