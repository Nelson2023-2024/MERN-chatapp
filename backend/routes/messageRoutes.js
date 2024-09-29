import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import protectRoute from "../middleware/protectRoutes.js";
import { Conversations } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const router = Router();
router.post("/send/:id", protectRoute, async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //find coversation where participants array includes all this fields
    let conversation = await Conversations.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //if the conversation doesn't exist
    if (!conversation) {
      conversation = await Conversations.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await newMessage.save() 1s
    // await conversation.save() 1s

    //SOCKET IO functionality

    //run in parrarel
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in message controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as messageRoutes };
