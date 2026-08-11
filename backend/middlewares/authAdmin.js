import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        console.log("TOKEN EXISTS:", !!token);
        console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
        console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);

        if (!token) {
            return res.json({
                success: false,
                message: "Authentication failed",
            });
        }

        const token_decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("TOKEN EMAIL:", token_decoded.email);
        console.log("ENV ADMIN EMAIL:", process.env.ADMIN_EMAIL);

        if (token_decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "Authentication failed",
            });
        }

        next();

    } catch (err) {
        console.log("AUTH ERROR:", err);

        return res.json({
            success: false,
            message: "Authentication failed",
        });
    }
};

export default authAdmin;