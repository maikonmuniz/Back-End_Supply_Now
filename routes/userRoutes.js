const router = require('express').Router()
const { body } = require('express-validator');
const UserController = require('../controllers/UserController')
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload")

router.post('/register', UserController.register)

router.put('/location/:id', UserController.location)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single("image"), UserController.editUser)
router.put('/socket/:id', UserController.chat)

module.exports = router
