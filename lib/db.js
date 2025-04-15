import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB is connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDatabase;
