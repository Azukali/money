import React, { useEffect } from "react";
import axios from "axios";
import "./index.scss";

export default function Index(props) {
  // useEffect(() => {
  //   axios.get("").then((res) => {});
  // }, []);

  // const Item = [];

  return (
    <div className="layout-all">
      <div className="layout-top">今天也不是什么好人</div>

      <div className="layout-page">
        <div className="layout-left">
          <div className="left-top">
            <div className="left-top-header"></div>
            {/* Card */}
          </div>
          <div className="left-down">{/* 饼图 */}</div>
        </div>
        <div className="layout-connect"></div>
        <div className="layout-right">
          <div className="left-top">
            <div className="left-top-header"></div>

            {/* 饼图 */}
          </div>
          <div className="left-down">{/* 折线图 */}</div>
        </div>
      </div>
    </div>
  );
}
