/**
 * seedDoctors.js
 *
 * assets.js ke sab doctors ko unki apni LOCAL image ke sath
 * admin API (/api/admin/add-doctor) ke through add karta hai.
 * Ye Cloudinary upload + MongoDB save khud (backend ke through) karega.
 *
 * ==================== SETUP ====================
 * 1. Is file ko apne backend folder ke andar rakhein
 *    (e.g. C:/perscripto/backend/seedDoctors.js)
 *
 * 2. Terminal me backend folder ke andar jayein aur install karein:
 *
 *      npm install axios form-data dotenv
 *
 * 3. Backend server already chal raha hona chahiye
 *
 * 4. Neeche IMAGE_DIR ko apne project ke hisab se set karein --
 *    ye wo folder hai jahan doc1.png, doc2.png ... doc15.png rakhi hain.
 *    Agar aapka structure C:/perscripto/frontend/src/assets/ hai to
 *    (assuming backend aur frontend sibling folders hain) default sahi hoga.
 *
 * 5. Run karein:
 *
 *      node seedDoctors.js
 *
 * =================================================
 */

import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// ---- APNA BACKEND PORT / URL YAHAN SET KAREIN ----
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

// ---- YAHAN APNE assets FOLDER KA PATH SET KAREIN ----
// jahan doc1.png, doc2.png ... doc15.png rakhi hain
const IMAGE_DIR =
  process.env.IMAGE_DIR || path.resolve("../frontend/src/assets");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const DEFAULT_PASSWORD = "Doctor@123"; // sab seeded doctors ka login password

// assets.js se pura doctors data (duplicate doc4 ko hata diya, taake unique email bane)
const doctorsToAdd = [
  { name: "Dr. Richard James", image: "doc1.png", speciality: "General physician", degree: "MBBS", experience: "4 Years", fees: 50, address1: "17th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Emily Larson", image: "doc2.png", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", fees: 60, address1: "27th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Sarah Patel", image: "doc3.png", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", fees: 30, address1: "37th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Christopher Lee", image: "doc4.png", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", fees: 40, address1: "47th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Jennifer Garcia", image: "doc5.png", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", fees: 50, address1: "57th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Andrew Williams", image: "doc6.png", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", fees: 50, address1: "57th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Christopher Davis", image: "doc7.png", speciality: "General physician", degree: "MBBS", experience: "4 Years", fees: 50, address1: "17th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Timothy White", image: "doc8.png", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", fees: 60, address1: "27th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Ava Mitchell", image: "doc9.png", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", fees: 30, address1: "37th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Jeffrey King", image: "doc10.png", speciality: "Pediatricians", degree: "MBBS", experience: "2 Years", fees: 40, address1: "47th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Zoe Kelly", image: "doc11.png", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", fees: 50, address1: "57th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Patrick Harris", image: "doc12.png", speciality: "Neurologist", degree: "MBBS", experience: "4 Years", fees: 50, address1: "57th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Chloe Evans", image: "doc13.png", speciality: "General physician", degree: "MBBS", experience: "4 Years", fees: 50, address1: "17th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Ryan Martinez", image: "doc14.png", speciality: "Gynecologist", degree: "MBBS", experience: "3 Years", fees: 60, address1: "27th Cross, Richmond", address2: "Circle, Ring Road, London" },
  { name: "Dr. Amelia Hill", image: "doc15.png", speciality: "Dermatologist", degree: "MBBS", experience: "1 Years", fees: 30, address1: "37th Cross, Richmond", address2: "Circle, Ring Road, London" },
];

const ABOUT_TEXT =
  "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.";

function makeEmail(name) {
  return (
    name
      .toLowerCase()
      .replace(/^dr\.\s*/, "")
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "") + "@example.com"
  );
}

async function getAdminToken() {
  const { data } = await axios.post(`${BACKEND_URL}/api/admin/login`, {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (!data.success) {
    throw new Error("Admin login failed: " + data.message);
  }

  return data.token;
}

async function addDoctor(token, doctor) {
  const imagePath = path.join(IMAGE_DIR, doctor.image);

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath}`);
  }

  const formData = new FormData();
  formData.append("name", doctor.name);
  formData.append("email", makeEmail(doctor.name));
  formData.append("password", DEFAULT_PASSWORD);
  formData.append("speciality", doctor.speciality);
  formData.append("degree", doctor.degree);
  formData.append("experience", doctor.experience);
  formData.append("about", ABOUT_TEXT);
  formData.append("fees", doctor.fees);
  formData.append(
    "address",
    JSON.stringify({ line1: doctor.address1, line2: doctor.address2 })
  );
  formData.append("image", fs.createReadStream(imagePath));

  const { data } = await axios.post(
    `${BACKEND_URL}/api/admin/add-doctor`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        token,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  );

  return data;
}

async function run() {
  console.log("Image folder:", IMAGE_DIR);
  console.log("Logging in as admin...");
  const token = await getAdminToken();
  console.log("Login successful. Adding doctors...\n");

  for (const doctor of doctorsToAdd) {
    try {
      console.log(`Adding ${doctor.name}...`);
      const result = await addDoctor(token, doctor);

      if (result.success) {
        console.log(`  [OK] ${doctor.name} added successfully`);
      } else {
        console.log(`  [FAIL] ${doctor.name} failed: ${result.message}`);
      }
    } catch (err) {
      console.log(
        `  [ERROR] ${doctor.name} error: ${err.response?.data?.message || err.message}`
      );
    }
  }

  console.log("\nDone. Admin panel / frontend refresh karke check karein.");
}

run().catch((err) => {
  console.error("Script failed:", err.message);
});