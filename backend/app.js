require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createHttpError = require("http-errors");
const globalErrorHandler = require("./middleware/globalErrorHandler");

// Create Express App
const app = express();
const PORT = config.port;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
//app.use(express.json());
//app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:5175',
  'https://restaurant-project-gold.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use CORS
//app.use(cors(corsOptions));

// ✅ Handle Preflight Requests Explicitly
app.options('*', cors(corsOptions));

// ✅ Health Check Endpoint
app.get("/", (req, res) => {
  res.json({ message: "hello from POS server!" });
});

// ✅ API Routes
//app.use("/api/user", require("./routes/userRoutes"));
//app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/table", require("./routes/tableRoute"));
// app.use("/api/payment", require("./routes/payementRoute"));

// ✅ Global Error Handler
//app.use(globalErrorHandler);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`POS Server is listening on port ${PORT}`);
});
