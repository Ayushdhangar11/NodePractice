const {getUser} = require('../service/auth')

async function restrictToLoginUserOnly(req, res, next) {
    const UserSessionId = req.cookies.sessionId;
    const user = getUser(UserSessionId);

    if(!UserSessionId)
        return res.status(401).redirect("/login");

    if (!user) {
        return res.status(401).redirect("/login");
    }
    req.user = user;
    next();
}


module.exports = { restrictToLoginUserOnly };
