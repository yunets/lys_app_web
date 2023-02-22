import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';
import { currentUser } from '@/services/ant-design-pro/api';
import ItemShow from './components/ItemShow';

export interface Props {
  name: string;
}

const MyNavigation: React.FC<Props> = () => {
  const arr = ['a', 'b', 'd', 'e', 'f', 'a', 'b', 'd', 'e', 'f', 'b', 'd', 'e', 'f'];

  const [data, setData] = useState({
    data: [
      {
        productId: '123',
        productName: 'macbook',
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const { data1 } = useRequest(currentUser);
  useEffect(() => {
    setData(data1 || []);
  }, [data1]);

  return (
    <PageContainer>
      MyDemo
      <GridContent>
        <Card bordered={false}>
          User页面
          {arr.map((item, index) => {
            return (
              <ItemShow key={index} name={item}>
                {index}
              </ItemShow>
            );
          })}
          <ItemShow name={'222'}>1</ItemShow>
          <ItemShow name={'222'}>1</ItemShow>
        </Card>
      </GridContent>
    </PageContainer>
  );
};

export default MyNavigation;
