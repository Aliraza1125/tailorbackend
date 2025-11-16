import mongoose, { Schema } from "mongoose";
import type { IProfile } from "../types/types.js";

const ProfileSchema:Schema<IProfile> = new Schema<IProfile>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }
  },
  { collection: "profiles",versionKey: false },
);

const ProfileModel = mongoose.models.IProfile || mongoose.model<IProfile>("profiles", ProfileSchema);

export default ProfileModel;
