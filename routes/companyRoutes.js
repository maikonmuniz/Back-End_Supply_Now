const router = require('express').Router()

const CompanyController = require('../controllers/CompanyController')

router.post('/create', CompanyController.create)

module.exports = router
