const express = require("express");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 15,
});

connectDB();

const app = express();
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(limiter);
app.use(express.json());

app.use("/", require("./routes/index"));
app.get("*", (req, res) => {
    res.redirect(process.env.REDIRECT_URL);
});
app.listen(process.env.PORT || 3000);
