const Company = require('../models/Company')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-token-user')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = class CompanyController {

    static async create(req, res){

        const { name, email, cpf_cnpj, password, confirmpassword } = req.body


        if (!password) {
            res.status(422).json({message: 'A senha é obrigatorio'})
            return
        }

        if (!confirmpassword) {
            res.status(422).json({message: 'A senha de confirmação é obrigatorio'})
            return
        }

        if (password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais'})
        }

        // check email if user exists

        const companyExists = await User.findOne({ email: email})

        if(companyExists){
            res.status(422).json({
                message: 'Por Favor, utilize outro e-mail',
            })

            return

        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const company = new User({

            name: name,
            email: email,
            cnpj: cnpj,
            password: passwordHash

        })

        try {

            const newCompany = await company.save()

            await createUserToken(newCompany, req, res)

            return

        }catch(error) {

            res.status(500).json({message: error})

        }
    }

    // create - login
    static async login(req, res){
    
        const {email, password} = req.body

        if(!email){

            res.status(422).json({ message: 'O e-mail é obrigatorio' })
            return

        }

        if(!password){

            res.status(422).json({message: "A senha é obrigatório"})
            return

        }


        // exists user
        const company = await Company.findOne({ email: email })

        if(!company){

            res.status(422).json({

                message: 'Por favor faça um cadastro',

            })

            return

        }

        const checkPassword = await bcrypt.compare(password, company.password)

        if(!checkPassword){

            res.status(422).json({ 

                message: "Senha Inválida",

            })

            return

        }

        await createUserToken(company, req, res)

    }

}