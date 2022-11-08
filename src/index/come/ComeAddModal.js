import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, InputNumber ,Select} from 'antd'

const { TextArea } = Input;
const {Option} = Select
const AddForm = forwardRef((props, ref) => {


    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            ref={ref}
        >
            <Form.Item
                label="name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your name!',
                    },
                ]}
            >
                <Input placeholder="Please enter your name" />
            </Form.Item>
            <Form.Item
                label="source"
                name="source"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the source!',
                    },
                ]}
            >
                <Input placeholder="Please enter the source" />
            </Form.Item>
            <Form.Item
                label="amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the amount!',
                    },
                ]}
            >
                <InputNumber placeholder="Please enter the amount" style={{width:"100%"}} />
            </Form.Item>
            <Form.Item
                label="date"
                name="date"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the date!',
                    },
                ]}
            >
                <Select  placeholder="Please enter the date">
                    <Option key="Mon" value="Mon">Mon</Option>
                    <Option key="Tue" value="Tue">Tue</Option>
                    <Option key="Wed" value="Wed">Wed</Option>
                    <Option key="Thu" value="Thu">Thu</Option>
                    <Option key="Fri" value="Fri">Fri</Option>
                    <Option key="Sat" value="Sat">Sat</Option>
                    <Option key="Sun" value="Sun">Sun</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="remark"
                name="remark"
            >
                <TextArea placeholder="Please enter the remark" />
            </Form.Item>
        </Form>
    )
})

export default AddForm
