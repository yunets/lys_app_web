import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';


import { request, useRequest } from 'umi';
import ItemCard from './components/ItemCard';

import ItemShow from './components/ItemShow';




const { Option } = Select;
export interface Props {
    name: string;
}




const MyDiyWeb: React.FC<Props> = () => {


    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/url/list',
        method: 'get',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setUrlItemList(result.content);

        },
    });


    const [searchUrl, setSearchUrl] = useState<string>("https://www.baidu.com");

    const handleChange = (value: string) => {
        setSearchUrl(value);
    };

    const [searchContent, setSearchContent] = useState<string>("");
    return (
        <PageContainer>








            <GridContent>
                <Card bordered={false}>

                    <ItemCard item="" />

                </Card>
            </GridContent>



        </PageContainer>
    );
};

export default MyDiyWeb;
