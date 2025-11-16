import { config } from './config/env.js';
import  {ConnectionObject}  from "./types/types.js";
import express,{Express} from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes.js";
// dotenv.config();

const app:Express = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"))
// Routes
app.use("/api", routes);

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
     // 1️⃣ Already connected
  if (connection.isConnected) {
    console.log("Database Already Connected");
    return;
  }

  try {

    const db = await mongoose.connect(config.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;    
    console.log("✅ MongoDB connected",connection.isConnected);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
// Connect to database and start server
dbConnect().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

// Export the Express app for Vercel serverless functions
export default app;

// app.listen( config.PORT,config.HOST, () => {
//   console.log(`🚀 Server is running on http://${config.HOST}:${config.PORT}`);
// });