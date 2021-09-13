const router = require('express').Router();
const productController = require('../controller/product')
const {validateBody, productSchema} = require('../helpers/routerHelpers')


router.get('/', productController.getAll)
.get('/filter', productController.filterProduct)
.post('/create', validateBody(productSchema), productController.newProduct)
.delete('/delete', productController.deleteProduct)
.patch('/update', productController.updateProduct)
module.exports = router;