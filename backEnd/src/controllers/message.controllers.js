import userModel from "../models/user.message.models.js";   
import { protectRoute } from '../middleware/auth.protectRouter.js';
// Create a new message
export const createMessage = async (req, res) => { 

    try {
        const { senderId, receiverId, message } = req.body; 
        // Validation
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }   
        // Check if sender and receiver exist
        const sender = await userModel
            .findById(senderId)
            .select("fullName profilePicture");
        const receiver = await userModel.findById(receiverId);      
        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or receiver not found" });
        }       
        // Create message
        const newMessage = new UserMessage({
            senderId,
            receiverId,
            message,
            profilePicture: sender.profilePicture       
        }); 
        await newMessage.save();

        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Server error while sending message" });
    }       
};  

// Get messages for a specific conversation
export const getMessages = async (req, res) => {
    try {   
        const { conversationId } = req.params;  
        const messages = await UserMessage.find({
            $or: [      
                { senderId: conversationId },
                { receiverId: conversationId }
            ]   
        }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({
            message: "Messages retrieved successfully",

            data: messages
        });
    }   
    catch (error) {
        console.error("Error retrieving messages:", error);

        res.status(500).json({ message: "Server error while retrieving messages" });
    }   
};

export const getSidebarUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id }
    }).select("fullName profilePicture");

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users
    });

  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Server error" });
  }
};


