const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const PORT = 9000;

server.use(middlewares);
server.use("/api", router);
server.listen(9000, () => {
  console.log(`JSON Server is running in http://locahost:${PORT}`);
});
