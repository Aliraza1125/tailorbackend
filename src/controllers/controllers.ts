import type { Request, Response } from "express";
import ProfileModel from "../models/profile.js";
import { ApiError } from "../middleware/errorHandler.js";
import { IProfile } from "../types/types.js";

const postProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }:IProfile = req.body;
    const existEmail = await ProfileModel.findOne({ email });
    if (existEmail) {
      throw new ApiError(400, "Email already registered");
    }
    const newProfile = new ProfileModel({
      email
    });
  await newProfile.save()

    res.status(201).json({
      message: "Profile successful saved.",
      data: {
        id: newProfile._id,
        email:newProfile.email,
        msg: "test passed and api running live now.",
      },
      error: null,
    });
    
  } catch (error: unknown) {
    if (error instanceof ApiError && error.statusCode) {
      res.status(error.statusCode).json({
        message: error.message,
        data: null,
        error: null,
      });
    } else {
      res.status(500).json({
        message: "Profile registration failed.",
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
};
export  { postProfile };
