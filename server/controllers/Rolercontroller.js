import imagekit from "../config/imagekit.js"
import Car from "../model/Car.js"
import User from "../model/User.js"
import {Booking} from '../model/Booking.js'
import fs from 'fs'



export const  changeRoleToOwner=async (req,res)=>{

    try{

        const {_id}=req.user
        const ChnageRole=await User.findByIdAndUpdate(_id,{role:"owner"})
        
        res.json({success:true,message:"now you can list cart"})

    }catch(error){
        console.log(error)
        res.send({success:false,message:error.message})
    }
}


export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // رفع الصورة على ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/cars',
    });

    // إنشاء رابط مخصص ومحسّن للصورة
    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { height: '1200' },
        { quality: 'auto' },
        { format: 'webp' },
      ],
    });

    // إضافة السيارة لقاعدة البيانات
    const newCar = new Car({
      ...car,
      image: optimizedImageUrl,
      owner: _id,
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: 'Car added successfully',
      car: savedCar,
    });
  } catch (error) {
    console.error('Error in addCar:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getOwnerCar = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const cars = await Car.find({ owner: ownerId });

    res.status(200).json({
      success: true,
      message: "Owner's cars fetched successfully",
      cars,
    });

  } catch (error) {
    console.error("Error in getOwnerCar:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleCar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // التحقق من الملكية
    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // عكس حالة التوفر
    car.isAvailable = !car.isAvailable;

    // حفظ التغييرات
    await car.save();

    res.status(200).json({
      success: true,
      message: `Car availability toggled to ${car.isAvailable}`,
      car,
    });

  } catch (error) {
    console.error("Error in toggleCar:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



// import Booking from "../models/Booking.js" // لو عندك موديل للحجوزات


export const DashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // بيانات عامة
    const totalCars = await Car.countDocuments();
    const availableCars = await Car.countDocuments({ isAvailable: true });
    const myCars = await Car.countDocuments({ owner: userId });
    const totalUsers = await User.countDocuments();

    // ✅ حساب أرباح الشهر الحالي:
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const bookingsThisMonth = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const monthlyRevenue = bookingsThisMonth[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        totalCars,
        availableCars,
        myCars,
        totalUsers,
        monthlyRevenue, // ⬅️ أضفناها هنا
      },
    });
  } catch (error) {
    console.error("Error in DashboardData:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const softDeleteCar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this car" });
    }

    // ✅ Soft delete without removing owner
    car.isAvailable = false;
    car.isDeleted = true;

    await car.save();

    res.status(200).json({
      success: true,
      message: "Car soft-deleted successfully",
      car,
    });

  } catch (error) {
    console.error("Error in softDeleteCar:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
