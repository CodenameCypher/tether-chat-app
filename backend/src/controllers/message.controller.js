import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserID },
    }).select("-password");

    return res
      .status(200)
      .json({ message: `Total users found: ${filteredUsers.length}` });
  } catch (e) {
    return res
      .status(400)
      .json({ message: `Error in getUserForSidebar controller: ${e.message}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatID } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { receiverID: userToChatID, senderID: myID },
        { receiverID: myID, senderID: userToChatID },
      ],
    });

    return res.status(200).json(messages);
  } catch (e) {
    return res
      .status(400)
      .json({ message: `Error in getMessages controller: ${e.message}` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderID: senderID,
      receiverID: receiverID,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    // socket io implementation

    return res.status(201).json(newMessage);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error in sendMessage controller: ${e.message}` });
  }
};
