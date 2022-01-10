const Product = require('../models/Product')
const User = require('../models/User')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')



module.exports = class ProductController{

    static async register(req, res){

        const {name, price, description} = req.body

        const image = req.files



        if(!name){

            res.status(422).json({

                message: "O nome é obrigatorio!"

            })

            return

        }

        if(!price){

            res.status(422).json({

                message: "O preço é obrigatorio!"

                })

                return

            }

            if(!description){

                res.status(422).json({
    
                    message: "A descrição é obrigatorio!"
    
                })

                return

            }

            if(image.length === 0){
                res.status(422).json({
    
                    message: "A imagem é obrigátoria",
                    
                })
    
                return
    
            }

            // aqui será implementado os dados do restaurante

            const token = getToken(req)
            const company = await getUserByToken(token)

            /*essa validação é apenas por hora, porque não faz sentido implementar isso,
             sendo que pelo login o sistema já entede o tipo de usuário*/
            if(company.tipo != "E"){
                res.status(422).json({
    
                    message: "Apenas empresas podem cadastrar produtos",
                    
                })
    
                return
            }
            const product = new Product({
                companyId: company._id,
                name: name,
                price: price, 
                description: description,
                images: [],
                
            })

            //

       
            image.map((img) => {
        
                product.images.push(img.filename)

            })
            console.log(product)

            try {

                const newProduct = await product.save()
                
                res.status(201).json({

                    message: "Produto cadastrado com sucesso!",
                    newProduct,

                })
                
            } catch (erro){
    
                res.status(500).json({

                    message: erro
    
                })
            }         
        }

        static async productAll(req, res){
            const products = await Product.find().sort('-createdAt')

            res.status(200).json({
                products: products,
            })
        }

        static async productCompanyAll(req, res){
            
            const token = getToken(req)
            const company = await getUserByToken(token)

            const product = await Product.find({'user._id': company._id})

            res.status(200).json({
                 product,
            })
        }
    }
