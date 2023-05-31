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




const MyDiyPrivate: React.FC<Props> = () => {


    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/list',
        method: 'get',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
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
                    <Input.Group compact>
                        <Select defaultValue={searchUrl} onChange={handleChange} >
                            <Option value="https://www.baidu.com">百度</Option>
                            <Option value="bing">bing</Option>
                            <Option value="搜狗">搜狗</Option>
                        </Select>
                        <Input style={{ width: '50%' }} onChange={(e) => { setSearchContent(e.target.value) }} />
                        <Button type="primary" onClick={() => { window.open(`${searchUrl}/s?wd=${searchContent}`, '_blank',); }}> 搜索</Button>
                    </Input.Group>
                </Card>
            </GridContent>


            <GridContent>
                <Card bordered={false}>

                    <ItemCard item="" />

                </Card>
            </GridContent>



        </PageContainer>
    );
};

export default MyDiyPrivate;
