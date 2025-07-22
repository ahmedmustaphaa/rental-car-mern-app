import Car from "../model/Car.js";
import { Booking } from "../model/Booking.js";

// ✅ 1. Check if a car is available in a given date range
export const checkavailablit = async (carId, pickupDate, returnDate) => {
  const overlappingBookings = await Booking.find({
    car: carId,
    $or: [
      {
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
      },
    ],
  });

  return overlappingBookings.length === 0;
};

// ✅ 2. Get available cars in a location for a given date range
export const checkAvailabilityOfcar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "location, pickupDate, and returnDate are required",
      });
    }

    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkavailablit(
        car._id,
        new Date(pickupDate),
        new Date(returnDate)
      );
      return {
        ...car._doc,
        isAvailable,
      };
    });

    const availableCars = await Promise.all(availableCarsPromise);

    const filtered = availableCars.filter((car) => car.isAvailable);

    res.status(200).json({
      success: true,
      cars: filtered,
      message:
        filtered.length > 0
          ? "Available cars found"
          : "No available cars in this location",
    });
  } catch (error) {
    console.error("Error in checkAvailabilityOfcar:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;
    const userId = req.user._id;

    if (!carId || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "carId, pickupDate, and returnDate are required",
      });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const isAvailable = await checkavailablit(
      carId,
      new Date(pickupDate),
      new Date(returnDate)
    );

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available for the selected dates",
      });
    }

    // ✅ احسب عدد الأيام
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    // ✅ احسب السعر الإجمالي
    const totalPrice = days * car.pricePerDay;

    const booking = await Booking.create({
  user: userId,
  car: carId,
  owner: car.owner, // ✅ أضف هذا السطر
  pickupDate: start,
  returnDate: end,
  totalPrice,
  status: "confirmed",
});


    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error in createBooking:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 4. Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
  .populate("car") // <-- صح

      .populate("user", "name email");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error in getUserBookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // أول حاجة نجيب كل العربيات اللي المالك بيملكها
    const ownerCars = await Car.find({ owner: ownerId });

    const carIds = ownerCars.map(car => car._id);

    // نجيب كل الحجوزات المرتبطة بالعربيات دي
    const bookings = await Booking.find({ car: { $in: carIds } })
      .populate("user", "name email")   // معلومات المستخدم اللي حجز
      .populate("car", "brand model location") // معلومات العربية
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Owner bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error in getOwnerBookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Change booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const { status } = req.body;

    const allowedStatuses = ["confirmed", "cancelled", "completed", "pending"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("car", "brand model");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateUserImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User image updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserImage:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};