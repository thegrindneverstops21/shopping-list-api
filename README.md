# Shopping List API

A TypeScript Node.js HTTP API for managing an in-memory shopping list.

## Run

```powershell
npm install
npm run dev
```

The server listens on `http://localhost:3000` by default. Set `PORT` to use another port.

For a production-style run:

```powershell
npm run build
npm start
```

## Response format

Successful responses use:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "error": {
    "message": "..."
  }
}
```

## Endpoints

| Method | Path | Description | Success |
| --- | --- | --- | --- |
| `GET` | `/items` | Return all items | `200` |
| `POST` | `/items` | Create an item | `201` |
| `GET` | `/items/:id` | Return one item | `200` |
| `PUT` | `/items/:id` | Update one or more fields | `200` |
| `DELETE` | `/items/:id` | Delete an item | `204` |

### Create an item

`POST /items`

```json
{
  "name": "Milk",
  "quantity": 2,
  "purchased": false
}
```

Only `name` is required. `quantity` defaults to `1` and `purchased` defaults to `false`.

### Update an item

`PUT /items/:id`

Send one or more of these fields:

```json
{
  "quantity": 2,
  "purchased": true
}
```

## Validation and errors

- `400` for invalid JSON, missing or invalid fields, or an empty update.
- `404` when an item or route does not exist.
- `405` when a route does not support the requested method.
- `204` when an item is deleted successfully.

## Postman

Import [`postman/shopping-list-api.postman_collection.json`](postman/shopping-list-api.postman_collection.json) into Postman. Run `Create item` first; its test script stores the returned ID in the collection variable `itemId`, which the detail, update, and delete requests use.

The collection includes the CRUD flow plus validation and not-found checks.

## Notes

Items are stored in memory, so they are cleared whenever the server restarts.
