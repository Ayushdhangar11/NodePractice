const express= require("express")
const http = require("http")
const url = require("url")
const fs = require("fs")

const app = express();


app.get("/",(req,res)=>{
    const urldata = url.parse(req.url, true);
    console.log(urldata);
    const httpMethod = req.method;
    
    res.send("Hello from Express server");
    fs.appendFile("log.txt", `${httpMethod} ${new Date().toLocaleString()} --> req is received\n`, (err) => {
        if(err) throw err;
    })
}) 

app.get("/about",(req,res)=>{
    const urldata = url.parse(req.url, true);
    console.log(urldata);
    const httpMethod = req.method;

    res.send("About page");
    fs.appendFile("log.txt", `${httpMethod}, ${urldata.pathname} ${new Date().toLocaleString()} --> About page requested\n`, (err) => {
        if(err) throw err;
    })
})

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
})