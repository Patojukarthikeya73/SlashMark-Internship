const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();

    const newUrl = new Url({
        originalUrl,
        shortUrl,
    });

    await newUrl.save();

    res.json({ originalUrl, shortUrl: `http://localhost:${PORT}/${shortUrl}` });
});


app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    const urlEntry = await Url.findOne({ shortUrl });
    if (urlEntry) {
        return res.redirect(urlEntry.originalUrl);
    }

    res.status(404).json({ error: 'URL not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
