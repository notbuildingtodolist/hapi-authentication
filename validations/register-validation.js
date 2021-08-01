const Joi = require("joi");

module.exports = Joi.object({
  first_name: Joi.string().required().label("First name"),
  last_name: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});
