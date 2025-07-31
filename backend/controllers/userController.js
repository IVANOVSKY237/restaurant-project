const createHttpError = require("http-errors");
const User = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            return next(createHttpError(400, "All fields are required!"));
        }

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            return next(createHttpError(400, "User already exists!"));
        }

        // Create new user - password will be automatically hashed by the pre-save hook
        const newUser = new User({ name, phone, email, password, role });
        await newUser.save();

        // Remove password from response data
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "New user created successfully!",
            data: userResponse,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        console.log("🔍 Login attempt received");
        console.log("📧 Request body:", req.body);

        const { email, password } = req.body;
        console.log("📧 Extracted email:", email);
        console.log("🔒 Password provided:", !!password);

        if (!email || !password) {
            console.log("❌ Missing email or password");
            return next(createHttpError(400, "Email and password are required!"));
        }

        const user = await User.findOne({ email });
        console.log("👤 User found:", !!user);
        if (!user) {
            console.log("❌ User not found for email:", email);
            return next(createHttpError(400, "Invalid credentials!"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔐 Password match:", isMatch);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return next(createHttpError(400, "Invalid credentials!"));
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            config.accessTokenSecret,
            { expiresIn: "1d" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        // Remove password from response data
        const userResponse = user.toObject();
        delete userResponse.password;

        console.log("✅ Login successful, sending response");
        res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            data: userResponse,
            token: accessToken
        });
    } catch (error) {
        console.log("💥 Login error:", error);
        next(error);
    }
};

const getUserData = async (req, res, next) => {
    try {
        // Check if user is authenticated (middleware should set req.user)
        if (!req.user) {
            return next(createHttpError(401, "User not authenticated"));
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "User data retrieved successfully",
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getUserData, logout };
