var express = require("express");
const { LocalStorage } = require("node-localstorage");
var router = express.Router();
var db = require("./db");
var localstorage = require("node-localstorage").localstorage;

localstorage = new LocalStorage("./userscratch");

/* GET home page. */
router.get("/", function (req, res) {
  db.query(
    "select P.*,(select B.type from type B where B.foodid=P.type) as typename from fooditems P",
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("index", { status: false, data: [] });
      } else {
        console.log("Result : ", result);
        res.render("index", { status: true, data: result });
      }
    }
  );
});

router.get("/signup", function (req, res) {
  res.render("userSignup");
});

module.exports = router;
