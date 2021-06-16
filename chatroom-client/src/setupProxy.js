const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/ws", { target: "http://localhost:8080/",ws:true })
  );
  app.use(
    createProxyMiddleware("/topic", { target: "http://localhost:8080/",ws:true })
  );
  app.use(
    createProxyMiddleware("/user", { target: "http://localhost:8080/",ws:true })
  );
};