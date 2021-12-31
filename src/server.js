const express = require("express");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const ShortUrl = require("./models/shortUrl");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

const app = express();
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
});
app.use(limiter);

connectDB();

app.post("/shorten", async (req, res) => {
    let url = req.body.url;

    shortUrl = await ShortUrl.create({ full: url });
    return res.status(200).json({
        status: 200,
        message: "success",
        short: shortUrl.short,
    });
});

app.get("/:short", async (req, res) => {
    let short = req.params.short;
    let shortUrl = await ShortUrl.findOne({ short: short });
    if (shortUrl == null) return res.sendStatus(404);
    let full = shortUrl.full;
    const withHttp = (url) =>
        url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
            schemma ? match : `http://${nonSchemmaUrl}`
        );
    res.redirect(withHttp(full));
});

app.listen(process.env.PORT || 3000);
