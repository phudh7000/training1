const router = require('express').Router();
const userController = require('../controller/user')
const { checkLogin, checkAdmin, checkViewer } = require('../helpers/auth')
const {validateBody, createUserSchema, updateUserSchema, deleteUserSchema} = require('../helpers/routerHelpers')


router.get('/', checkLogin, checkViewer, userController.getAllUser)
    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .post('/create', checkLogin, checkAdmin, validateBody(createUserSchema), userController.createUser)
    .patch('/update', checkLogin, checkAdmin, validateBody(updateUserSchema), userController.updateUser)
    .delete('/delete', checkLogin, checkAdmin, validateBody(deleteUserSchema), userController.deleteUser)

module.exports = router;