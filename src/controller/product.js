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
        res.json("wrong _id");
    }
}
const updateProduct = async (req, res, next) => {
    try {
        let { _id, ...product } = req.body;
        await Product.updateOne({ _id }, product)
        res.json('update seccess');
    } catch (error) {
        res.json("wrong _id");
    }
}


const filterProduct = async (req, res, next) => {
    try {
        const products = await Product.find(req.query);
        res.json(products)
    } catch (error) {
        next(error);
    }
}

const importData = (req, res, next) => {
    const results = [];

    fs.createReadStream(`../../uploads/${req.file.filename}`)
        .pipe(csv({columns: true}))
        .on('data', (data) => results.push(data))
        .on('error',(err)=>{
            next(err)
        })
        .on('end', async () => {
            // await product.deleteMany({})
        
            // product.insertMany(results)
            // .then(rs=>console.log(rs))
            // .catch(err=>console.log(err));
             res.json(results);
        });
}


module.exports = {
    getAll,
    newProduct,
    deleteProduct,
    updateProduct,
    filterProduct,
    importData
}