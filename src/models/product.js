const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const schema = mongoose.Schema

const SchemaTypes = mongoose.Schema.Types;

const productSchema = new schema({
    name: {type: String, unique: true, required: true},
    category: {type: String, required: true},
    price: {type: Number, min: 0, default: 0},
    color: {type: String},
    weight: {type: SchemaTypes.Double , min: 0},
    packingSize: {type: SchemaTypes.Double, min: 0},
    status: {type: Boolean, default: false}

})


module.exports = mongoose.model('product',productSchema)