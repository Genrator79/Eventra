const mongoose = require("mongoose")

const ConnectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully !")
    }
    catch(err){
        console.log("MongoDB connection failed !!!", err);
    }
}

module.exports = ConnectToDB;