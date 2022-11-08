import React, { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { Layout, Anchor, Popover, Calendar } from "antd";
import "../index.scss";

const { Header } = Layout;
export default function TopHeader(props) {

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const content = (
    <div>
     <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );

  return (
    <Anchor>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{ paddingLeft: "82vw" }}>
          <Popover content={content} title="Calendar">
            <CalendarOutlined style={{ fontSize: "20px" }} />
          </Popover>
        </div>

        {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {this.setState({
              collapsed:!this.state.collapsed
            })},
          })} */}
      </Header>
    </Anchor>
  );
}
