const express = require("express");
const app = express();
const URLroutes = require("./routes/url");
const staticRoute = require("./routes/staicRoute");
const userRoute = require('./routes/user');
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require('cookie-parser');
const {restrictToLoginUserOnly} = require('./middleware/auth')

connectToMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => {
    console.log(`Db is connected`);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//so that i can access form data form html .
app.use(cookieParser());//so that we can use cookies
app.use("/url", restrictToLoginUserOnly, URLroutes);
app.use("/user", userRoute);


//server side rendering routes help us to create html page and render it using ejs
// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Find document
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Update visit history
        await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
);


        // Redirect
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Redirect error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
