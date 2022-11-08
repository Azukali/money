const express = require("express");

const router = express.Router();

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

// 登录部分接口

router.post("/post", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "123456") {
    res.send({
      status: 0,
      msg: "post请求成功",
      data: req.body,
    });
  } else {
    res.send({
      status: 1,
      msg: "账号或密码错误",
      data: req.body,
    });
  }
});

// 收入管理新建

router.post("/postRevenue", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    name: body.name,
    source: body.source,
    amount: body.amount,
    remark: body.remark,
    date: body.date,
  };
  const sqlStr =
    "INSERT INTO zjc(name,source,amount,remark,date) VALUES (?,?,?,?,?)";
  db.query(
    sqlStr,
    [user.name, user.source, user.amount, user.remark, user.date],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});

// 收入管理查询
router.get("/getRevenue", (req, res) => {
  db.query("select * from zjc ", (err, result) => {
    if (err) {
      console.log(err + "err");
    } else {
      res.send({
        status: 0,
        msg: "success",
        data: result,
      });
    }
  });
});

// 收入管理修改

router.put("/putRevenue", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    name: body.name,
    source: body.source,
    amount: body.amount,
    remark: body.remark,
    date: body.date,
    id: body.id,
  };
  const sqlStr =
    "update zjc set name=?,source=?,amount=? ,remark=? ,date=? where id=? ";
  db.query(
    sqlStr,
    [user.name, user.source, user.amount, user.remark, user.date, user.id],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});

// 收入管理删除

router.delete("/deleteRevenue/:id", (req, res) => {
  const body = req.params.id;
  console.log(body);
  const sqlStr = "delete from zjc where id = ?";
  db.query(sqlStr, [body], (err, result) => {
    if (err) {
      console.log(err + "err");
    }
    if (result.affectedRows === 1) {
      console.log("success");
      res.send({
        status: 0,
        msg: "success",
      });
    }
  });
});

router.post("/postUpload", (req, res) => {
  debugger
  const body = req.body;
  const user = {
    name: body.url,
  };
  const sqlStr =
    "update picture set url=? where id=1 ";
  db.query(
    sqlStr,
    [user.name, user.url, user.id],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});


module.exports = router;
