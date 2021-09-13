const User = require('../models/user')

const get = (req, res, next) => {
    res.status(200).json("form login")
}

const auth = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = User.find({ username });
        //
    } catch (error) {
        next(error)
    }


}
