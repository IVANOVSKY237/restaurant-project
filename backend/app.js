require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express");
const config = require("./config/config");
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require("./middleware/globalErrorHandler");
const cors = require("cors");

const app = express();
const PORT = config.port;

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS configuration (single, correct way)
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:5175',
  'https://restaurant-project-gold.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Root Endpoint
app.get("/", (req, res) => {
  res.json({ message: "hello from POS server!" });
});

// API Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/table", require("./routes/tableRoute"));
// app.use("/api/payment", require("./routes/payementRoute"));

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`POS Server is listening on port ${PORT}`);
});
