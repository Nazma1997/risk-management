import Joi, { ObjectSchema } from "joi";

export const itemSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
    }),
    price: Joi.number().optional().min(0).messages({
        "number.min": "Price must be a positive number",
    }),
    created_at: Joi.date(),
    updated_at: Joi.date(),
});

export const deleteItemSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "Item ID cannot be empty" }),
});
