const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser,getUser} = require('../service/auth')

async function handleUserSignUp(req,res)
{
    const { name, email, password } = req.body;
    
    User.create({
        name,
        email,
        password
    })

    return res.redirect("/")

}

async function handleUserLogin(req,res)
{
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).render("login", { error: "Invalid credentials" });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };