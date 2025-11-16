export type ConnectionObject = {
  isConnected?: number;
  name?:string;
}
import { Document } from "mongoose";

 interface IProfile extends Document {
  email: string;
}



export type {IProfile}