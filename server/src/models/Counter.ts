import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
  },
  { collection: "counters" }
);

export type CounterDoc = mongoose.InferSchemaType<typeof CounterSchema>;
export const CounterModel =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

export const DEMO_FINISH_COUNTER = "demo_finish";
