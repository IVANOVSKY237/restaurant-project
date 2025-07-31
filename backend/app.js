require("dotenv").config();
const connectDB= require("./config/database");
const express = require("express");
const config = require("./config/config");
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require("./middleware/globalErrorHandler")
const app = express();
const cors = require("cors");

const PORT = config.port;
connectDB();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5174', 'http://localhost:5175']
}))

// CORS configuration
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5174', 'http://localhost:5175'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
//Root Endpoint
app.get("/", (req,res)=>{

    res.json({message : "hello from POS server!"});
})
//Other Endpoints
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/table", require("./routes/tableRoute"));
//app.use("/api/payment", require("./routes/payementRoute"));

// Global Error Handler
app.use(globalErrorHandler);

//Server
app.listen(PORT, ()=>
{
    console.log(`POS Server is listening on port ${PORT}`);
})