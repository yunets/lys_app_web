import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';




export interface Props {
    name: string;
}





const WebConstructionWebsite: React.FC<Props> = () => {


    const renderWebCategoryOptions = () => {
        const list = ['云服务器', '域名注册', '网站系统', '站长工具'];
        const optionList = list.map((item: string) =>
            <GridContent key={uniqueId()}>
                <Card bordered={false} >
                    <WebCategoryShow name={item} />
                </Card>
            </GridContent>
        )
        return optionList;
    }


    return (
        <PageContainer>

            {renderWebCategoryOptions()}

        </PageContainer>
    );
};

export default WebConstructionWebsite;