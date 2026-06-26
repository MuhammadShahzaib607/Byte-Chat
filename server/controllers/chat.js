import Chat from "../models/Chat.js";
import { sendRes } from "../utils/responseHandler.js";

export const getChatHistory = async (req, res) => {
  try {
    const { botId } = req.params;
    const userId = req.user.id

    if (!userId || !botId) {
      return sendRes(res, 400, false, "userId and botId are required");
    }

    const chats = await Chat.find({ userId, botId })
      .sort({ createdAt: 1 });

    return sendRes(res, 200, true, "Chat history fetched successfully", { chats });
    
  } catch (error) {
    return sendRes(res, 500, false, "Internal Server Error", error.message);
  }
};