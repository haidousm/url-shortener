const express = require("express");
const router = express.Router();

const ShortUrl = require("../models/ShortUrl");

router.post("/shorten", async (req, res) => {
    let url = req.body.url;

    shortUrl = await ShortUrl.create({ full: url });
    return res.status(200).json({
        status: 200,
        message: "success",
        short: shortUrl.short,
    });
});

router.get("/:short", async (req, res) => {
    let short = req.params.short;
    let shortUrl = await ShortUrl.findOne({ short: short });
    if (shortUrl == null) return res.redirect("https://haidousm.com");
    let full = shortUrl.full;
    const withHttp = (url) =>
        url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schema, nonSchemaUrl) =>
            schema ? match : `https://${nonSchemaUrl}`
        );
    res.redirect(withHttp(full));
});

module.exports = router;
