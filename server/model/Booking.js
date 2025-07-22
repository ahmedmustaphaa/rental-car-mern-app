import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car", // مرجع للسيارة
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // المستخدم اللي حجز
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // صاحب السيارة
    required: true,
  },
  pickupDate: {
    type: Date, // تاريخ الاستلام
    required: true,
  },
  returnDate: {
    type: Date, // تاريخ الإرجاع
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
    // الحالة: قيد الانتظار، مؤكد، مكتمل، ملغي
  },
  totalPrice: {
    type: Number, // السعر الإجمالي للحجز
    required: true,
  }
}, { timestamps: true });

export const Booking = mongoose.model("booking", bookingSchema);
