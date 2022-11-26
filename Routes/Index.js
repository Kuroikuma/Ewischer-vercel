const express = require("express");
const router = express.Router();

const Consumer = require("../Controller/ConsumerController");
const Product = require("../Controller/ProductController");
const Working = require("../Controller/WorkingController");
const Task = require("../Controller/TaskController");

module.exports = function () {
  /*****************  USER  ********************/
  router.post("/api/consumer", Consumer.add);
  router.get("/api/consumer", Consumer.show);

  router.post("/api/product", Product.add);
  router.get("/api/product", Product.show);

  router.post("/api/working", Working.add);
  router.get("/api/working", Working.show);
  router.get("/api/working/:id", Working.showById);
  router.get("/api/workingtask/:id", Working.showWorkingTask);

  router.post("/api/task", Task.add);
  router.get("/api/task", Task.show);
  router.put("/api/task/:id", Task.updateById);

  router.post("/api/login", Working.login);

  return router;
};
