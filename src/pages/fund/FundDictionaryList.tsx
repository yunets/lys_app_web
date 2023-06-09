import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Card, Select, Table, Form } from 'antd';
import React, { useEffect, useState } from 'react';


import type { Dispatch } from 'umi';
import { connect, useRequest } from 'umi';

import Pagination from 'antd/es/pagination';




const { Option } = Select;
export interface Props {
    dispatch: Dispatch;
}




const FundDictionaryList: React.FC<Props> = (props) => {

    const {
        dispatch,
    } = props;
    const [form] = Form.useForm();
    const [seachContent, setSeachContent] = useState<any>({ "pageNumber": 0, "pageSize": 10, "name": "", "fundType": "" });
    const [totalElements, setTotalElements] = useState<any>(0);



    const columns = [
        {
            title: 'fundCode',
            dataIndex: 'fundCode',
            key: 'fundCode',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'fundType',
            dataIndex: 'fundType',
            key: 'fundType',
        },

    ];

    const [userList, setUserList] = useState<any>([])
    useRequest(() => ({
        url: '/api/FundInfo/dictionary/listByPage',
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
            type: 'fund/fetchFundDictionaryList',
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
                    "pageNumber": 0, "pageSize": 10, "name": values.name, "fundType": values.fundType
                });



            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    const renderWebCategoryOptions = () => {
        const options: any = []
        fundTypeList.forEach((item: any) => {
            options.push(<Option key={item._id} value={item._id}>{item._id}({item.count})</Option>)
        })

        return <Select style={{ width: 300 }}  >
            <Option key="123" value="">全部</Option>
            {options}
        </Select>
    }

    const updateUserList = (page: number, size: number) => {
        setSeachContent({
            "pageNumber": page, "pageSize": size, "name": seachContent.name, "fundType": seachContent.fundType
        });


    }


    return (
        <PageContainer>


            <GridContent>
                <Card bordered={false}>
                    <Form form={form}>
                        <Form.Item
                            name="fundType"
                            label="分类"
                            rules={[{ message: '分类!', whitespace: true }]}
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
    title: any;
};
function mapStateToProps(state: any) { //state是项目所有的models

    const { list } = state.user; //获取namespace命名空间为navigation的models数据state
    return {
        list,
    };
}
export default connect(mapStateToProps)(FundDictionaryList as any);