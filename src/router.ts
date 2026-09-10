import ServerResponse = require("http");
import http = require("http");
import ApiError = require("./utils/ApiError");
import itemController = require("./controllers/itemController");
import response = require("./utils/response");

async function router(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
  const url = req.url || "";
  const method = req.method || "GET";
  const pathname = url.split("?")[0] || "";
  const segments = pathname.split("/").filter(Boolean);

  try {
    if (segments[0] !== "items") {
      throw new ApiError(404, "Route not found");
    }

    if (segments?.length === 1) {
      if (method === "GET")
        return await itemController.handleGetAllItems(req, res);
      if (method === "POST")
        return await itemController.handleCreateItem(req, res);
      throw new ApiError(405, `Method ${method} not allowed on /items/:id`);
    }

    if (segments?.length === 2) {
      const id = segments[1];
      if (!id) throw new ApiError(404, "Route not found");
      if (method === "GET")
        return await itemController.handleGetItemById(req, res, id);
      if (method === "PUT")
        return await itemController.handleUpdateItem(req, res, id);
      if (method === "DELETE")
        return await itemController.handleDeleteItem(req, res, id);
      throw new ApiError(405, `Method ${method} not allowed on /items/:id`);
    }

    throw new ApiError(404, "Route not found");
  } catch (error) {
    if (error instanceof ApiError) {
      response.createErrorResponse(res, error.statusCode, error.message);
    } else {
      console.error("Unexpected error:", error);
      response.createErrorResponse(res, 500, "Internal Server Error");
    }
  }
}

export = router;
