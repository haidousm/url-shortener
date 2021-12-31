const mongoose = require("mongoose");
const shortID = require("shortid");

const shortUrlSchema = new mongoose.Schema({
    short: {
        type: String,
        required: true,
        default: shortID.generate,
    },
    full: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
