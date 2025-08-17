const express = require('express');
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Model
const User = mongoose.model('User', userSchema);

// ✅ Insert one user
// const user1 = new User({ 
//     name: 'John Doe', 
//     email: 'john@example.com', 
//     age: 30 
// });

user1.save()
    .then(() => console.log("User saved successfully!"))
    .catch(err => console.error("Error saving user:", err));

// Alternative way:
// User.create({ name: 'John Doe', email: 'john@example.com', age: 30 });

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});

          

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
