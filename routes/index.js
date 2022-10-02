var express = require("express");
const { LocalStorage } = require("node-localstorage");
var router = express.Router();
var db = require("./db");
var localstorage = require("node-localstorage").localstorage;

localstorage = new LocalStorage("./userscratch");

router.get("/error", function (req, res) {
  res.render("bigError");
});

router.get("/signup", function (req, res) {
  try {
    var user = JSON.parse(localstorage.getItem("usertoken"));

    if (user !== null) {
      res.redirect("/");
    } else {
      res.render("userSignup", { msg: "" });
    }
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

router.post("/signedup", function (req, res) {
  try {
    db.query(
      "insert into userlogin (username, useremail, usercontact, useraddress, userpincode, userpassword) values(?, ?, ?, ?, ?, ?)",
      [
        req.body.username,
        req.body.useremail,
        req.body.usercontact,
        req.body.useraddress,
        req.body.userpincode,
        req.body.userpassword,
      ],
      function (error, result) {
        if (error) {
          res.render("userSignUp", { msg: "Error" });
        } else {
          res.render("userSignUp", { msg: "Account Created Successfully" });
        }
      }
    );
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

router.get("/signin", function (req, res) {
  try {
    var user = JSON.parse(localstorage.getItem("usertoken"));

    if (user !== null) {
      res.redirect("/");
    } else {
      res.render("userSignin", { msg: "" });
    }
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

router.post("/checkuser", function (req, res) {
  try {
    db.query(
      "select * from userlogin where useremail = ? and userpassword = ?",
      [req.body.useremail, req.body.userpassword],
      function (error, result) {
        if (error) {
          res.render("userSignin", { msg: "Server Error" });
        } else {
          if (result.length === 1) {
            localstorage.setItem("usertoken", JSON.stringify(result[0]));
            res.redirect("/");
          } else {
            res.render("userSignin", { msg: "Invalid Email or Password" });
          }
        }
      }
    );
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

router.get("/signout", function (req, res) {
  try {
    localstorage.removeItem("usertoken");
    res.redirect("/");
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

/* GET home page. */
router.get("/", function (req, res) {
  try {
    db.query(
      "select P.*,(select B.type from type B where B.foodid=P.type) as typename from fooditems P",
      function (error, result) {
        var user = JSON.parse(localstorage.getItem("usertoken"));

        if (error) {
          res.render("index", { status: false, data: null, user: null });
        } else {
          if (user === null) {
            res.render("index", { status: true, data: result, user: null });
          } else {
            res.render("index", { status: true, data: result, user: user });
          }
        }
      }
    );
  } catch (error) {
    localstorage.removeItem("usertoken");
    res.redirect("/error");
  }
});

module.exports = router;
