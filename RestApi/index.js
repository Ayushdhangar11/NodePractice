const express = require("express")
const app =  express();

const PORT = 8000;

//api handling //Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});