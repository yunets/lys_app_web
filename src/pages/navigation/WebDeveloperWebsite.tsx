import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';



import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';




export interface Props {
    name: string;
}





const WebDeveloperWebsite: React.FC<Props> = () => {


    const renderWebCategoryOptions = () => {
        const list = ['前端课程', 'JS 框架', 'UI 框架', 'Web 资源', '前端插件', '图表库', '包管理器', '构建工具', '模块加载', '模板引擎', '游戏引擎', '移动框架'];
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

export default WebDeveloperWebsite;
