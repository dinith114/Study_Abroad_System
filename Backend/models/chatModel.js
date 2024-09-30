const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userMessage: String,
    botReply: String,
    timestamp: { type: Date, default: Date.now },
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  
module.exports = Chat;
