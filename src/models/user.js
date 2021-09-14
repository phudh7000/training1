const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = mongoose.Schema



const UserSchema = new schema({
    username: {type: String, minlength: 8, unique: true, required: true},
    password: {type: String, minlength: 8, required: true},
    role: {type: String, default: "viewer"}
})

UserSchema.pre('save', async function(next) {
    console.log(this);
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

  

module.exports = mongoose.model('user',UserSchema)