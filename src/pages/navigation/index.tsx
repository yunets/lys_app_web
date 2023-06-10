import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';
import MutilSearchBar from './components/MutilSearchBar';
import WebCategoryShow from './components/WebCategoryShow';

export interface Props {
  name: string;
}




const MyNavigation: React.FC<Props> = () => {


  return (
    <PageContainer>
      我的主页
      <GridContent>
        <Card bordered={false}>


          <MutilSearchBar name={''} />
          <WebCategoryShow name="云计算" />



        </Card>
      </GridContent>
    </PageContainer>
  );
};

export default MyNavigation;
