const productRouter = require('./product')
const loginRouter = require('./user')

function route(app){
    app.use('/product', productRouter)
    app.use('/user', loginRouter)
}



module.exports = route;