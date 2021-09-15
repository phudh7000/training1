const router = require('express').Router();
const multer = require('multer')
const { storage, fileFilter } = require('../config/multerStorage')
const productController = require('../controller/product');
const { checkLogin, checkEditor } = require('../helpers/auth');
const {validateBody, createProductSchema, updateProductSchema, deleteProductSchema} = require('../helpers/routerHelpers')


const upload = multer({ storage: storage, fileFilter: fileFilter});


router.get('/', productController.getAll)
    .get('/filter', productController.filterProduct)
    .post('/create', checkLogin, checkEditor, validateBody(createProductSchema), productController.newProduct)
    .patch('/update', checkLogin, checkEditor, validateBody(updateProductSchema), productController.updateProduct)
    .delete('/delete', checkLogin, checkEditor, validateBody(deleteProductSchema), productController.deleteProduct)
    .post('/upload', checkLogin, checkEditor, upload.single('csvFile'), productController.importData)
    .get('/download', productController.exportData)
module.exports = router;