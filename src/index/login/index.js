import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import { Input, Button, message } from "antd";
import "./index.scss";

export default function Index(props) {

  const [needTxt, setNeedTxt] = useState('');
  const [needAge, setNeedAge] = useState('');


  const changeName = (e) => {
    const needText = e.currentTarget.value;
    setNeedTxt(needText)
  };

  const changeAge = (e) => {
    const needText = e.currentTarget.value;
    setNeedAge(needText)
  };

  const postMsg = () => {
    const n = needTxt;
    const a = needAge;
    axios
      .post("http://localhost:80/api/post", { username: n, password: a })
      .then((res) => {
        if (res.data.status === 0) {
          window.localStorage.setItem("username", res.data.data.username);
          props.history.push(`/index`);
        } else {
          message.error(res.data.msg);
        }
      });
  };


  return (
    <div className="bodys">
      <div className="boxes">
        <div className="container1">
          <div className="header">💴</div>
          <div className="header">我的钱去哪了</div>
          <div className="littleHeader">完成冤种金钱交付记录框架</div>
          <div className="title"></div>
        </div>
        <div className="container2">
          <div className="login">欢迎登录</div>
          {/* </> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "12%",
              marginLeft: "20%",
            }}
          >
            <div>
              用户名：
              <Input
                style={{ width: "50%" }}
                onChange={(e) => changeName(e)}
              />
            </div>
            <div style={{ marginTop: "5%", marginLeft: "4%" }}>
              密码：
              <Input
                style={{ width: "52%" }}
                onChange={(e) => changeAge(e)}
              />
            </div>
          </div>
          <div
            className="buttons"
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "12%",
              marginLeft: "23%",
            }}
          >
            <div>
              <Button className="btn" onClick={postMsg}>
                登录
              </Button>
            </div>
            <div style={{ marginLeft: "27%" }}>
              <Button className="btn">注册</Button>
            </div>
          </div>
          <div className="title"></div>
        </div>
      </div>
    </div>
  );

}
