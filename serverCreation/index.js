const http = require("http");
const fs = require("fs"); //we write log of each req sent or server
const url = require("url"); //we use url to parse the request URL

const server = http.createServer((req,res)=>{
    const urldata = url.parse(req.url,true);
    console.log(urldata);
    
    fs.appendFile("log.txt", `${new Date().toLocaleString()} --> req is recived\n`, (err) => {
        if (err) throw err;
    });
    res.end("Hello on server side");
})

server.listen(8000,()=>{
    console.log("Server is listening on port 8000");
})