import React, { Component } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  LoadingOutlined,
  PlusOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Modal,
  Anchor,
  message,
  Upload,
} from "antd";
import "../index.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";

const { Sider } = Layout;

class SideMenu extends Component {
  state = {
    collapsed: false,
    username: "",
    logoutModal: false,
    avatarModal: false,
    loading: false,
    imageUrl: "",
  };

  componentDidMount = () => {
    const name = window.localStorage.getItem("username");
    this.setState({
      username: name,
    });
  };

  logout = () => {
    this.setState({
      logoutModal: true,
    });
  };

  changeAvatar = () => {
    this.setState({
      avatarModal: true,
    });
  };

  renderMenu = () => {
    const menu = (
      <Menu
        items={[
          {
            key: "1",
            label: <div onClick={this.logout}>Logout</div>,
          },
          {
            key: "2",
            label: <div onClick={this.changeAvatar}>Modify avatar</div>,
          },
        ]}
      />
    );
    return menu;
  };

  okFun = () => {
    console.log(this);
    this.props.history.push(`/login`);
  };

  cancel = () => {
    this.setState({
      logoutModal: false,
    });
  };

  okAvatarModal = () => {
    const value = this.state.imageUrl;
    axios.post("http://localhost:80/api/postUpload", { value }).then((res) => {
      if (res.data.status === 0) {
      } else {
      }
    });
    this.setState({
      avatarModal: false,
    });
  };

  cancelAvatarModal = () => {
    this.setState({
      avatarModal: false,
    });
  };

  changeRoute = (e) => {
    const path = e.key;
    if (path === "1") {
      this.props.history.push(`index`);
    }
    if (path === "2") {
      this.props.history.push(`come`);
    }
    if (path === "3") {
      this.props.history.push(`life`);
    }
    if (path === "4") {
      this.props.history.push(`see`);
    }
  };

  uploadButton = () => {
    return (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({
        loading: true,
      });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (url) => {
        this.setState({
          loading: false,
        });
        this.setState({
          imageUrl: url,
        });
      });
    }
  };

  render() {
    return (
      <Anchor style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="bar">
            <div style={{ paddingBottom: "8%", paddingLeft: "15%" }}>
              Harvey Project🍧
            </div>
          </div>
          <div
            style={{
              paddingTop: "10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "10%",
            }}
          >
            <Avatar size={100} src={this.state.imageUrl} />
            <div style={{ paddingTop: "10%" }}>welcome</div>
            <Dropdown overlay={this.renderMenu()} style={{ paddingTop: "3%" }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {this.state.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            onClick={(e) => {
              this.changeRoute(e);
            }}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dashboard",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Revenue",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Living expenses",
              },
              {
                key: "4",
                icon: <AreaChartOutlined />,
                label: "Dashboard",
              },
            ]}
          />
        </Sider>
        <Modal
          visible={this.state.logoutModal}
          onOk={this.okFun}
          onCancel={this.cancel}
        >
          Are you sure to log out
        </Modal>
        <Modal
          visible={this.state.avatarModal}
          onOk={this.okAvatarModal}
          onCancel={this.cancelAvatarModal}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:80/api/post"
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {this.state.imageUrl ? (
              <img
                src={this.state.imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              this.uploadButton()
            )}
          </Upload>
        </Modal>
      </Anchor>
    );
  }
}
export default withRouter(SideMenu);
