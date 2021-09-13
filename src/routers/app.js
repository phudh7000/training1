const productRouter = require('./product')
const loginRouter = require('./login')

function route(app){
    app.use('/product', productRouter)
    app.use('./login', loginRouter)
}



module.exports = route;