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
    "insert into fooditems(name, foodcategoryid, foodsubcategoryid, type, price, offerprice, rating, picture) values(?, ?, ?, ?, ?, ?, ?, ?)",
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
  db.query(
    "select P.*, (select C.foodcategoryname from foodcategory C where C.foodcategoryid=P.foodcategoryid) as categoryname,(select S.foodsubcategoryname from foodsubcategory S where S.foodsubcategoryid=P.foodsubcategoryid) as subcategoryname,(select B.foodtype from type B where B.foodid=P.type) as typename from fooditems P",
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("display", {
          status: false,
          data: "Server Error...",
        });
      } else {
        console.log("Result : ", result);
        if (result.length == 0) {
          res.render("display", {
            status: false,
            data: "No Records Found !",
          });
        } else {
          res.render("display", {
            status: true,
            data: result,
          });
        }
      }
    }
  );
});

router.get("/addCat", function (req, res) {
  res.render("addCategory");
});

router.post("/addCategory", function (req, res) {
  db.query(
    "insert into foodcategory(foodcategoryname) values(?)",
    [req.body.foodcategoryname],
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("addCategory");
      } else {
        console.log("Result : ", result);
        res.render("addCategory");
      }
    }
  );
});

router.get("/addSubCat", function (req, res) {
  res.render("addSubCategory");
});

router.post("/addSubCategory", function (req, res) {
  db.query(
    "insert into foodsubcategory(foodcategoryid, foodsubcategoryname) values(?, ?)",
    [req.body.foodcategoryid, req.body.foodsubcategoryname],
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("addSubCategory");
      } else {
        console.log("Result : ", result);
        res.render("addSubCategory");
      }
    }
  );
});

module.exports = router;
