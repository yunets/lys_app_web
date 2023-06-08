import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { request, useRequest } from 'umi';

import ItemShow from './components/ItemShow';
import ItemShowReadOnly from './components/ItemShowReadOnly';

export interface Props {
    name: string;
}




const MyNavigationDownload: React.FC<Props> = () => {





    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: '综合学习' },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setUrlItemList(result.content);

        },
    });
    const [urlItemList2, setUrlItemList2] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: '云盘搜索' },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setUrlItemList2(result.content);

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
                                <ItemShowReadOnly key={index} item={item} />
                            );
                        })
                    }
                </Card>
            </GridContent>

            <GridContent style={{ marginTop: '10px' }}>
                <Card bordered={false}>
                    云盘搜索
                    {
                        urlItemList2.map((item: any, index: number) => {
                            return (
                                <ItemShowReadOnly key={index} item={item} />
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
                                <ItemShowReadOnly key={index} item={item} />
                            );
                        })
                    }
                </Card>
            </GridContent>
        </PageContainer>
    );
};

export default MyNavigationDownload;
