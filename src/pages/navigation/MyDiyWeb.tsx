import UserModel, { UserModelType } from '@/models/navigation';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';


import { connect, Dispatch, request, useRequest } from 'umi';
import ItemCard from './components/ItemCard';
import UserModel1 from './model';






const { Option } = Select;
export interface Props {
    name: string;
    list: any;
    loading: any;
    title: any;
    dispatch: Dispatch;
}




const MyDiyWeb: React.FC<Props> = (props) => {


    const {
        list,
        loading,
        dispatch,
        title
    } = props;
    debugger;

    const fetchTest = (data: any) => {
        dispatch({
            type: 'navigation/fetchProject',
            payload: {
                data,
            },
        });
    };




    return (
        <PageContainer>



            <GridContent>
                <Card bordered={false}>
                    <a> title: {title}</a><br />
                    <a> list: {JSON.stringify(list)}</a><br />
                    <a>loading: {JSON.stringify(loading)}</a>
                    <Button type="primary" onClick={() => { fetchTest(null) }}> fetchTest</Button>
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
    debugger
    const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
    const { title } = state.navigation;
    return {
        list,
        title
    };
}
export default connect(mapStateToProps)(MyDiyWeb as any);


