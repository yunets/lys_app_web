import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { request, useRequest } from 'umi';

import ItemShow from './components/ItemShow';

export interface Props {
    name: string;
}




const MyNavigationDownload: React.FC<Props> = () => {





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


    return (
        <PageContainer>

            <GridContent>
                <Card bordered={false}>
                    MyNavigationDownload -电子书下载
                    {
                        urlItemList.map((item: any, index: number) => {
                            return (
                                <ItemShow key={index} item={item}>

                                </ItemShow>
                            );
                        })
                    }
                </Card>
            </GridContent>

            <GridContent style={{ marginTop: '10px' }}>
                <Card bordered={false}>
                    计算机软件相关的导航2-后端
                    {
                        urlItemList.map((item: any, index: number) => {
                            return (
                                <ItemShow key={index} item={item}>

                                </ItemShow>
                            );
                        })
                    }
                </Card>
            </GridContent>

            <GridContent style={{ marginTop: '10px' }}>
                <Card bordered={false}>
                    计算机软件相关的导航2-数据库
                    {
                        urlItemList.map((item: any, index: number) => {
                            return (
                                <ItemShow key={index} item={item}>

                                </ItemShow>
                            );
                        })
                    }
                </Card>
            </GridContent>
        </PageContainer>
    );
};

export default MyNavigationDownload;
