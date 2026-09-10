import ServerResponse = require("http");
import http = require("http");
import response = require("../utils/response");
import itemStore = require("../store/itemStore");
import ApiError = require("../utils/ApiError");
import parseBody = require("../utils/parseBody");
import itemValidation = require("../validation/itemValidation");
import parseJsonBody = require("../utils/parseBody");
import validateUpdateItem = require("../validation/itemValidation");

async function handleGetAllItems(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
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
  const item = await (itemStore as any).getItemById(id);
  if (!item) throw new ApiError(404, "Item with id " + "${id}" + " not found");
  response.createSuccessResponse(res, 200, item);
}

async function handleCreateItem(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
  const body = await parseBody.parseJsonBody<any>(req);
  const input = itemValidation.validateCreateItem(body);
  const item = itemStore.createItem(input);
  response.createSuccessResponse(res, 201, item);
}

async function handleUpdateItem(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string,
): Promise<void> {
  const body = await parseBody.parseJsonBody<any>(req);
  const input = itemValidation.validateUpdateItem(body);
  const updated = itemStore.updateItem(id, input);
  if (!updated) throw new ApiError(404, "Item with " + "${id}" + "not found");
  response.createSuccessResponse(res, 200, updated);
}

export = {handleGetAllItems, handleGetItemById, handleCreateItem, handleUpdateItem};