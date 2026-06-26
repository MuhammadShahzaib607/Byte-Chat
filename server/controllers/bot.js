import Groq from "groq-sdk";
import dotenv from "dotenv"
import { sendRes } from "../utils/responseHandler.js";
import { generateSlug } from "../utils/generateSlug.js";
import Bot from "../models/Bot.js";
import Chat from "../models/Chat.js";

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getBotDetails = async (req, res) => {
  try {
    const { id: botId } = req.params;

    if (!botId) {
      return sendRes(res, 400, false, "Bot ID is required.");
    }

    const bot = await Bot.findById(botId);
    
    if (!bot) {
      return sendRes(res, 404, false, "Bot not found.");
    }

    return sendRes(res, 200, true, "Bot details retrieved successfully.", bot);

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const updateBotStatus = async (req, res) => {
  try {
    const { id: botId } = req.params;
    const { isActive } = req.body;
    const authenticatedUserId = req.user.id;

    if (isActive === undefined) {
      return sendRes(res, 400, false, "isActive field is required in request body.");
    }

    const bot = await Bot.findById(botId);
    if (!bot) {
      return sendRes(res, 404, false, "Bot not found.");
    }

    if (bot.userId.toString() !== authenticatedUserId) {
      return sendRes(res, 403, false, "Unauthorized: You do not have permission to modify this bot.");
    }

    bot.isActive = isActive;
    await bot.save();

    return sendRes(res, 200, true, `Bot status successfully updated to ${isActive}.`, {
      botId: bot._id,
      isActive: bot.isActive
    });

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const editBotData = async (req, res) => {
  try {
    const { id: botId } = req.params;
    const { phoneNumber, systemPrompt, welcomeMessage } = req.body;
    const authenticatedUserId = req.user.id;

    const bot = await Bot.findById(botId);
    if (!bot) {
      return sendRes(res, 404, false, "Bot not found.");
    }

    if (bot.userId.toString() !== authenticatedUserId) {
      return sendRes(res, 403, false, "Unauthorized: You do not have permission to modify this bot.");
    }

    if (phoneNumber !== undefined) bot.phoneNumber = phoneNumber;
    if (systemPrompt !== undefined) bot.systemPrompt = systemPrompt;
    if (welcomeMessage !== undefined) bot.welcomeMessage = welcomeMessage;

    await bot.save();

    return sendRes(res, 200, true, "Bot data updated successfully.", bot);

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const getAllActiveBots = async (req, res) => {
    try {
        const [activeBots, totalBots] = await Promise.all([
          Bot.find({ 
            isActive: true 
        }).select('createdAt businessName phoneNumber _id'),
          Bot.countDocuments({isActive: true}),
        ])

        res.status(200).json({
            success: true,
            message: "Active bots fetched successfully",
            data: {
              activeBots,
              totalBots
            }
        });

    } catch (error) {
        console.error("Error fetching active bots:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getUserBots = async (req, res) => {
  try {
    const authenticatedUserId = req.user.id;

    const [bots, totalBots, activeBots, inActiveBots] = await Promise.all([
        Bot.find({ userId: authenticatedUserId }).sort({createdAt: -1}),
        Bot.countDocuments({ userId: authenticatedUserId }),
        Bot.countDocuments({ isActive: true }),
        Bot.countDocuments({ isActive: false }),
    ])

    return sendRes(res, 200, true, "All user bots retrieved successfully.", {
        bots,
        meta: {
            totalBots,
            activeBots,
            inActiveBots
        }
    });

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const createSystemPrompt = async (req, res) => {
  try {
    const { rawPrompt } = req.body;

    if (!rawPrompt) {
      return sendRes(res, 400, false, "Raw prompt is required");
    }

    const aiInstructions = `
      You are an expert AI Prompt Engineer specializing in creating high-performance system prompts for business chatbots.
      Your task is to thoroughly analyze the user's raw, basic description and transform it into a highly structured, professional, and robust system prompt.
      
      Strict Analysis Rule:
      You must carefully analyze the user's raw input. Strictly capture and preserve every specific detail, price, constraint, business name, and context they provide. Do not misinterpret or alter the semantic meaning of their business model (e.g., if they mention a price package or budget value, frame it accurately as a budget-friendly advantage, not an incorrect bulk restriction).

      Future Execution & Formatting Framework:
      The text you generate will be saved directly into a database and executed in the future as a "system" role prompt to govern another AI chatbot. Because it will be fed directly into an LLM system block, your formatting must be direct, authoritative, and structured without any meta-talk.

      Strict Guidelines:
      1. Never use any emojis anywhere in the generated system prompt.
      2. The output must be directly usable as a system prompt. Do not include introductory text, conversational fillers, explanations, greetings, or markdown code block wrappers (like \`\`\`). Start directly with the first structural header.
      3. Focus on maximizing accuracy, defining bulletproof guardrails, and setting an unbreakable behavioral framework for the future bot.

      Structure the generated system prompt using these exact components, expanding them fully based on the analyzed raw input:
      
      - Role and Identity: Define exactly who the future AI is and the specific business it represents based on the user's input.
      
      - Objective: Clearly state the primary operational goals of the future AI (e.g., sales conversion, customer support, lead generation, or information delivery).
      
      - Tone and Persona: Define the precise behavioral characteristics (e.g., professional, helpful, concise, polite) aligned with that specific industry.
      
      - Language of Communication: Explicitly instruct the future chatbot to dynamically adapt and respond in the exact language or script used by the customer (English, Urdu, or Roman Urdu) to ensure optimal local user experience.
      
      - Core Knowledge and Rules: Translate the user's raw business facts, pricing, inventory details, or package offers into clear, structured, and actionable rules that the future AI must follow when answering customers.
      
      - Guardrails and Restrictions: Write strict operational boundaries. Explicitly command the future bot to never hallucinate data, politely decline off-topic queries, never break character, and completely avoid using emojis in its production replies.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: aiInstructions,
        },
        {
          role: "user",
          content: `Transform this raw input into a professional system prompt: ${rawPrompt}`,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
    });

    const professionalPrompt = chatCompletion.choices[0]?.message?.content;

    return sendRes(res, 200, true, "System prompt generated successfully", {
      systemPrompt: professionalPrompt,
    });
  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const createBot = async (req, res) => {
  try {
    const { businessName, phoneNumber, systemPrompt, welcomeMessage, isActive } = req.body;
    const userId = req.user.id; 

    if (!businessName || !businessName.trim()) {
      return sendRes(res, 400, false, "Business name is required.");
    }
    if (!systemPrompt || !systemPrompt.trim()) {
      return sendRes(res, 400, false, "System prompt is required.");
    }

    const formattedBusinessName = businessName.trim().replace(/\s+/g, ' ');

    const escapedName = formattedBusinessName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const nameExists = await Bot.findOne({ businessName: { $regex: `^${escapedName}$`, $options: "i" } });
    
    if (nameExists) {
      return sendRes(res, 400, false, "This business name is already taken. Please choose another one.");
    }

    let generatedSlug = generateSlug(formattedBusinessName);

    const slugExists = await Bot.findOne({ slug: generatedSlug });
    if (slugExists) {
      generatedSlug = `${generatedSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newBot = new Bot({
      userId,
      businessName: formattedBusinessName,
      slug: generatedSlug,
      phoneNumber: phoneNumber ? phoneNumber.trim() : undefined,
      systemPrompt: systemPrompt.trim(),
      welcomeMessage: welcomeMessage ? welcomeMessage.trim() : undefined,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedBot = await newBot.save();
    return sendRes(res, 201, true, "Bot created successfully!", savedBot);

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return sendRes(res, 400, false, messages[0]);
    }
    
    return sendRes(res, 500, false, error.message);
  }
}

export const handleBotChat = async (req, res) => {
  try {
    const { botId, userPrompt } = req.body;
    const userId = req.user.id;

    if (!botId || !userPrompt || !userPrompt.trim()) {
      return sendRes(res, 400, false, "Bot ID and User Prompt are required.");
    }

    const bot = await Bot.findById(botId);
    if (!bot) {
      return sendRes(res, 404, false, "Bot not found.");
    }

    const existingChats = await Chat.find({ userId, botId }).sort({ createdAt: 1 });

    const formattedHistory = existingChats.map((chat) => ({
      role: chat.sender === "user" ? "user" : "assistant",
      content: chat.text,
    }));

    const businessPhone = bot.phoneNumber || "our official contact number";
    const finalSystemPrompt = `${bot.systemPrompt}
Strict Behavioral Boundaries & Best Practices:
1. Core Language: You must reply EXCLUSIVELY in English. Even if the user types in Roman Urdu, Hindi, or any other language, your response must be entirely in professional, natural English.
2. Response Style: Keep your answers direct, on-the-point, and helpful. Avoid unnecessary fluff, preambles, or over-explaining. Maintain an average, well-balanced length.
3. No Hallucinations or Guesses: Do not invent, assume, or guess any facts, services, or details that are not explicitly provided in your knowledge base. If you do not know something, honestly state that you don't have that information.
4. Absolute Financial & Legal Restriction: NEVER quote, guess, or estimate any pricing, costs, discounts, fees, budgets, or project completion timelines. If the user asks about money, prices, or custom setups, politely inform them that these details are tailored specifically to individual requirements and must be verified directly with management.
5. Owner Handoff: At the very end of your response, you must append a message containing this phone number: ${businessPhone}. Explicitly state to the user: 'This is our owner's number, please contact them for further details.'`;

    const aiCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: finalSystemPrompt },
        ...formattedHistory,
        { role: "user", content: userPrompt }
      ]
    });

    const aiResponseText = aiCompletion.choices[0]?.message?.content || "";

    await Chat.insertMany([
      { userId, botId, sender: "user", text: userPrompt.trim() },
      { userId, botId, sender: "bot", text: aiResponseText }
    ]);

    const fullChatHistory = await Chat.find({ userId, botId }).sort({ createdAt: 1 });

    return sendRes(res, 200, true, "Chat processed and history updated.", fullChatHistory);

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const getBotBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return sendRes(res, 400, false, "Slug is required");
    }

    const bot = await Bot.findOne({ slug: slug });

    if (!bot) {
      return sendRes(res, 404, false, "Bot not found with this slug");
    }

    return sendRes(res, 200, true, "Bot fetched successfully", { bot });
    
  } catch (error) {
    return sendRes(res, 500, false, "Internal Server Error", error.message);
  }
};
