import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
    res.json({success:false,message:"User does not exit"})
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
export { registerUser ,loginUser};