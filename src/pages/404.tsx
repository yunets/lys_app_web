import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="访问路径不存在."
    extra={
      <Button type="primary" onClick={() => history.push('/web/chatgpt')}>
        返回chatgpt
      </Button>
    }
  />
);

export default NoFoundPage;
