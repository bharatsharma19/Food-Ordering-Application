var express = require("express");
const { LocalStorage } = require("node-localstorage");
var router = express.Router();
var db = require("./db");
var upload = require("./multer");
var localstorage = require("node-localstorage").localstorage;

localstorage = new LocalStorage("./scratch");

router.get("/signup", function (req, res) {
  res.render("adminSignup", { message: "", messageError: "" });
});

router.post("/signedup", function (req, res) {
  db.query(
    "insert into adminlogin (adminname, adminemail, admincontact, adminpassword) values(?, ?, ?, ?)",
    [
      req.body.adminname,
      req.body.adminemail,
      req.body.admincontact,
      req.body.adminpassword,
    ],
    function (error, result) {
      if (error) {
        res.render("adminSignup", {
          message: "",
          messageError: "Server Error",
        });
      } else {
        res.render("adminSignup", {
          message: "Account Created Successfully",
          messageError: "",
        });
      }
    }
  );
});

router.get("/signin", function (req, res) {
  res.render("adminSignin", { msg: "" });
});

router.post("/checkadmin", function (req, res) {
  db.query(
    "select * from adminlogin where (adminemail = ? or admincontact = ?) and adminpassword = ?",
    [req.body.adminemail, req.body.admincontact, req.body.adminpassword],
    function (error, result) {
      if (error) {
        console.log("Error : ", error);
        res.render("adminSignin", { msg: "Server Error" });
      } else {
        console.log("Result : ", result);
        if (result.length === 1) {
          localstorage.setItem("token", JSON.stringify(result[0]));
          res.redirect("/admin/dashboard");
        } else {
          res.render("adminSignin", {
            msg: "Invalid Email/Contact or Password",
          });
        }
      }
    }
  );
});

router.get("/signout", function (req, res) {
  localstorage.removeItem("token");
  res.redirect("/");
});

/* GET home page. */
router.get("/dashboard", function (req, res) {
  var query =
    "select count(*) as countCategory from foodcategory; select count(*) as countSubCategory from foodsubcategory; select count(*) as countTotalItems from fooditems";

  db.query(query, function (error, result) {
    var admin = JSON.parse(localstorage.getItem("token"));

    if (admin === null) {
      res.render("adminSignIn", { msg: "Don't need to do that" });
    } else {
      if (error) {
        res.render("dashboard", { status: false, result: [] });
      } else {
        console.log(result);
        res.render("dashboard", {
          status: true,
          result: result,
          admin: admin,
        });
      }
    }
  });
});

router.get("/add", function (req, res) {
  var admin = JSON.parse(localstorage.getItem("token"));

  if (admin === null) {
    res.render("adminSignIn", { msg: "Don't need to do that" });
  } else {
    res.render("addItem", { msg: "" });
  }
});

router.get("/fetch_all_types", function (req, res) {
  db.query("select * from type", function (error, result) {
    var admin = JSON.parse(localstorage.getItem("token"));
    if (admin === null) {
      res.render("adminSignIn", { msg: "Don't need to do that" });
    } else {
      if (error) {
        {
          res.status(500).json([]);
        }
      } else {
        res.status(200).json({
          types: result,
        });
      }
    }
  });
});

router.get("/fetch_all_categories", function (req, res) {
  db.query("select * from foodcategory", function (error, result) {
    var admin = JSON.parse(localstorage.getItem("token"));

    if (admin === null) {
      res.render("adminSignIn", { msg: "Don't need to do that" });
    } else {
      if (error) {
        {
          res.status(500).json([]);
        }
      } else {
        res.status(200).json({
          category: result,
        });
      }
    }
  });
});

router.get("/fetch_all_subcategories", function (req, res) {
  db.query(
    "select * from foodsubcategory where foodcategoryid=?",
    [req.query.foodcategoryid],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
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
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.render("addItem", { msg: "Server Error" });
        } else {
          res.render("addItem", { msg: "" });
        }
      }
    }
  );
});

router.get("/display", function (req, res) {
  db.query(
    "select P.*, (select C.foodcategoryname from foodcategory C where C.foodcategoryid=P.foodcategoryid) as categoryname,(select S.foodsubcategoryname from foodsubcategory S where S.foodsubcategoryid=P.foodsubcategoryid) as subcategoryname,(select B.foodtype from type B where B.foodid=P.type) as typename from fooditems P",
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.render("display", {
            status: false,
            data: "Server Error...",
          });
        } else {
          if (result.length == 0) {
            res.render("display", {
              status: false,
              index: 0,
              data: "No Records Found !",
            });
          } else {
            res.render("display", {
              status: true,
              index: 0,
              data: result,
            });
          }
        }
      }
    }
  );
});

