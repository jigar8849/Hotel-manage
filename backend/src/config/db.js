const mongoose = require("mongoose");

const connectToDb = async () => {
    // const url = process.env.MONGODB_URL;
    const url = process.env.LOCAL_URL;
    try {
        await mongoose.connect(url);
        // console.log("✅ MongoDb connected to Atlas");
        console.log("✅ MongoDb connected");
    } catch (error) {
        console.log("Error to connect MongoDB", error);
        process.exit(1);
    }

    mongoose.connection.on("error", (error) => {
        console.log("MongoDB Connection Error", error);
    });
};

module.exports = { connectToDb };
