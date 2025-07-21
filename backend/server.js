const express = require("express")
const dotenv = require("dotenv").config();
const cors = require("cors")
const ConnectToDB = require("./database/db");
const authRoutes = require("./routes/auth-route");
const evetnRoutes = require("./routes/events-route");
const userRoutes = require("./routes/user-route");

ConnectToDB();

const app = express();
const PORT = process.env.PORT || "https://eventra-5j2m.onrender.com";

app.use(cors ({
    origin : "https://eventra-5j2m.onrender.com",
    credentials : true,
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api", evetnRoutes);
app.use("/api/user", userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is now listening to port ${PORT}`);
})