router.get("/addCat", function (req, res) {
  var admin = JSON.parse(localstorage.getItem("token"));

  if (admin === null) {
    res.render("adminSignIn", { msg: "Don't need to do that" });
  } else {
    res.render("addCategory");
  }
});

router.get("/deleteCat", function (req, res) {
  var admin = JSON.parse(localstorage.getItem("token"));

  if (admin === null) {
    res.render("adminSignIn", { msg: "Don't need to do that" });
  } else {
    res.render("deleteCategory");
  }
});

router.post("/addCategory", function (req, res) {
  db.query(
    "insert into foodcategory(foodcategoryname) values(?)",
    [req.body.foodcategoryname],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.render("addCategory");
        } else {
          res.render("addCategory");
        }
      }
    }
  );
});

router.get("/addSubCat", function (req, res) {
  var admin = JSON.parse(localstorage.getItem("token"));

  if (admin === null) {
    res.render("adminSignIn", { msg: "Don't need to do that" });
  } else {
    res.render("addSubCategory");
  }
});

router.get("/deleteSubCat", function (req, res) {
  var admin = JSON.parse(localstorage.getItem("token"));

  if (admin === null) {
    res.render("adminSignIn", { msg: "Don't need to do that" });
  } else {
    res.render("deleteSubCategory");
  }
});

router.post("/addSubCategory", function (req, res) {
  db.query(
    "insert into foodsubcategory(foodcategoryid, foodsubcategoryname) values(?, ?)",
    [req.body.foodcategoryid, req.body.foodsubcategoryname],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.render("addSubCategory");
        } else {
          res.render("addSubCategory");
        }
      }
    }
  );
});

router.get("/editProduct", function (req, res) {
  db.query(
    "update fooditems set name=?, foodcategoryid=?, foodsubcategoryid=?, price=?, offerprice=?, rating=? where id = ?",
    [
      req.query.name,
      req.query.foodcategoryid,
      req.query.foodsubcategoryid,
      req.query.price,
      req.query.offerprice,
      req.query.rating,
      req.query.id,
    ],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.status(500).json({
            status: false,
            message: "Server Error...",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Record Successfully Modified!",
          });
        }
      }
    }
  );
});

router.get("/deleteItem", function (req, res) {
  db.query(
    "delete from fooditems where id = ?",
    [req.query.id],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.status(500).json({
            status: false,
            message: "Server Error...",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Record Successfully Deleted!",
          });
        }
      }
    }
  );
});

router.post("/updatePicture", upload.any(), function (req, res) {
  db.query(
    "update fooditems set picture = ? where id = ?",
    [req.files[0].filename, req.body.id],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.status(500).json({ status: false, message: "Server Error" });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Picture Updated Successfully" });
        }
      }
    }
  );
});

router.get("/deleteCategory", function (req, res) {
  db.query(
    "delete from foodcategory where foodcategoryid = ?; delete from foodsubcategory where foodcategoryid = ?;delete from fooditems where foodcategoryid = ?",
    [
      req.query.foodcategoryid,
      req.query.foodcategoryid,
      req.query.foodcategoryid,
    ],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.redirect("/admin/deleteCat");
        } else {
          res.redirect("/admin/deleteCat");
        }
      }
    }
  );
});

router.get("/deleteSubCategory", function (req, res) {
  db.query(
    "delete from foodsubcategory where foodsubcategoryid = ? and foodcategoryid = ?;delete from fooditems where foodsubcategoryid = ? and foodcategoryid = ?",
    [
      req.query.foodsubcategoryid,
      req.query.foodcategoryid,
      req.query.foodsubcategoryid,
      req.query.foodcategoryid,
    ],
    function (error, result) {
      var admin = JSON.parse(localstorage.getItem("token"));

      if (admin === null) {
        res.render("adminSignIn", { msg: "Don't need to do that" });
      } else {
        if (error) {
          res.redirect("/admin/deleteSubCat");
        } else {
          res.redirect("/admin/deleteSubCat");
        }
      }
    }
  );
});

module.exports = router;
