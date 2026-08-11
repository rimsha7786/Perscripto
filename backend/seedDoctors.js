import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import doctorModel from "./models/doctorModel.js";

const rawDoctors = [
  { name: "Dr. Richard James", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Emily Larson", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Sarah Patel", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Christopher Lee", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Jennifer Garcia", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Andrew Williams", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Christopher Davis", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Timothy White", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Ava Mitchell", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Jeffrey King", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Zoe Kelly", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Patrick Harris", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Chloe Evans", speciality: "General physician", degree: "MBBS", experience: "4 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 50, address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Ryan Martinez", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 60, address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Amelia Hill", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 30, address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" } },
  { name: "Dr. Christopher Lee", speciality: "Gastroenterologist", degree: "MBBS", experience: "2 Years", about: "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 40, address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" } },
];

const buildDoctorDocs = async () => {
  const defaultPassword = "Doctor@123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  return rawDoctors.map((doc, index) => ({
    name: doc.name,
    email: `${doc.name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "")}.${index}@example.com`,
    password: hashedPassword,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random&size=256&bold=true`,
    speciality: doc.speciality,
    degree: doc.degree,
    experience: doc.experience,
    about: doc.about,
    available: true,
    fees: doc.fees,
    address: doc.address,
    date: Date.now(),
    slot_booked: {},
  }));
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const doctorDocs = await buildDoctorDocs();

    for (const doc of doctorDocs) {
      const exists = await doctorModel.findOne({ email: doc.email });
      if (exists) {
        console.log(`Skipping (already exists): ${doc.name}`);
        continue;
      }
      await doctorModel.create(doc);
      console.log(`Inserted: ${doc.name}`);
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();