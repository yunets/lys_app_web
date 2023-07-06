import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { useRequest } from 'umi';







export interface Props {
    name: string;
}





const MyChat: React.FC<Props> = () => {


    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: "AI国内问答" },
    }), {
        manual: false,
        onSuccess: (result) => {
            console.log(result);
            if (result.code != -1) {
                setUrlItemList(result.content);
            }


        },
    });


    return (
        <PageContainer>
            <GridContent>
                <Tabs tabPosition="top">



                    {urlItemList.map((item: any) => {
                        return <Tabs.TabPane tab={item.name} key={uniqueId()} >
                            <Card bordered={false} key={uniqueId()}>
                                <div><iframe className={styles.myChat} src={item.url} /></div>
                            </Card></Tabs.TabPane>;
                    })}

                </Tabs>

            </GridContent>


        </PageContainer>
    );
};

export default MyChat;
