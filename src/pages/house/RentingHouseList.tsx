import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Card, Select, Table, Form, Space, message, Tag } from 'antd';
import React, { useEffect, useState } from 'react';


import type { Dispatch } from 'umi';
import { connect, useRequest } from 'umi';

import Pagination from 'antd/es/pagination';
import { uniqueId } from 'lodash';




const { Option } = Select;
export interface Props {
    dispatch: Dispatch;
}



const RentingHouseList: React.FC<Props> = (props) => {

    const {
        dispatch,
    } = props;
    const [form] = Form.useForm();
    const [seachContent, setSeachContent] = useState<any>({ "pageNumber": 0, "pageSize": 20, "address": "" });
    const [totalElements, setTotalElements] = useState<any>(0);


    const fetchFundadd = (record: any) => {
        dispatch({
            type: 'fund/fetchFundInfoSave',
            payload: { ...record, quantity: 1, pastPrice: 1, pastTotalValue: 1 },
            callback: (response: any) => {
                message.success('操作成功！')

            }
        });
    }
    const detail = (record: any) => {
        const url = record.srcLink;
        window.open(url, '_blank');
    }
    const columns = [
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, { tags }) => (
                <>
                    {Array.isArray(tags) ? tags.map((tag) => {
                        let color = tag.length > 2 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    }) : null}
                </>
            ),
        },
        {
            title: 'mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">

                    {/* <a onClick={() => fetchFundadd(record)}>预约看房</a> */}
                    <a onClick={() => detail(record)}>详情</a>
                </Space >
            ),
        },

    ];

    const [userList, setUserList] = useState<any>([])
    useRequest(() => ({
        url: '/api/HouseInfo/listByPage',
        method: 'post',
        data: { ...seachContent },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            setUserList(result.content.content);
            setTotalElements(result.content.totalElements);
        },
    });

    const [fundTypeList, setFundTypeList] = useState<any>([])

    useRequest(() => ({
        url: '/api/FundInfo/dictionary/getFundType',
        method: 'post',
        data: { "pageNumber": 0, "pageSize": 10, "name": '' },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            setFundTypeList(result.content);
        },
    });

    const fetchFundDictionaryList = () => {
        dispatch({
            type: 'house/fetchHouseInfoListByPage',
            payload: { ...seachContent },
            callback: (response: any) => {
                setUserList(response.content.content);
                setTotalElements(response.content.totalElements);

            }
        });
    }
    useEffect(() => {
        fetchFundDictionaryList();
        // 在这里执行需要在状态更新后执行的代码
    }, [seachContent]);

    const handleSearch = async () => {
        form.validateFields()
            .then((values) => {
                setSeachContent({
                    "pageNumber": 0, "pageSize": 10, "address": values.address
                });



            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    const renderWebCategoryOptions = () => {
        const options: any = []
        fundTypeList.forEach((item: any) => {
            options.push(<Option key={uniqueId()} value={item._id}>{item._id}({item.count})</Option>)
        })

        return <Select style={{ width: 300 }}  >
            <Option key="123" value="">全部</Option>
            {options}
        </Select>
    }

    const updateUserList = (page: number, size: number) => {
        setSeachContent({
            "pageNumber": page, "pageSize": size, "address": seachContent.address
        });


    }


    return (
        <PageContainer>


            <GridContent>
                <Card bordered={false}>
                    <Form form={form}>

                        <Form.Item
                            name="address"
                            label="名称"
                            rules={[{ message: '请输入小区地址', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item> <Button type="primary" onClick={() => { handleSearch(); }}>
                            查询
                        </Button></Form.Item>
                    </Form>

                    <Table dataSource={userList} columns={columns} pagination={false} />
                    <Pagination defaultCurrent={1} total={totalElements} onChange={(page: number, pageSize: number) => { console.log(page + "------" + pageSize); updateUserList(page, pageSize); }} />

                </Card>
            </GridContent>



        </PageContainer>
    );
};


export type ConnectState = {
    list: any;
    loading: any;
};
function mapStateToProps(state: any) { //state是项目所有的models

    const { list } = state.house; //获取namespace命名空间为navigation的models数据state
    return {
        list,
    };
}
export default connect(mapStateToProps)(RentingHouseList as any);