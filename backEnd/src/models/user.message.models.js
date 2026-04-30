import mongoose from "mongoose";

const userMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
}, {
  timestamps: true
});

const UserModels = mongoose.model("UserMessage", userMessageSchema);

export default UserModels;