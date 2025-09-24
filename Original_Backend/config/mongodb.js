import mongoose from "mongoose";

const connectdb = async () => {

  mongoose.connection.on("connected", () => console.log("Database connected"));
  
  try {
  
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");
  } catch (error){
    console.log ("ho gaya kam ")
    console.error("Database connection error:", error);
  }
};
// connectdb();


export default connectdb;
