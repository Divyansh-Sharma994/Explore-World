const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing:{
        title: Joi.string().required(),
        description: Joi.string().required(),
        image:{
            url: Joi.string().allow("",null),
            fileName: Joi.string().allow("",null)
        },
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()
    }
});

module.exports.reviewSchema = Joi.object({
    review: {
        comment: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5)
   }
});