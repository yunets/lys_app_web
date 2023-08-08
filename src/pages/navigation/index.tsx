import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';
import MutilSearchBar from './components/MutilSearchBar';
import WebCategoryShow from './components/WebCategoryShow';
import { uniqueId } from 'lodash';

export interface Props {
  name: string;
}




const MyNavigation: React.FC<Props> = () => {


  const renderWebCategoryOptions = () => {
    const list = ['友情链接', '云服务器'];
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
      友情链接
      <MutilSearchBar name={''} />
      {renderWebCategoryOptions()}

    </PageContainer>
  );
};

export default MyNavigation;
