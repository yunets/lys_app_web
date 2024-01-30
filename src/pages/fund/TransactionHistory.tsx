import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Card, Select, Table, Form, Space, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';


import type { Dispatch } from 'umi';
import { connect, useRequest } from 'umi';

import Pagination from 'antd/es/pagination';
import { uniqueId } from 'lodash';
import styles from './index.less';
import { getDaysDifference } from '@/utils/TimeUtils';




const { Option } = Select;
export interface Props {
    dispatch: Dispatch;
}




const TransactionHistory: React.FC<Props> = (props) => {

    const {
        dispatch,
    } = props;
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [fundTypeList, setFundTypeList] = useState<any>([])
    const [userList, setUserList] = useState<any>([])
    const [seachContent, setSeachContent] = useState<any>({ "pageNumber": 0, "pageSize": 10, "name": "", "fundCode": "002987" });
    const [totalElements, setTotalElements] = useState<any>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSellOpen, setIsModalSellOpen] = useState(false);


    const [isModalOpenFund, setIsModalOpenFund] = useState<any>({});

    const fetchFundadd = (record: any) => {
        form3.setFieldValue("fundCode", record.fundCode);
        form3.setFieldValue("buyTime", record.buyTime);
        form3.setFieldValue("buyPrice", record.buyPrice);
        form3.setFieldValue("buyCount", record.buyCount);
        if (record.sellTime === null) {
            form3.setFieldValue("sellTime", new Date().toISOString().slice(0, 10));
        } else {

            form3.setFieldValue("sellTime", record.sellTime);
        }

        form3.setFieldValue("sellPrice", record.sellPrice);
        form3.setFieldValue("sellCount", record.sellCount);

        setIsModalSellOpen(true);
        setIsModalOpenFund(record);
    }
    const detail = (record: any) => {
        const url = `http://fundf10.eastmoney.com/ccmx_${record.fundCode}.html`
        window.open(url, '_blank');
    }
    const fetchTHistoryList = () => {
        dispatch({
            type: 'fund/fetchTHistoryList',
            payload: { ...seachContent },
            callback: (response: any) => {
                setUserList(response.content);
                setTotalElements(response.content.totalElements);

            }
        });
    }
    const deleteTH = (record: any) => {
        dispatch({
            type: 'fund/fetchTHistoryDelete',
            payload: {
                ...record,
            },
            callback: (response: any) => {

                message.success('操作成功！')
                fetchTHistoryList();
            }
        });
    }
    const columns = [
        {
            title: '基金代码',
            dataIndex: 'fundCode',
            key: 'fundCode',
        },
        {
            title: '买入时间',
            dataIndex: 'buyTime',
            key: 'buyTime',
        },
        {
            title: '买入价格',
            dataIndex: 'buyPrice',
            key: 'buyPrice',
        },
        {
            title: '买入数量',
            dataIndex: 'buyCount',
            key: 'buyCount',
        },
        {
            title: '卖出时间',
            dataIndex: 'sellTime',
            key: 'sellTime',
        },
        {
            title: '卖出价格',
            dataIndex: 'sellPrice',
            key: 'sellPrice',
        },
        {
            title: '卖出数量',
            dataIndex: 'sellCount',
            key: 'sellCount',
        },
        {
            title: '盈利金额',
            dataIndex: 'profitMoney',
            key: 'profitMoney',
        },
        {
            title: '收益率',
            dataIndex: 'profitPercent',
            key: 'profitPercent',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">

                    <a onClick={() => fetchFundadd(record)}>清仓获利</a>
                    <a onClick={() => detail(record)}>持仓详情</a>
                    <a onClick={() => deleteTH(record)}>删除</a>
                </Space >
            ),
        },

    ];

    useRequest(() => ({
        url: '/api/FundInfo/list',
        method: 'post',
        data: { ...seachContent },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            setFundTypeList(result.content);
            setTotalElements(result.content.totalElements);
        },
    });



    useEffect(() => {
        fetchTHistoryList();
        // 在这里执行需要在状态更新后执行的代码
    }, [seachContent]);
    const handleSearch = async () => {
        form.validateFields()
            .then((values) => {
                setSeachContent({
                    "pageNumber": 0, "pageSize": 10, "name": values.name, "fundCode": values.fundCode
                });



            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    const selectChange = (fundCode: string) => {
        form2.setFieldValue("fundCode", fundCode);
        setSeachContent({
            "pageNumber": seachContent.page, "pageSize": seachContent.size, "fundCode": fundCode
        });
    }

    const renderWebCategoryOptions = () => {
        const options: any = []
        fundTypeList.forEach((item: any) => {
            options.push(<Option key={uniqueId()} lable={item.name} value={item.fundCode}>{item.fundCode}-{item.name}</Option>)
        })

        return <Select style={{ width: 300 }} onChange={(fundCode) => selectChange(fundCode)} >
            <Option key="123" value="">全部</Option>
            {options}
        </Select>
    }

    const updateUserList = (page: number, size: number) => {
        setSeachContent({
            "pageNumber": page, "pageSize": size, "name": seachContent.name, "fundCode": seachContent.fundCode
        });


    }
    const handleOkAdd = async () => {
        form2.validateFields()
            .then((values) => {
                dispatch({
                    type: 'fund/fetchTHistorySave',
                    payload: {
                        ...values,
                    },
                    callback: (response: any) => {

                        message.success('操作成功！')
                        fetchTHistoryList();
                    }
                });
                form2.resetFields();
                form2.setFieldValue("fundCode", seachContent.fundCode);
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }

    const handleOkUpdate = async () => {
        form3.validateFields()
            .then((values) => {

                const profitMoney = values.sellPrice * values.sellCount - values.buyPrice * values.buyCount;
                const profitPercent = profitMoney / (values.buyPrice * values.buyCount);


                dispatch({
                    type: 'fund/fetchTHistoryUpdate',
                    payload: {
                        ...values, uid: isModalOpenFund.uid, profitMoney, profitPercent
                    },
                    callback: (response: any) => {
                        setIsModalOpenFund({});
                        message.success('操作成功！')
                        fetchTHistoryList();
                    }
                });
                form3.resetFields();

                setIsModalSellOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    }


    const handleOk = async () => {
        console.log(isModalOpenFund);

        if (isModalOpenFund.uid === undefined) {
            handleOkAdd();
        } else {
            handleOkUpdate();
        }
    };
    const showModal = () => {
        form2.setFieldValue("buyTime", new Date().toISOString().slice(0, 10));
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenFund({});
        setIsModalSellOpen(false);
    };
    return (
        <PageContainer>
            <Modal title="买入交易" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form2}>

                    <Form.Item
                        name="fundCode"
                        label="基金代码"
                        rules={[{ required: true, message: '请输入正确的基金代码!', whitespace: true }]}
                    >
                        <Input value={seachContent.fundCode} disabled />
                    </Form.Item>
                    {/* <Form.Item
                        name="name"
                        label="基金名称"
                        rules={[{ required: true, message: '请输入正确的基金代码才能回显!', whitespace: true }]}
                    >
                        <Input value={seachContent.name} disabled />
                    </Form.Item> */}
                    <Form.Item
                        name="buyTime"
                        label="买入日期"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效成本价！',
                            },
                        ]}
                    >
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item
                        name="buyPrice"
                        label="买入价格"
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
                        name="buyCount"
                        label="买入数量"
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

            <Modal title="卖出交易" open={isModalSellOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form3}>

                    <Form.Item
                        name="fundCode"
                        label="基金代码"
                        rules={[{ required: true, message: '请输入正确的基金代码!', whitespace: true }]}
                    >
                        <Input value={seachContent.fundCode} disabled />
                    </Form.Item>
                    {/* <Form.Item
                        name="name"
                        label="基金名称"
                        rules={[{ required: true, message: '请输入正确的基金代码才能回显!', whitespace: true }]}
                    >
                        <Input value={seachContent.name} disabled />
                    </Form.Item> */}
                    <Form.Item
                        name="buyTime"
                        label="买入日期"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效买入日期！',
                            },
                        ]}
                    >
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item
                        name="buyPrice"
                        label="买入价格"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效买入价格！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name="buyCount"
                        label="买入数量"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效买入数量！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        name="sellTime"
                        label="卖出日期"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效卖出日期！',
                            },
                        ]}
                    >
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item
                        name="sellPrice"
                        label="卖出价格"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效卖出价格！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name="sellCount"
                        label="卖出数量"
                        rules={[
                            {
                                required: true,
                                message: '请输入有效卖出数量！',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>


                </Form>
            </Modal>

            <GridContent>
                <Card bordered={false}>
                    <Form form={form}>
                        <Form.Item
                            name="fundCode"
                            label="持有基金"
                            rules={[{ required: true, message: '请输入正确的基金代码!', whitespace: true }]}
                        >
                            {renderWebCategoryOptions()}

                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{ message: '请输入名称', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => { handleSearch(); }}>
                                查询
                            </Button>
                            <Button type="primary" onClick={showModal}>
                                新增
                            </Button>
                        </Form.Item>
                    </Form>

                    <Table dataSource={userList} columns={columns} pagination={false} rowClassName={(record, index) => {
                        let days: number = 0;
                        if (record.sellTime !== null) {
                            days = getDaysDifference(record.buyTime, record.sellTime);
                        }

                        if (days > 8 && record.profitMoney === 0) { return styles.sellRed }
                        else if (record.profitPercent < 0) {
                            return styles.green; // 最高的reply_count值设置为黄色  
                        } else if (record.profitPercent > 0) {
                            return styles.red; // 最小的reply_count值设置为绿色  
                        } else {
                            return styles.red; // 其他情况不设置颜色  
                        }
                    }} />
                    <Pagination defaultCurrent={1} total={totalElements} onChange={(page: number, pageSize: number) => { console.log(page + "------" + pageSize); updateUserList(page, pageSize); }} />

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
    return {
        list,
    };
}
export default connect(mapStateToProps)(TransactionHistory as any);