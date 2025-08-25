const express= require('express')
const URL = require("../models/url");

const router = express.Router();

router.get("/", async(req, res) => {
  const allURLs = await URL.find();  
    // console.log("All URLs:", allURLs);
    res.render("home", { urls: allURLs });
});

router.get("/signup",(req,res)=>{
  return res.render("signup");
})

router.get("/login",(req,res)=>{
  return res.render("login");
})
  
module.exports = router;
