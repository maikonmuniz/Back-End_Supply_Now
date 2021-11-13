const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { imageUpload } = require('../helpers/image-upload')
router.post('/register',imageUpload.array('images'), ProductController.register)
// router.get('/', ProductController.products_all)


module.exports = router