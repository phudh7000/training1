const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json("wrong username");
        }
        const isTrue = await bcrypt.compare(password, user.password)

        if (!isTrue) {
            return res.json("wrong password");
        }

        const id = user._id.toString();

        const token = jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

        res.setHeader('Authorization', token);
        res.json({
            message: "login success",
            token: token
        });


    } catch (error) {
        next(error)
    }

}


const logout = (req, res) => {
    res.removeHeader('authorization');
    res.json("logout success")
}


const createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });

        if (user) {
            return res.json("User already exists");
        }

        await User.create({ username, password })
        res.json("create success")
    } catch (error) {
        next(error)
    }
}


const updateUser = async (req, res, next) => {
    try {
        const { _id, ...user } = req.body;
        console.log(_id);
        await User.updateOne({ _id }, user);
        res.json("update user success");

    } catch (error) {
        res.json("wrong _id")
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.body;
        await User.deleteOne({ _id });
        res.json("delete user success");

    } catch (error) {
        res.json("wrong _id")
    }
}


module.exports = {
    getAllUser,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser
}
