const express = require("express")
const dotenv = require("dotenv").config();
const cors = require("cors")
const ConnectToDB = require("./database/db");
const authRoutes = require("./routes/auth-route");
const evetnRoutes = require("./routes/events-route");
const userRoutes = require("./routes/user-route");

ConnectToDB();

const app = express();
const PORT = process.env.PORT || 9000;

// CORS configuration - keeping your hosted URL
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? "https://eventra-5j2m.onrender.com" 
        : ["http://localhost:3000", "http://localhost:5173", "https://eventra-5j2m.onrender.com"],
    credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", evetnRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})


