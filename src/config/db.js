const mongoose = require('mongoose');

async function connect() {
    try {
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('connect cuccessful')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}