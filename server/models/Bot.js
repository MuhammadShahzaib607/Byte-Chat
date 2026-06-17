import mongoose from "mongoose";

const BotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    systemPrompt: {
      type: String,
      required: [true, "System prompt is required"],
    },
    welcomeMessage: {
      type: String,
      default: "Hello! How can I assist you today?",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bot = mongoose.model("Bot", BotSchema);
export default Bot;