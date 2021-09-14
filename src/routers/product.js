const router = require('express').Router();
const multer = require('multer')
const { storage, fileFilter } = require('../config/multerStorage')
const productController = require('../controller/product');
const { checkLogin, checkEditor } = require('../helpers/auth');
const {validateBody, createProductSchema, updateProductSchema} = require('../helpers/routerHelpers')


const upload = multer({ storage: storage, fileFilter: fileFilter});


router.get('/', productController.getAll)
    .get('/filter', productController.filterProduct)
    .post('/create', checkLogin, checkEditor, validateBody(createProductSchema), productController.newProduct)
    .delete('/delete', checkLogin, checkEditor, productController.deleteProduct)
    .patch('/update', checkLogin, checkEditor, validateBody(updateProductSchema), productController.updateProduct)
    .post('/upload', upload.single('csvFile'), productController.importData);
module.exports = router;