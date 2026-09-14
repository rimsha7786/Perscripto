import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { json } from "express";
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking missing details
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email",
      });
    }

    // Validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password",
      });
    }

    // Checking if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating user data
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Saving user in database
    const newUser = new userModel(userData);
    await newUser.save();

    // Creating JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};


const loginUser = async(req,res)=>{
  try{


    const {email,password} = req.body
    const user = await userModel.findOne({email}) 
  
  if (!user) {
  return res.json({ success: false, message: "User does not exist" });
}
  const isMatch = await bcrypt.compare(password, user.password);

if (isMatch) {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );
    res.json({success:true,token})
}
else{
  res.json({
    success: false,
    message: "Invalid credentials"
});
}

  }
  catch(error){

    console.log(error)
    res.json({success:false,message:error.message})
  }
}

//api to get user profile data

const getProfile = async (req,res) =>{

try{
const userId = req.userId;
const userData = await userModel.findById(userId).select('-password')

res.json({success:true,userData})



}
catch (error) {

console.log(error)
res.json({success:false,message:error.message})



}





}

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    // Get user ID from token
    const userId = req.userId;

    // Find doctor
    const docData = await doctorModel
      .findById(docId)
      .select("-password");

    // Check doctor exists
    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found"
      });
    }

    // Check doctor availability
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available"
      });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]) {

      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot is not available"
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }

    } else {

      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);

    }

    // Get user data
    const userData = await userModel
      .findById(userId)
      .select("-password");

    const docDataObj = docData.toObject();

    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData: docDataObj,
      amount: docData.fees,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked
    });

    res.json({
      success: true,
      message: "Appointment Booked Successfully"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};
 
const listAppointments = async (req, res) => {
  try {

    const userId = req.userId;

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 });

    res.json({
      success: true,
      appointments
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};









export { registerUser, loginUser, getProfile, updateProfile, bookAppointment,listAppointments };