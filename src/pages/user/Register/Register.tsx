import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Form } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';







const { Option } = Select;
export interface Props {
    name: string;
}




const Register: React.FC<Props> = () => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const handleOk = async () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                form.resetFields();

            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };
    return (
        <PageContainer>









            <GridContent>
                <Card bordered={false}>

                    <Form
                        {...layout}
                        style={{ maxWidth: 600 }}
                        form={form}
                    >
                        <Form.Item name={['user', 'name']} label="账号" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'phone']} label="手机号" rules={[{ type: 'string' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={['user', 'website']} label="Website">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} label="Introduction">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" onClick={handleOk}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </GridContent>



        </PageContainer>
    );
};

export default Register;
