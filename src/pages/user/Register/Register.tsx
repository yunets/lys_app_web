import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Form, message } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import type { Dispatch } from 'umi';
import { history, connect } from 'umi';







export interface Props {
    name: string;
    dispatch: Dispatch;
}




const Register: React.FC<Props> = (props) => {
    const {

        dispatch,

    } = props;
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
                dispatch({
                    type: 'user/fetchRegister',
                    payload: { ...values.user },
                    callback: (response: any) => {
                        console.log(response.content);
                    }
                });
                //form.resetFields();

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

                        <Form.Item name={['user', 'mobile']} label="手机号（登录账号）"
                            rules={[{ required: true, message: '请输入手机号' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'password']} label="密码" rules={[{ required: true }]}>
                            <Input type='password' />
                        </Form.Item>
                        <Form.Item name={['user', 'loginname']} label="昵称" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'username']} label="姓名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="邮箱（找回密码使用）" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={['user', 'website']} label="个人博客">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} label="个人介绍">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" onClick={handleOk}>
                                注册
                            </Button>
                            <Button type="primary" onClick={() => { history.push('/user/login'); }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </GridContent>



        </PageContainer>
    );
};
export type ConnectState = {
    list: any;
    loading: any;
    title: any;
};
function mapStateToProps(state: any) { //state是项目所有的models

    const { list } = state.user; //获取namespace命名空间为navigation的models数据state
    const { title } = state.user;
    return {
        list,
        title
    };
}
export default connect(mapStateToProps)(Register as any);
