const express = require("express");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x4n3c.mongodb.net/url_shortener?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

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

app.listen(process.env.PORT || 5000);
