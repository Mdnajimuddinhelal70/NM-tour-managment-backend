import { model, Schema } from "mongoose";
import type { IDivisin } from "./division.interface";

const divisionSchema = new Schema<IDivisin>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Division = model<IDivisin>("Division", divisionSchema);
