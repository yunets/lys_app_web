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



const DiscoveryWeb: React.FC<Props> = (props) => {

    const {
        dispatch,
    } = props;
    const [form] = Form.useForm();
    const [seachContent, setSeachContent] = useState<any>({ "domainName": "" });


    const detail = (record: any) => {
        const domains = record.domains;
        domains.forEach(element => {
            window.open("https://" + element, '_blank');
        });

    }

    const columns = [
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'domains',
            dataIndex: 'domains',
            key: 'domains',
            render: (_, { domains }) => (
                <>
                    {Array.isArray(domains) ? domains.map((tag) => {
                        let color = tag.length > 2 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag} onClick={() => { window.open("https://" + tag, '_blank'); }}>
                                {tag}
                            </Tag>
                        );
                    }) : null}
                </>
            ),
        },

        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">

                    {/* <a onClick={() => fetchFundadd(record)}>预约看房</a> */}
                    <a onClick={() => detail(record)}>全部打开</a>
                </Space >
            ),
        },

    ];
    const [userList, setUserList] = useState<any>([])

    const fetchList = () => {
        dispatch({
            type: 'house/fetchGetDomainsByDomain',
            payload: { ...seachContent },
            callback: (response: any) => {
                const list = response.content;
                const filteredList = list.filter(item => item.domains.length > 0);
                setUserList(filteredList);

            }
        });
    }
    useEffect(() => {
        fetchList();
        // 在这里执行需要在状态更新后执行的代码
    }, [seachContent]);

    const handleSearch = async () => {
        form.validateFields()
            .then((values) => {
                setSeachContent({
                    "domainName": values.domainName
                });



            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };



    return (
        <PageContainer>


            <GridContent>
                <Card bordered={false}>
                    <Form form={form}>

                        <Form.Item
                            name="domainName"
                            label="子网或者域名"
                            rules={[{ message: '请输入子网或者域名', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item> <Button type="primary" onClick={() => { handleSearch(); }}>
                            查询
                        </Button></Form.Item>
                    </Form>

                    <Table dataSource={userList} columns={columns} pagination={false} />


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
export default connect(mapStateToProps)(DiscoveryWeb as any);