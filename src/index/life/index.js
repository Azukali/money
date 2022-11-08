import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tooltip, Card, Input, Button, Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import LifeSearch from './lifeSearch'

export default function Index(props) {
  useEffect(() => {
    axios.get("http://localhost:80/api/getRevenue").then((res) => {
      const data = res.data.data;
      const action = {
        type: "getItem",
        value: data,
      };
      dispatch(action);
    });
  }, []);
  const dispatch = useDispatch();
  const storeData1 = useSelector((state) => {
    return state.list;
  });
  console.log(storeData1);

  const columns = [
    // {
    //   title: "key",
    //   dataIndex: "Id",
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
              console.log(record);
              const action = {
                type: "addItem",
                value: record,
              };
              // store.dispatch(action)
              dispatch(action);
            }}
          >
            <EditOutlined style={{ color: "green" }} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
     <LifeSearch/>
      <Card
       title='Table'
       style={{ width: "96%", margin: "2%" }}
      >
        <Table columns={columns} dataSource={storeData1} />
      </Card>
    </div>
  );
}
