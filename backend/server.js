const express = require("express")
const dotenv = require("dotenv").config();
const cors = require("cors")
const ConnectToDB = require("./database/db");
const authRoutes = require("./routes/auth-route");
const evetnRoutes = require("./routes/events-route");


ConnectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors ({
    origin : "http://localhost:5173",
    credentials : true,
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api", evetnRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is now listening to port ${PORT}`);
})


