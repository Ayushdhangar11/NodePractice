const express = require('express');
const {handleUrlShortening,handleAnalytics} = require("../controller/url");

const router = express.Router();

router.post("/", handleUrlShortening);

router.get('/analytics/:shortId',handleAnalytics);

module.exports = router;