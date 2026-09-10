import http = require("http");
import router = require("./router");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Shopping List API is running on http://localhost:${PORT}`);
});
