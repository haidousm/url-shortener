const mongoose = require("mongoose");
const shortID = require("shortid");

const shortUrlSchema = new mongoose.Schema({
    createdAt: { type: Date, expires: 604800, default: Date.now },
    short: {
        type: String,
        required: true,
        default: () => {
            return shortID.generate().substring(0, 4);
        },
    },
    full: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
