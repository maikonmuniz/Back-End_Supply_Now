const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', verifyToken, imageUpload.array('images'), ProductController.register)

module.exports = router
