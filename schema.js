const Joi = require('joi');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null),
        geometry: Joi.object({ // GeoJSON validation
            type: Joi.string().valid("Point").required(),
            coordinates: Joi.array()
                .items(Joi.number().required())
                .length(2)
                .required(),
        }).optional(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        Comment: Joi.string().required(),
    }).required(),
});