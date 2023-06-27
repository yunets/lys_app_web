import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';




export interface Props {
    name: string;
}





const PersonalCreation: React.FC<Props> = () => {

    const renderWebCategoryOptions = () => {
        const list = ['自媒体创作', '新媒平台', '新媒平台', "内容社区"];
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

export default PersonalCreation;
