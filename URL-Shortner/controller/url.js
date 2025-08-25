const shortid = require('shortid');
const URL = require('../models/url')

async function handleUrlShortening(req, res) {
    try {
        const shortID = shortid.generate();
        console.log('Generated shortID:', shortID); // Debug log
        const body = req.body;

        if (!body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        console.log('Generated shortID:', shortID); // Debug log
        
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.render("home", { id: shortID });
        // return res.status(201).json({ id: shortID });    

    } catch (error) {
        console.error('Error in handleUrlShortening:', error);
        
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            return res.status(500).json({ error: 'Short ID already exists, please try again' });
        }
        
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;

        // Find entry
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Return analytics
        return res.json({
            totalClicks: entry.visitHistory.length,
            analytics: entry.visitHistory
        });

    } catch (error) {
        console.error("Error in handleAnalytics:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    handleUrlShortening,
    handleAnalytics
};