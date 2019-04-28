var Joi = require('joi');

  module.exports = Joi.object().keys({
      username:Joi.string().required(),
      email:Joi.string().email().required(),
      mobile:Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
 
  });

