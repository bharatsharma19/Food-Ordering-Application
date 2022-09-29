var express = require("express");
var router = express.Router();
var db = require("./db");
var upload = require("./multer");

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

router.get("/add", function (req, res) {
  res.render("addItem", { msg: "" });
});

router.get("/fetch_all_types", function (req, res) {
  db.query("select * from type", function (error, result) {
    if (error) {
      {
        res.status(500).json([]);
      }
    } else {
      res.status(200).json({
        types: result,
      });
    }
  });
});

router.get("/fetch_all_categories", function (req, res) {
  db.query("select * from foodcategory", function (error, result) {
    if (error) {
      {
        res.status(500).json([]);
      }
    } else {
      res.status(200).json({
        category: result,
      });
    }
  });
});

router.get("/fetch_all_subcategories", function (req, res) {
  db.query(
    "select * from foodsubcategory where foodcategoryid=?",
    [req.query.foodcategoryid],
    function (error, result) {
      if (error) {
        {
          res.status(500).json([]);
        }
      } else {
        res.status(200).json({
          subcategory: result,
        });
      }
    }
  );
});

router.post("/addItem", upload.any(), function (req, res) {
  db.query(
    "insert into fooditems(name, foodcategoryname, foodsubcategoryname, type, price, offerprice, rating, picture) values(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.name,
      req.body.foodcategoryid,
      req.body.foodsubcategoryid,
      req.body.foodid,
      req.body.price,
      req.body.offerprice,
      req.body.rating,
      req.files[0].filename,
    ],
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("addItem", { msg: "Server Error" });
      } else {
        console.log("Result : ", result);
        res.render("addItem", { msg: "" });
      }
    }
  );
});

router.get("/display", function (req, res) {
  res.render("display");
});

module.exports = router;
