const mongoose = require('mongoose')

const schema = mongoose.Schema



const UserSchema = new schema({
    username: {type: String, minlength: 8, unique: true, required: true},
    password: {type: String, minlength: 8, required: true},
    email: {type: String, required: true}
})

UserSchema.pre('save', function(next) {
    
})

module.exports = mongoose.model('user',UserSchema)