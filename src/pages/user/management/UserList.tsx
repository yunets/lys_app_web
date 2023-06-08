import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Table } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';


import { Dispatch, connect, request, useRequest } from 'umi';
import ItemCard from './components/ItemCard';

import ItemShow from './components/ItemShow';
import Pagination from 'antd/es/pagination';




const { Option } = Select;
export interface Props {
    dispatch: Dispatch;
}




const UserList: React.FC<Props> = (props) => {

    const {
        dispatch,
    } = props;



    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: 'userId',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'loginname',
            dataIndex: 'loginname',
            key: 'loginname',
        },
        {
            title: 'mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
    ];

    const [userList, setUserList] = useState<any>([])
    const updateUserList = () => {
        dispatch({
            type: 'user/fetchlistByPage',
            payload: { "pageNumber": 0, "pageSize": 10, "name": '' },
            callback: (response: any) => {
                setUserList(response.content);
            }
        });
    }


    return (
        <PageContainer>


            <GridContent>
                <Card bordered={false}>

                    <Table dataSource={userList} columns={columns} />
                    <Pagination defaultCurrent={1} total={500} onChange={(page: number, pageSize: number) => { console.log(page + "------" + pageSize); updateUserList(); }} />

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
export default connect(mapStateToProps)(UserList as any);