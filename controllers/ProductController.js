const product = require('../models/Product')

module.exports = class ProductController{

    static async register(req, res){

        const {name, price, description} = req.body

        const images = req.files

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

            if(images.length === 0){
                res.status(422).json({
    
                    message: "A imagem é obrigátoria",
                    
                })
    
                return
    
            }

            // aqui será implementado os dados do restaurante






            //

            images.map((image) => {
                pet.images.push(image.filename)
            })
    

            try {

                const newProduct = await Product.save()

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
    }