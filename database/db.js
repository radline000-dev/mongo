const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

<<<<<<< HEAD
  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }
=======
  // if (process.env.NODE_ENV === "development") {
  //   mongoose.set("debug", true);
  // }
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
