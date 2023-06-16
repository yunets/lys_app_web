import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';




export interface Props {
    name: string;
}




const MyNavigationSoftWare: React.FC<Props> = () => {

    const renderWebCategoryOptions = () => {
        const list = ['开发工具', '前端开发', '容器生态圈'];
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

export default MyNavigationSoftWare;
