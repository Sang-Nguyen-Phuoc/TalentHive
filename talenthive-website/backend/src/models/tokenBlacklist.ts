
import mongoose from "mongoose";

export const blacklistSchema = new mongoose.Schema({
    token: { 
        type: String,
        required: true,
        unique: true 
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    }
  });

const TokenBlacklist = mongoose.model('TokenBlacklist', blacklistSchema);

export default TokenBlacklist;