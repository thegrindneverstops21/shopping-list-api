import items = require("../models/items");
import ApiError = require("../utils/ApiError");

type Item = items.Item;
type CreateItemInput = items.CreateItemInput;
type UpdateItemInput = items.UpdateItemInput;

function validateCreateItem(body: any): CreateItemInput {
    if (typeof body !== "object" || body === null) {
        throw new ApiError(400, "Invalid request body");
    }
    if (typeof body.name !== "string" || body.name.trim() === 0) {
        throw new ApiError(400, "Invalid or missing 'name' field");
    }
    if ( body.quantity !== undefined && (typeof body.quantity !== "number" || body.quantity < 0) ) {
        throw new ApiError(400, "Invalid or missing 'quantity' field");
    }
    if(body.purchased !== undefined && typeof body.purchased !== "boolean") {
        throw new ApiError(400, "Invalid or missing 'purchased' field");
    }
    
    return {
        name: body.name.trim(),
        quantity: body.quantity,
        purchased: body.purchased
    };
}

function validateUpdateItem(body: any): UpdateItemInput {
    if(typeof body !== "object" || body === null) {
        throw new ApiError(400, "Invalid request body");
    }

    const update: UpdateItemInput = {};

    if(body.name !== undefined) {
        if(typeof body.name !== "string" || body.name.trim() === 0) {
            throw new ApiError(400, "Invalid 'name' field");
        }
        update.name = body.name.trim();
    }
    if(body.quantity !== undefined) {
        if(typeof body.quantity !== "number" || body.quantity < 0) {
            throw new ApiError(400, "Invalid 'quantity' field");
        }
        update.quantity = body.quantity;
    }

    if(body.purchased !== undefined) {
        if(typeof body.purchased !== "boolean") {
            throw new ApiError(400, "Invalid 'purchased' field");
        }
        update.purchased = body.purchased;
    }

    if(Object.keys(update).length === 0) {
        throw new ApiError(400, "No valid fields to update");
    }

    return update;
}

export = { validateCreateItem, validateUpdateItem };