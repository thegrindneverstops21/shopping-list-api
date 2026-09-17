# Shopping List API

A REST API for managing a shopping list. Built with Node.js, TypeScript, and the built-in `http` module — no frameworks.

## Features

- Add items to a shopping list
- View all items or a single item by id
- Update item name, quantity, or purchased status
- Delete items
- Consistent JSON response shape with proper status codes

## Tech Stack

- Node.js
- TypeScript
- In-memory storage (array)

## Getting Started

Install dependencies:

    npm install

Run in development mode:

    npm run dev

Build and run in production:

    npm run build
    npm start

The server runs on port 3000 by default. Set a `PORT` environment variable to change it.

## API Endpoints

### 1. Add an item — `POST /items`

Body:

    { "name": "Milk", "quantity": 2 }

`quantity` and `purchased` are optional, defaulting to `1` and `false`.

**Postman screenshot:**

<!-- SCREENSHOT: POST /items - request body + 201 response -->
<img width="1920" height="1013" alt="image" src="https://github.com/user-attachments/assets/f55b5a58-6b32-42d2-9dd2-7605e261aba4" />


---

### 2. Get all items — `GET /items`

**Postman screenshot:**

<!-- SCREENSHOT: GET /items - 200 response with array -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/68440ba4-7032-44ac-a000-62d2165189e3" />


---

### 3. Get a single item — `GET /items/:id`

**Postman screenshot:**

<!-- SCREENSHOT: GET /items/:id - 200 response with single item -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a535b04f-8516-43e8-a87b-a3a5d04a5fe2" />


---

### 4. Update an item — `PUT /items/:id`

Body (any combination of fields):

    { "quantity": 1, "purchased": true }

**Postman screenshot:**

<!-- SCREENSHOT: PUT /items/:id - request body + 200 response -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/99d21c29-e9cb-4586-b0ef-44c545f7ca94" />


---

### 5. Delete an item — `DELETE /items/:id`

Returns `204 No Content` on success.

**Postman screenshot:**

<!-- SCREENSHOT: DELETE /items/:id - 204 response -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/56880b2f-5520-468a-a53e-a8c6903fc856" />


---

### 6. Error handling examples

**Missing required field (400):**

<!-- SCREENSHOT: POST /items with missing name - 400 response -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4d9f1cb7-e647-4108-80e4-5e323ace9086" />


**Item not found (404):**

<!-- SCREENSHOT: GET /items/:id with bad id - 404 response -->
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f70c6716-ff6c-4b44-a9a4-000e04f6c5f0" />


## Response Shape

Success:

    { "success": true, "data": {...} }

Error:

    { "success": false, "error": { "message": "..." } }

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Successful GET or PUT |
| 201  | Successful POST |
| 204  | Successful DELETE |
| 400  | Validation error |
| 404  | Item or route not found |
| 405  | Method not allowed on a known route |
| 500  | Unexpected server error |
