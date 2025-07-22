import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/Appcontext";
import ClipLoader from "react-spinners/ClipLoader";

function AddCar() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "2025",
    price: "100",
    category: "",
    transmission: "",
    fuelType: "",
    seats: "5",
    location: "",
    description: "",
  });

  const { token } = useAppContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload a car image.");
      return;
    }

    setLoading(true);

    const carData = {
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      category: formData.category,
      seating_capacity: formData.seats,
      fuel_type: formData.fuelType.toLowerCase(),
      transmission: formData.transmission,
      pricePerDay: formData.price,
      location: formData.location,
      description: formData.description,
      isAvailable: true,
    };

    const data = new FormData();
    data.append("image", image);
    data.append("carData", JSON.stringify(carData));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/owner/add-cars`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("🚗 Car added successfully!");
       setFormData({
        brand: '',
        model: '',
        year: '',
        price: '',
        category: '',
        transmission: '',
        seats: '',
        fuelType: '',
        location: '',
        description: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F1F5F9] pt-8">
    <form
      onSubmit={handleSubmit}
      className=" max-w-5xl mx-auto bg-white p-6 sm:p-10 border border-gray-200 rounded-xl shadow-lg mt-10 space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">🚗 List Your Car</h2>
        <p className="text-gray-500 mt-2">
          Fill out the form below to list your car for rent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Car Image
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center hover:shadow-md overflow-hidden">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Car"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">Click to upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {["brand", "model", "year", "price", "category", "transmission", "seats"].map((name) => (
            <div key={name} className="space-y-1">
              <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <input
                type={name === "year" || name === "price" || name === "seats" ? "number" : "text"}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Fuel Type Select */}
          <div className="space-y-1">
            <label htmlFor="fuelType" className="text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select
              name="fuelType"
              id="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Select Fuel Type --</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Select Location --</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your car, condition, features, etc."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition relative min-w-[140px]"
        >
          {loading ? <ClipLoader size={22} color="#fff" /> : "+ Add Car"}
        </button>
      </div>
    </form>
    </div>
  );
}

export default AddCar;