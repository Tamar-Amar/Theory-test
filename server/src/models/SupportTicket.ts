import mongoose from "mongoose";

const SupportTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    username: { type: String, required: true },
    body: { type: String, required: true, maxlength: 8000 },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "support_tickets" }
);

export type SupportTicketDoc = mongoose.InferSchemaType<
  typeof SupportTicketSchema
>;
export const SupportTicketModel =
  mongoose.models.SupportTicket ||
  mongoose.model("SupportTicket", SupportTicketSchema);
