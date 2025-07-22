// models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  seating_capacity: { type: Number, required: true },
  fuel_type: {
    type: String,
    enum: ["petrol", "diesel", "electric", "hybrid"],
    required: true,
  },
  transmission: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }, // ✅ مضاف
}, {
  timestamps: true,
});


const Car = mongoose.model("Car", carSchema);

export default Car;
