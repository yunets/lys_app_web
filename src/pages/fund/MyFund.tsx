import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Card, Select, Table, Modal, Form, message, Space, Row, Statistic, Col } from 'antd';
import React, { useState } from 'react';


import { Dispatch, connect, useRequest } from 'umi';





export interface Props {
    dispatch: Dispatch;
}




const MyFund: React.FC<Props> = (props) => {
    const {
        dispatch,

    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFund, setIsModalOpenFund] = useState({});

    const [currentTotalValue, setCurrentTotalValue] = useState(0);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [currentCost, setCurrentCost] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [form] = Form.useForm();
    const [fundList, setFundList] = useState<any>([])

    const computeAll = (arr: any) => {
        const currentTotalValue1 = arr.reduce((acc: any, curr: any) => acc + curr.currentTotalValue, 0);
        const estimatedCost1 = arr.reduce((acc: any, curr: any) => acc + curr.estimatedCost, 0);
        const currentCost1 = arr.reduce((acc: any, curr: any) => acc + curr.currentCost, 0);
        setCurrentCost(currentCost1);
        setCurrentTotalValue(currentTotalValue1);
        setEstimatedCost(estimatedCost1);
    }


    useRequest(() => ({
        url: '/api/FundInfo/list',
        method: 'post',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setFundList(result.content);
            computeAll(result.content);
        },
    });
    const fetchFundInfoList = () => {
        dispatch({
            type: 'fund/fetchFundInfoList',
            payload: {},
            callback: (response: any) => {
                setFundList(response.content);
                computeAll(response.content);
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
        form.setFieldValue("name", record.name);
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
            title: '昨日净值',
            dataIndex: 'yesterdayPrice',
            key: 'yesterdayPrice',
            render: (text: any) => parseFloat(text).toFixed(4),
        },
        {
            title: '今日涨跌幅估算',
            dataIndex: 'estimatedPercent',
            key: 'estimatedPercent',

            render: (_: any, record: any) => (
                <div>
                    {(record.estimatedPercent * 100).toFixed(4)}%
                </div >
            ),
        },
        {
            title: '策略',
            dataIndex: 'estimatedPercent',
            key: 'estimatedPercent',
            render: (_: any, record: any) => {
                if (record.currentPrice == null) {
                    record.currentPrice = 0.00001;
                }
                debugger
                return (
                    <div>
                        5000/({(record.currentPrice).toFixed(4)})={(5000 / (record.currentPrice)).toFixed(4)}<br />
                        加仓：  5000/({(record.currentPrice).toFixed(4)}*1.02)={(5000 / (record.currentPrice * 1.02)).toFixed(4)}<br />
                        减仓：  5000/({(record.currentPrice).toFixed(4)}*0.98)={(5000 / (record.currentPrice * 0.98)).toFixed(4)}<br />

                    </div >
                )
            },
        },
        {
            title: '持仓份额',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any) => parseFloat(text).toFixed(4),
        },
        {
            title: '持有总金额',
            dataIndex: 'currentTotalValue',
            key: 'currentTotalValue',
            render: (text: any) => parseFloat(text).toFixed(2),
        },
        {
            title: '持有收益',
            dataIndex: 'currentCost',
            key: 'currentCost',
            render: (text: any) => parseFloat(text).toFixed(2),
        },
        {
            title: '今日收益',
            dataIndex: 'estimatedCost',
            key: 'estimatedCost',
            render: (text: any) => parseFloat(text).toFixed(2),
        },
        {
            title: '成本价',
            dataIndex: 'pastPrice',
            key: 'pastPrice',
            render: (text: any) => parseFloat(text).toFixed(2),
        },
        {
            title: '成本总额',
            dataIndex: 'pastTotalValue',
            key: 'pastTotalValue',
            render: (text: any) => parseFloat(text).toFixed(2),
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
        if (undefined === isModalOpenFund.uid) {
            handleOkAdd();
        } else {
            handleOkUpdate();
        }
    };

    const fundCodeGetFundInfo = (fundCode: string) => {
        dispatch({
            type: 'fund/fetchGetFundInfo',
            payload: { fundCode },
            callback: (response: any) => {
                if (response.code !== -1) {
                    const name = response.content.name;
                    form.setFieldValue("name", name);
                    message.success('操作成功！' + response.content.name);
                } else {
                    form.setFieldValue("name", "");
                }



            }
        });
    };



    return (
        <PageContainer>
            <Modal title="新增持仓" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>

                    <Form.Item
                        name="fundCode"
                        label="基金代码"
                        rules={[{ required: true, message: '请输入正确的基金代码!', whitespace: true }]}
                    >
                        <Input onBlur={(e) => fundCodeGetFundInfo(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="基金名称"
                        rules={[{ required: true, message: '请输入正确的基金代码才能回显!', whitespace: true }]}
                    >
                        <Input disabled />
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

                    <Row gutter={0}>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="累计收益"
                                    value={currentCost}
                                    precision={2}
                                    valueStyle={{ color: '#efe9e9' }}
                                    //  prefix={<ArrowUpOutlined />}
                                    suffix=""
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="今日收益"
                                    value={estimatedCost}
                                    precision={5}
                                    valueStyle={{ color: '#efe9e9' }}
                                    // prefix={<ArrowDownOutlined />}
                                    suffix=""
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic
                                    title="持仓总市值"
                                    value={currentTotalValue}
                                    precision={5}
                                    valueStyle={{ color: '#efe9e9' }}
                                    // prefix={<ArrowDownOutlined />}
                                    suffix=""
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


