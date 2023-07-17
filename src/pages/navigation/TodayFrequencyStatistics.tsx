import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import React, { useState } from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';
import { useRequest } from 'umi';




export interface Props {
    name: string;
}




const TodayFrequencyStatistics: React.FC<Props> = () => {

    const columns = [
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '运营商',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '位置',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '访问时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];


    const [ipList, setIpList] = useState<any>([])
    useRequest(() => ({
        url: '/api/visit/todayFrequencyStatistics',
        method: 'post',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            setIpList(result.content);

        },
    });









    return (
        <PageContainer>
            <Table dataSource={ipList} columns={columns} />;



        </PageContainer>
    );
};

export default TodayFrequencyStatistics;
