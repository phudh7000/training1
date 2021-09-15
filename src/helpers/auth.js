const jwt = require('jsonwebtoken')
const User = require('../models/user')



const checkLogin = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.json("must login first")
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
}

const checkAdmin = (req, res, next) => {
    const user = req.user;
    const role = user.role;
    if (role === "admin") {
        return next();
    }
    else {
        return res.json('not permission')
    }
}
const checkEditor = (req, res, next) => {
    const user = req.user;
    const role = user.role;
    if (role === "admin" || role === "editor") {
        return next();
    }
    else {
        return res.json('not permission')
    }
}
const checkViewer = (req, res, next) => {
    const user = req.user;
    const role = user.role;
    if (role === "admin" || role === "editor" || role === "viewer") {
        return next();
    }
    else {
        return res.json('not permission')
    }
}

module.exports = {
    checkLogin,
    checkAdmin,
    checkEditor,
    checkViewer
}