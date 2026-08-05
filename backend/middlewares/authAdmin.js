import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Authentication failed",
      });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Authentication failed",
      });
    }

    next();

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authAdmin;