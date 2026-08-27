import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

 const token_decoded = jwt.verify(
  atoken,
  process.env.JWT_SECRET
);

req.userId = token_decoded.id;

console.log("USER ID FROM TOKEN:", req.userId);

next();

  } catch (err) {
    console.log("AUTH ERROR:", err);

    return res.json({
      success: false,
      message: "Not Authorized. Login Again",
    });
  }
};

export default authUser;