require('dotenv').config()
const express = require('express')
const route = require('./src/routers/app')
const db = require('./src/config/db')

db.connect();
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("home");
    res.end();
})

route(app);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

app.listen(PORT, () => console.log(`listening to port ${PORT}`))