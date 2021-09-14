const Joi = require('joi')


const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body);
        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        }
        next()
    }
}



const createProductSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().min(0).required(),
    color: Joi.string(),
    weight: Joi.number().min(0),
    packingSize: Joi.number().min(0),
    status: Joi.boolean().default(false)
})
const updateProductSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string(),
    category: Joi.string(),
    price: Joi.number().min(0),
    color: Joi.string(),
    weight: Joi.number().min(0),
    packingSize: Joi.number().min(0),
    status: Joi.boolean().default(false)
})

const createUserSchema = Joi.object({
    username: Joi.string().length(8).required(),
    password: Joi.string().required()
})

module.exports = {
    validateBody,
    createProductSchema,
    updateProductSchema,
    createUserSchema
}

// try {
//     const {error, value} = productSchema.validate({
//         name: "12",
//         category: "phuong tien",
//         price: 15,
//         weight: 32.5,
//         packingSize: 45,
//     })
//     console.log(error)
// } catch (error) {
//     console.log(error)
// }


