import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { } from 'react';

import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';

export interface Props {
    name: string;
}




const MyNavigationDownload: React.FC<Props> = () => {




    const renderWebCategoryOptions = () => {
        const list = ['云计算', '云计算', '前端开发', '前端开发', '容器生态圈'];
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
