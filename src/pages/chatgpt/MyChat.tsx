import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';







export interface Props {
    name: string;
}





const MyChat: React.FC<Props> = () => {



    return (
        <PageContainer>

            <div><iframe className={styles.myChat} src='https://chat.kunshanyuxin.com/' /></div>

        </PageContainer>
    );
};

export default MyChat;
