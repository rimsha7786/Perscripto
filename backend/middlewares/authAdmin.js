import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.token;

        console.log("TOKEN EXISTS:", !!token);

        if (!token) {
            return res.json({
                success: false,
                message: "Authentication failed - token missing",
            });
        }

        const token_decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("TOKEN EMAIL:", token_decoded.email);
        console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);

        if (token_decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "Authentication failed - invalid admin",
            });
        }

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.json({
            success: false,
            message: "Authentication failed",
        });
    }
};

export default authAdmin;