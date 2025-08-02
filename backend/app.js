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
app.use(express.json());
app.use(cookieParser());

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
app.use(cors(corsOptions));

// ✅ Handle Preflight Requests Explicitly
app.options('*', cors(corsOptions));

// ✅ Health Check Endpoint
app.get("/", (req, res) => {
  res.json({ message: "hello from POS server!" });
});

// ✅ API Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/payementRoute"));

// ✅ Log All Registered Routes for Debugging
console.log("\n✅ Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Direct routes
    console.log(`${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    // Router-level middleware (e.g. from app.use('/api/...'))
    middleware.handle.stack.forEach((handler) => {
      const routePath = handler.route?.path;
      if (routePath) {
        console.log(`${Object.keys(handler.route.methods).join(", ").toUpperCase()} ${routePath}`);
      }
    });
  }
});

// ✅ Global Error Handler
app.use(globalErrorHandler);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 POS Server is listening on port ${PORT}\n`);
});
