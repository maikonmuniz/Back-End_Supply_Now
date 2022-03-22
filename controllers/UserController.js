const User = require('../models/User')
const Car = require('../models/Car')
const express = require("express")
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-token-user')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

module.exports = class UserController{

    static async register(req, res){

        const { user, car } = req.body

        if (!user.name) {
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        }

        if (!user.email) {
            res.status(422).json({message: 'O email é obrigatorio'})
            return
        }

        if (!user.phone) {
            res.status(422).json({message: 'O telefone é obrigatorio'})
            return
        }


        if(!user.tipo){
            res.status(422).json({message: 'O tipo é obrigatorio'})
            return
        }

        if (!user.password) {
            res.status(422).json({message: 'A senha é obrigatorio'})
            return
        }

        if (!user.confirmpassword) {
            res.status(422).json({message: 'A senha de confirmação é obrigatorio'})
            return
        }


        if (user.password !== user.confirmpassword){
            res.status(422).json({

                    message: 'A senha e a confirmação de senha precisam ser iguais'

                })
        }

        // check email if user exists

        const userExists = await User.findOne({ email: user.email })

        if(userExists){

            res.status(422).json({

                message: 'Por Favor, utilize outro e-mail',

            })

            return

        }


        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password, salt)

        const userFinal = new User({

            name: user.name,
            email: user.email,
            phone: user.phone,
            cpf: user.cpf,
            tipo: user.tipo,
            password: passwordHash,

        })

        if (user.tipo === "M"){
            
           await new Car({ ...car, userId: userFinal._id }).save()

        }

        try {

            const newUser = await userFinal.save()

            await createUserToken(newUser, req, res)

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
        const user = await User.findOne({ email: email })

        if(!user){

            res.status(422).json({

                message: 'Por favor faça um cadastro',

            })

            return

        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){

            res.status(422).json({ 

                message: "Senha Inválida",

            })

            return

        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req, res){

        let currentUser

        //console.log(req.headers.authorization)

        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else{

            currentUser = null

        }

        res.status(200).send(currentUser)

    }

    static async getUserById(req, res){

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){

            res.status(422).json({

                message: 'Usuário não encontrado',

            })

            return

        }

        res.status(200).json({ user })
    }

    static async editUser(req, res){


        const id = req.params.id
        const token = getToken(req)
        const user = await getUserByToken(token)
        const { name, email, phone, password, confirmpassword } = req.body

        if(req.file){

            user.image = req.file.filename

        }

        //Validations
        if (!name) {
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        }

        user.name = name

        if (!email) {
            res.status(422).json({message: 'O email é obrigatorio'})
            return
        }

        const userExists = await User.findOne({email: email})

        if (user.email !== email && userExists) {
            res.status(422).json({message: 'E-mail não encontrado'})
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({message: 'O telefone é obrigatorio'})
            return
        }

        user.phone = phone

        if(password != confirmpassword){
            res.status(422).json({message: 'As senhas não conferem!'})

            return

        }else if(password === confirmpassword && password != null){

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

        }

        // fim validations

        try{

            await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true })

            res.status(200).json({

                    message: "Salvo"

                })

        }catch(err){

            res.status(500).json({message: err})
            return

        }

    }

    // lucatonUsers, é para localizar o usuario no maps para entrega e recebimento da marmita
    static async location(req, res){

        try{

        const { id } = req.params
        const { coordinates } = req.body

        await User.findByIdAndUpdate(id, {

            location: {

                type: 'Point',
                coordinates,

            },
            

        } )
        
        res.json({error: false})
    
      }catch(err){

            res.json({ error: true, message: err.message})

        }

    }

    static async chat(req, res){

        try{

            const { id } = req.params;
            const { socketId } = req.body;

            await User.findByIdAndUpdate(id, {
                socketId,
            })

            res.json({error: false})

        }catch(error){

            res.json({

                error: true, message: err.message

            })

        }

    }

}
