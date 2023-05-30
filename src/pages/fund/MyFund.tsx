import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Table, Modal, Form, message, Space, Row, Statistic, Col } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';


import { Dispatch, connect, request, useRequest } from 'umi';





const { Option } = Select;
export interface Props {
    dispatch: Dispatch;
}




const MyFund: React.FC<Props> = (props) => {
    const {
        dispatch,

    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFund, setIsModalOpenFund] = useState({});


    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [form] = Form.useForm();
    const [fundList, setFundList] = useState<any>([])
    useRequest(() => ({
        url: '/api/FundInfo/list',
        method: 'post',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setFundList(result.content);

        },
    });
    const fetchFundInfoList = () => {
        dispatch({
            type: 'fund/fetchFundInfoList',
            payload: {},
            callback: (response: any) => {
                setFundList(response.content);
            }
        });
    }

    const fetchFundInfoDelete = (record: any) => {
        dispatch({
            type: 'fund/fetchFundInfoDelete',
            payload: { ...record },
            callback: (response: any) => {
                message.success('操作成功！')
                fetchFundInfoList();
            }
        });
    }
    const FundInfoUpdate = (record: any) => {
        setIsModalOpen(true);
        setIsModalOpenFund(record);
        form.setFieldValue("fundCode", record.fundCode);
        form.setFieldValue("quantity", record.quantity);
        form.setFieldValue("pastPrice", record.pastPrice)

    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '基金代码',
            dataIndex: 'fundCode',
            key: 'fundCode',
        },
        {
            title: '净值',
            dataIndex: 'yesterdayPrice',
            key: 'yesterdayPrice',
        },
        {
            title: '今日涨跌幅估算',
            dataIndex: 'estimatedPercent',
            key: 'estimatedPercent',
            render: (_: any, record: any) => (
                <Space size="small">
                    {record.estimatedPercent * 100}%

                </Space >
            ),
        },
        {
            title: '持仓份额',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '持有总金额',
            dataIndex: 'currentTotalValue',
            key: 'currentTotalValue',
        },
        {
            title: '持有收益',
            dataIndex: 'currentCost',
            key: 'currentCost',
        },
        {
            title: '今日收益',
            dataIndex: 'estimatedCost',
            key: 'estimatedCost',
        },
        {
            title: '成本价',
            dataIndex: 'pastPrice',
            key: 'pastPrice',
        },
        {
            title: '成本总额',
            dataIndex: 'pastTotalValue',
            key: 'pastTotalValue',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">

                    <a onClick={() => fetchFundInfoDelete(record)}>删除</a>
                    <a onClick={() => FundInfoUpdate(record)}>编辑</a>
                </Space >
            ),
        },

    ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkAdd = async () => {
        form.validateFields()
            .then((values) => {
                dispatch({
                    type: 'fund/fetchFundInfoSave',
                    payload: {
                        ...values, pastTotalValue: values.pastPrice * values.pastPrice,
                    },
                    callback: (response: any) => {

                        message.success('操作成功！')
                        fetchFundInfoList();
                    }
                });
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }

    const handleOkUpdate = async () => {
        form.validateFields()
            .then((values) => {
                dispatch({
                    type: 'fund/fetchFundInfoUpdate',
                    payload: {
                        ...values, pastTotalValue: values.pastPrice * values.pastPrice, uid: isModalOpenFund.uid,
                    },
                    callback: (response: any) => {

                        message.success('操作成功！')
                        fetchFundInfoList();
                    }
                });
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }


    const handleOk = async () => {
        if (true) {
            console.log(isModalOpenFund);
            handleOkUpdate();
            debugger;
        }
    };






    return (
        <PageContainer>
            <Modal title="新增持仓" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>

                    <Form.Item
                        name="fundCode"
                        label="基金代码"
                        rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="持有份额"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效数量！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name="pastPrice"
                        label="成本价"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效成本价！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>



                </Form>
            </Modal>


            <GridContent>
                <Card bordered={false}>

                    <Row gutter={16}>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="累计收益"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="今日收益"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="持仓总市值"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>

                </Card>
            </GridContent>


            <GridContent>
                <Card bordered={false}>
                    <Button type="primary" onClick={showModal}>
                        新增
                    </Button>
                    <Button type="primary" onClick={() => { fetchFundInfoList() }}>
                        刷新
                    </Button>
                    <Table dataSource={fundList} columns={columns} rowKey={record => record.uid} />

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

    const { list } = state.fund; //获取namespace命名空间为navigation的models数据state
    const { title } = state.fund;
    return {
        list,
        title
    };
}
export default connect(mapStateToProps)(MyFund as any);


