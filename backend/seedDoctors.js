import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import doctorModel from "./models/doctorModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const FRONTEND_ASSETS_PATH = "../frontend/src/assets";

const rawDoctors = [
  { imageFile: "doc1.png", name: "Dr. Richard James", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc2.png", name: "Dr. Emily Larson", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc3.png", name: "Dr. Sarah Patel", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc4.png", name: "Dr. Christopher Lee", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc5.png", name: "Dr. Jennifer Garcia", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc6.png", name: "Dr. Andrew Williams", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc7.png", name: "Dr. Christopher Davis", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc8.png", name: "Dr. Timothy White", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc9.png", name: "Dr. Ava Mitchell", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc10.png", name: "Dr. Jeffrey King", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc11.png", name: "Dr. Zoe Kelly", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc12.png", name: "Dr. Patrick Harris", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc13.png", name: "Dr. Chloe Evans", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc14.png", name: "Dr. Ryan Martinez", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc15.png", name: "Dr. Amelia Hill", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { imageFile: "doc4.png", name: "Dr. Christopher Lee", speciality: "Gastroenterologist", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
];

const uploadImage = async (fileName) => {
  const filePath = `${FRONTEND_ASSETS_PATH}/${fileName}`;
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
  });
  return result.secure_url;
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const defaultPassword = "Doctor@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    for (let index = 0; index < rawDoctors.length; index++) {
      const doc = rawDoctors[index];
      const email = `${doc.name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "")}.${index}@example.com`;

      let doctor = await doctorModel.findOne({ email });

      console.log(`Uploading image for ${doc.name} (${doc.imageFile})...`);
      const imageUrl = await uploadImage(doc.imageFile);

      if (doctor) {
        doctor.image = imageUrl;
        await doctor.save();
        console.log(`Updated image for existing doctor: ${doc.name}`);
      } else {
        await doctorModel.create({
          name: doc.name,
          email,
          password: hashedPassword,
          image: imageUrl,
          speciality: doc.speciality,
          degree: doc.degree,
          experience: doc.experience,
          about: doc.about,
          available: true,
          fees: doc.fees,
          address: doc.address,
          date: Date.now(),
          slot_booked: {},
        });
        console.log(`Inserted new doctor: ${doc.name}`);
      }
    }

    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

run();