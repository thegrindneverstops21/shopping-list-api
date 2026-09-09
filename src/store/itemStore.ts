const { randomUUID } = require("crypto");
import type { Item, CreateItemInput, UpdateItemInput } from "../models/items";


let items: Item[] = [];

function getAllItems(): Item[] {
    return items;   
}

function getItemById(id: string): Item | undefined {
    return items.find((item) => item.id === id);
}

function createItem(input: CreateItemInput): Item {
    const now = new Date();
    const newItem: Item = {
        id: randomUUID(),
        name: input.name,
        quantity: input.quantity ?? 1,
        purchased: input.purchased ?? false,
        createdAt: now,
        updatedAt: now
    };
    items.push(newItem);
    return newItem;
}

function updateItem(id: string, input: UpdateItemInput): Item | undefined {
    const item = getItemById(id);
    if (!item) {
        return undefined;
    }
    const now = new Date();
    item.name = input.name ?? item.name;
    item.quantity = input.quantity ?? item.quantity;
    item.purchased = input.purchased ?? item.purchased;
    item.updatedAt = now;
    return item;
}

function deleteItem(id: string): boolean {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
        return false;
    }
    items.splice(index, 1);
    return true;
}

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
