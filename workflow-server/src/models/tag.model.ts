import mongoose from "mongoose";
import { Model } from "../types/model.type.js";

const tagSchema = new mongoose.Schema({
  name: String,
  color: String,
});

export default mongoose.model(Model.Tag, tagSchema);
