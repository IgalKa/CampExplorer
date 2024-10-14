const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const joi = baseJoi.extend(extension)

module.exports.campgroundValSchema = joi.object({
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        description: joi.string().required().escapeHTML(),
        price: joi.number().min(0).required(),
        location: joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: joi.array()
})


module.exports.reviewValSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        text: joi.string().required().escapeHTML(),
    }).required()
})