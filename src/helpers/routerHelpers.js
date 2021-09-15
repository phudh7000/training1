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
    _id: Joi.string().required(),
    name: Joi.string(),
    category: Joi.string(),
    price: Joi.number().min(0),
    color: Joi.string(),
    weight: Joi.number().min(0),
    packingSize: Joi.number().min(0),
    status: Joi.boolean().default(false)
})

const deleteProductSchema = Joi.object({
    _id: Joi.string().required()
})

const createUserSchema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
})

const updateUserSchema = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().min(8),
    password: Joi.string().min(8),
    role: Joi.string()
})

const deleteUserSchema = Joi.object({
    _id: Joi.string().required()
})

module.exports = {
    validateBody,
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    createUserSchema,
    updateUserSchema,
    deleteUserSchema

}

// try {
//     const {error, value} = createUserSchema.validate({
//         username: "8fdsfsdfds",
//         password: "12345646",
//         role: "hha"
//     })
//     console.log(error)
// } catch (error) {
//     console.log(error)
// }


