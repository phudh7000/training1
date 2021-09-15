const Product = require('../models/product')
const csv = require('csv-parse')
const converter = require('json-2-csv')
const fs = require('fs')

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
    const keys = ['category', 'color', 'name', 'packingSize', 'price', 'status', 'weight'].sort();

    fs.createReadStream(`./uploads/${req.file.filename}`)
        .pipe(csv({ relax_column_count: true, columns: true }))
        .on('data', (data) => {

            if (JSON.stringify(Object.keys(data).sort()) === JSON.stringify(keys)) {
               results.push(data) 
            }
        })
        .on('error', (err) => {
            return next(err)
        })
        .on('end', async () => {

            await Product.deleteMany({})
            Product.insertMany(results)
            .then(()=>res.json(results))
            .catch(err=> next(err));

        });
}


const exportData = async (req, res, next) => {

    let result = await Product.find({},{_id: 0});

    result = result.map((item)=>item.toObject());
    
    converter.json2csv(result, (err, csv) => {
        if (err) {
            return next(err);
        }
    
        fs.writeFile('./data.csv', csv, function (err) {
            if (err) {
              return next(err);
            }
            res.download('./data.csv', function (err) {
                if(err) return next(err)
            });
          });
        

    });

}


module.exports = {
    getAll,
    newProduct,
    deleteProduct,
    updateProduct,
    filterProduct,
    importData,
    exportData
}