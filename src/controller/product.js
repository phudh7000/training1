const Product = require('../models/product')

const getAll = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        next(error)
    }
}

const newProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let { _id } = req.body;
        await Product.deleteOne({ _id })
        res.json('delete seccess');
    } catch (error) {
        next(error)
    }
}
const updateProduct = async (req, res, next) => {
    try {
        let { _id, ...product } = req.body;
        await Product.updateOne({ _id }, product)
        res.json('update seccess');
    } catch (error) {
        next(error)
    }
}


const filterProduct = async (req, res, next) => {
    try {
        const products = await Product.find(req.query);
        res.json(products)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAll,
    newProduct,
    deleteProduct,
    updateProduct,
    filterProduct
}