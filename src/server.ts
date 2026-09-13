import http = require("http");
import router = require("./router");

// It creates the HTTP server and starts listening for incoming requests.
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer((req, res) => {
  // Send each request to the router so it can decide what to do.
  router(req, res);
});

server.listen(PORT, () => {
  // Helpful message so a beginner knows the API is running.
  console.log(`Shopping List API is running on http://localhost:${PORT}`);
});
