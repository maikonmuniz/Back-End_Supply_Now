const router = require('express').Router()
const { body } = require('express-validator');
const UserController = require('../controllers/UserController')
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload")

router.post('/register', [
    body('email').isEmail().withMessage("Precisa ser um E-mail valido"),
    body('tipo').isString().withMessage("Utilize M - (Motorista) ou C - (Cliente)"),
    body('password').isLength({min: 8}).withMessage("É necessário a senha ser acima de 8 caracter")
], UserController.register)

router.put('/location/:id', UserController.location)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single("image"), UserController.editUser)
router.put('/socket/:id', UserController.chat)

module.exports = router
