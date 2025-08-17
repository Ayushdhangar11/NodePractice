//*************work on JSON data***************//

// Get /user = list all user
// Get user/:id = /user/1 = get user with id 1 
// POST /user = create new user
// PUT /user/:id = update user with id
// DELETE /user/:id = delete user with id

//*********************************************//

const express = require("express")
const app =  express();
const userData = require("./MOCK_DATA.json")
const fs = require("fs");

//goodpractice to write /api in url where we return JSON data
//and for non api we are returning HTML document

const PORT = 8000;

//middleware jo check karta hai ki body me data kaha se aara hai
app.use(express.urlencoded({ extended: false }));


//custom middleware 
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' THIS IS FIRST MIDDLEWARE`);
    next();
});

//api handling //Routes

app.get("/users" , (req, res) => {
    const html = `
    <h1>Users</h1>
    <ul>
        ${userData.map(user => `<li>${user.first_name} ${user.last_name} --- ${user.gender} --- ${user.job_title}</li>`)
        .join("")}
    </ul>
    `;
    res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
    res.json(userData);
});

app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log('Body', body)
    userData.push({...body, id: userData.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(201).json(body);
        }
    });
});

// app.put("/api/users/:id", (req, res) => {
//     res.json({status : "pending"});
// });

// app.delete("/api/users/:id", (req, res) => {
//     res.json({status : "pending"});
// });
// but as we see put put and delete hitting from the sae route we can also write it like


//better way
app.route("/api/users/:id")//even we can write get req here as its also having same route .
    .patch((req, res) => {
        const userId = parseInt(req.params.id);
        const userIndex = userData.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Updated User:", userData[userIndex]);
        // Update only provided fields
        userData[userIndex] = { ...userData[userIndex], ...req.body };

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
            } else {
                res.status(200).json(userData[userIndex]);
            }
        });
    })
    .delete((req, res) => {
        const userID = parseInt(req.params.id);
    const newUsers = userData.filter(user => user.id !== userID);

    if (newUsers.length === userData.length) {
        return res.status(404).json({ message: "User not found" });
    }

    userData = newUsers; // ✅ now works because it's 'let'

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(204).send(); // No content
        }
    });
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});