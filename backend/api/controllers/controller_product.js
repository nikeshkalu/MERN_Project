const Product = require('../models/product')
const mongoose = require('mongoose')

exports.product_get_all = (req, res, next) => {

    Product.find().select('name price _id productImage').exec().then(docs => {
            // console.log(docs)
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            if (docs.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'No entries  found'
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.product_getMyProducts_all = (req, res, next) => {
    console.log(req.userData.userId)
    console.log(req.userData)

    Product.find({ "userId": req.userData.userId }).select('name price _id productImage userId').exec().then(docs => {
            if (req.userData.userId == docs.userId) {
                console.log('h')
            }
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        userId: doc.userId,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }

            if (docs.length > 0) {

                res.status(200).json(response.products)


            } else {
                res.status(404).json({
                    message: 'No  Valid entries  found'
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.product_create_product = (req, res, next) => {
    console.log(req.file)
    console.log(req.body)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
        userId: req.userData.userId
    
    })

    product.save().then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Created Product',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    productImage: result.productImage,
                    userId: req.userData.userId,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.product_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('name price _id productImage').exec().then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                })
            } else {
                res.status(404).json({
                    message: 'No Valid Data for provided id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

}

exports.product_update_product = (req, res, next) => {
    const id = req.params.productId
    // console.log(req.file)
    // console.log(req.body[0])
    // console.log(id)
    const updateOps = {}
    for (const ops of req.body) {
       
        updateOps[ops.propName] = ops.value
    }
    // console.log(updateOps)

    Product.update({ _id: id }, {
            $set: req.body[0]
        }).exec().then(result => {
            console.log(result)
            res.status(200).json({
                message: "Product Updated",
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.product_delete_product = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).exec().then(product => {
        if (!product) {
            res.status(404).json({
                message: 'No Valid Data for provided id'
            })
        } else {
            Product.remove({ _id: id })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "Product Deleted",
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/products/',
                            body: {
                                name: 'String',
                                price: 'Number'
                            }
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })

        }

    })

}