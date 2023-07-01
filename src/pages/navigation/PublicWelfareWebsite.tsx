import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';




export interface Props {
    name: string;
}





const PublicWelfareWebsite: React.FC<Props> = () => {

    const renderWebCategoryOptions = () => {
        const list = ['公益救援', '公益寻人', '公益志愿者', '公益项目', '国际公益', '公益组织', '公益基金', '公益网站'];
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

export default PublicWelfareWebsite;
