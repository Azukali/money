import React, { useState, useEffect, useRef } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Modal,
  Table,
  message,
  Tooltip,
  Divider,
  Form,
} from "antd";
import ComeAddModal from "./ComeAddModal";
import ComeEditModal from "./ComeEditModal";
import axios from "axios";
import Chart from "./Charts";

export default function Index(props) {
  const [addRe, setAddRe] = useState(false);
  const [editRe, setEditRe] = useState(false);
  const [data, setData] = useState("");
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [updateData, setUpdateData] = useState(true);
  const [editData, setEditData] = useState("");
  const [deleteRe, setDeleteRe] = useState("");
  const [deleteModal,setDeleteModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      setData(res.data.data);
    });
  }, [updateData]);

  const addSubmit = () => {
    formRef.current.validateFields().then((value) => {
      axios
        .post("http://localhost:80/api/postRevenue", { ...value })
        .then((res) => {
          if (res.data.status === 0) {
            setAddRe(false);
            setUpdateData(!updateData);
            message.success(res.data.msg);
          } else {
            message.error("unknown error");
          }
        });
    });
  };

  const addCanel = () => {
    setAddRe(false);
  };

  const editCanel = () => {
    setEditRe(false);
  };

  const handleColClick = (record) => {
    console.log(record)
  }

  function deleteFunc() {
    const deleteIs = deleteRe
    debugger
    axios
      .delete(`http://localhost:80/api/deleteRevenue/${deleteRe}`)
      .then((res) => {
        if (res.data.status === 0) {
          setUpdateData(!updateData);
          setDeleteModal(false)
          message.success(res.data.msg);
        } else {
          message.error("unknown error");
        }
      });
  }



  const columns = [
    // {
    //   title:"id",
    //   dataIndex: "id",
    // },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "source",
      dataIndex: "source",
    },
    {
      title: "amount",
      dataIndex: "amount",
      render: (record) => {
        return <div>{record}￥</div>;
      },
    },
    {
      title: "date",
      dataIndex: "date",
      
    },
    {
      title: "remark",
      dataIndex: "remark",
    },
    {
      title: "operation",
      // width: "15%",
      align: "center",
      render: (record) => (
        <div>
          <Tooltip
            title="edit"
            onClick={() => {
              form.setFieldsValue(record);
              setEditData(record.id);
              setEditRe(true);
            }}
          >
            <EditOutlined style={{ color: "green" }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip
            title="delete"
            onClick={() => {
              debugger
              setDeleteRe(record.id);
              setDeleteModal(true)
            }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Chart   updateData={updateData}/>
      <Card
        style={{ width: "96%", margin: "2%" }}
        title="Revenue management"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setAddRe(true);
              formRef.current.resetFields();
            }}
          >
            Create new
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={data} 
          onRow={ record => { 
            return { onDoubleClick: () => handleColClick(record) };
        }}
        />
      </Card>
      <Modal
        title="Create new"
        visible={addRe}
        onOk={addSubmit}
        onCancel={addCanel}
      >
        <ComeAddModal ref={formRef} />
      </Modal>
      <ComeEditModal
        form={form}
        editCanel={editCanel}
        editRe={editRe}
        id={editData}
        updateDataFun={setUpdateData}
        updateData={updateData}
      />
      <Modal
        title="Delete item"
        visible={deleteModal}
        onOk={deleteFunc}
        onCancel={()=>{
          setDeleteModal(false)
        }}
      >
       Are you sure to delete this item?
      </Modal>
    </div>
  );
}
