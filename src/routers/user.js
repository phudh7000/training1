const router = require('express').Router();
const loginController = require('../controller/user')
const { checkLogin, checkAdmin, checkViewer } = require('../helpers/auth')


router.get('/', checkLogin, checkViewer, loginController.getAllUser)
    .post('/login', loginController.login)
    .post('/create', checkLogin, checkAdmin, loginController.createUser)
    .patch('/update', checkLogin, checkAdmin, loginController.updateUser)
    .delete('/delete', checkLogin, checkAdmin, loginController.deleteUser)

module.exports = router;