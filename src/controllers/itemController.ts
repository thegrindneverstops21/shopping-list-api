import ServerResponse = require("http");
import http = require("http");
import response = require("../utils/response");
import itemStore = require("../store/itemStore");
import ApiError = require("../utils/ApiError");
import parseBody = require("../utils/parseBody");
import itemValidation = require("../validation/itemValidation");

// controller functions are the handlers for each API route.
// They read the incoming request, validate it, call the store, and send back a response.

async function handleGetAllItems(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
  // Return every item in the list.
  response.createSuccessResponse(
    res,
    200,
    await (itemStore as any).getAllItems(),
  );
}

async function handleGetItemById(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string,
): Promise<void> {
  // Look up one specific item by its unique id.
  const item = await (itemStore as any).getItemById(id);
  if (!item) throw new ApiError(404, `Item with id ${id} not found`);
  response.createSuccessResponse(res, 200, item);
}

async function handleCreateItem(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
  // Read the JSON body from the request first.
  const body = await parseBody.parseJsonBody<any>(req);
  // Make sure the data looks valid before saving it.
  const input = itemValidation.validateCreateItem(body);
  const item = itemStore.createItem(input);
  response.createSuccessResponse(res, 201, item);
}

async function handleUpdateItem(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string,
): Promise<void> {
  // Update a single item using the id from the route and the data from the request body.
  const body = await parseBody.parseJsonBody<any>(req);
  const input = itemValidation.validateUpdateItem(body);
  const updated = itemStore.updateItem(id, input);
  if (!updated) throw new ApiError(404, `Item with id ${id} not found`);
  response.createSuccessResponse(res, 200, updated);
}

async function handleDeleteItem(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string,
): Promise<void> {
  // Remove the item if it exists; otherwise return a 404 error.
  const deleted = itemStore.deleteItem(id);
  if (!deleted) throw new ApiError(404, `Item with id ${id} not found`);
  response.sendNoContent(res);
}

export = {handleGetAllItems, handleGetItemById, handleCreateItem, handleUpdateItem, handleDeleteItem};