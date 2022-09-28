var express = require("express");
var router = express.Router();
var db = require("./db");

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

router.get("/add", function (req, res) {
  res.render("addItem");
});

router.post("/addItem", function (req, res) {});

module.exports = router;
