const express = require("express");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

const app = express();
app.use(express.static("public"));

const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x4n3c.mongodb.net/url_shortener?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/shorten", (req, res) => {});

app.listen(process.env.PORT || 5000);
