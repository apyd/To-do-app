const Joi = require('@hapi/joi');

const validateRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).trim().required(),
        email: Joi.string().min(6).max(50).required().email().required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).trim().required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
};

const validateTask = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        done: Joi.boolean()
    });
    return schema.validate(data);
};

module.exports.validateLogin = validateLogin;
module.exports.validateRegister = validateRegister;
module.exports.validateTask = validateTask;