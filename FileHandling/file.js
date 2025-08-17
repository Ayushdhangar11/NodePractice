const fs = require("fs")
const os = require("os")
console.log(os.cpus().length)//cpu info;


fs.writeFileSync("file.txt", "hello world")//snc call data override karta hai blocking req

// fs.writeFile("file.txt", "hello world", (err) => {//async call non-blocking 
//     if (err) throw err;
//     console.log("The file has been saved!");
// });

const res = fs.readFileSync("file.txt", "utf-8")//sync call
console.log(res);


fs.appendFileSync("file.txt", " \nI am Ayush")//sync call data append karta hai

fs.mkdirSync("newDir/a/b", { recursive: true })//sync call new directory create karta hai and insid e as well

fs.unlinkSync("file.txt")//sync call file delete karta hai
