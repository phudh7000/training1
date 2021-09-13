const router = require('express').Router();
const loginController = require('../controller/loginController')

router.get('/', loginController.get)
router.post('/', loginController.auth)



module.exports = router;