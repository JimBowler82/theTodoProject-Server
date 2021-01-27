const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(7).max(255).required(),
  });
  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(7).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
