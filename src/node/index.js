const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); 
// app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
app.use(cors());
const router = require('./router')
app.use('/api',router)
//启动服务器
app.listen(80, () => {
  console.log("express running at http://127.0.0.1"); //启动成功的回调
});