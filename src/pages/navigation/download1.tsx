import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { } from 'react';

import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';
import { DndProvider } from 'react-dnd';
import { Container } from './catecompents/Container';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface Props {
    name: string;
}




const MyNavigationDownload: React.FC<Props> = () => {




    const renderWebCategoryOptions = () => {
        const list = ['云计算'];
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
            <div>
                <DndProvider backend={HTML5Backend} >
                    <Container />
                </DndProvider>
            </div>
            {renderWebCategoryOptions()}
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
