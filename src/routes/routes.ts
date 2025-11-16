import express from "express";
import { postProfile } from "../controllers/controllers.js";

const router = express.Router();



router.post("/profile",postProfile );

export default router;