require('dotenv').config()
const express = require('express')
const route = require('./src/routers/app')
const db = require('./src/db/db')

db.connect();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello");
    res.end();
})

route(app);
app.listen(PORT, () => console.log(`listening to port ${PORT}`))