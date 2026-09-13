const { randomUUID } = require("crypto");
import type { Item, CreateItemInput, UpdateItemInput } from "../models/items";

// data is stored in this array while the server is running.
let items: Item[] = [];

function getAllItems(): Item[] {
    // Return the full list of shopping items.
    return items;
}

function getItemById(id: string): Item | undefined {
    // Search the list for one item whose id matches the route parameter.
    return items.find((item) => item.id === id);
}

function createItem(input: CreateItemInput): Item {
    // Create a new shopping item with a unique id and timestamps.
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
    // Find the item first. If it does not exist, return undefined.
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
    // Remove the item from the array if present.
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
        return false;
    }
    items.splice(index, 1);
    return true;
}

export = { getAllItems, getItemById, createItem, updateItem, deleteItem };
