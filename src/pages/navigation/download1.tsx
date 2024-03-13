import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { } from 'react';


import { DndProvider } from 'react-dnd';
import { CateContainer } from './catecompents/CateContainer';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface Props {
    name: string;
}




const MyNavigationDownload: React.FC<Props> = () => {







    return (
        <PageContainer>
            <div>
                <DndProvider backend={HTML5Backend} >
                    <CateContainer a="a" />
                </DndProvider>
            </div>

            {/* <GridContent>
                <Card bordered={false}>
                    <WebCategoryShow name="云计算" />
                </Card>
            </GridContent>

            <GridContent style={{ marginTop: '10px' }}>
                <Card bordered={false}>
                    <WebCategoryShow name="云计算" />
                </Card>
            </GridContent>

            <GridContent style={{ marginTop: '10px' }}>
                <Card bordered={false}>
                    <WebCategoryShow name="云计算" />
                </Card>
            </GridContent> */}
        </PageContainer>
    );
};

export default MyNavigationDownload;
