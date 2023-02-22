import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

export interface Props {
  name: string;
}

const MyNavigation1: React.FC<Props> = () => {
  return (
    <PageContainer>
      MyDemo
      <GridContent>
        <Card bordered={false}>
          <div>拖拽样例 https://tiandisheng.top/dragdemo/dnd/basics-drag</div>
        </Card>
      </GridContent>
    </PageContainer>
  );
};

export default MyNavigation1;
