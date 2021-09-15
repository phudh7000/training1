const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const schema = mongoose.Schema

const SchemaTypes = mongoose.Schema.Types;

const productSchema = new schema({
    name: {type: String, unique: true, default: "", required: true},
    category: {type: String, default: "", required: true},
    price: {type: Number, min: 0, default: 0},
    color: {type: String, default: ""},
    weight: {type: SchemaTypes.Double , min: 0, default: 0},
    packingSize: {type: SchemaTypes.Double, min: 0, default: 0},
    status: {type: Boolean, default: false}

},{
    versionKey: false
})


module.exports = mongoose.model('product',productSchema)