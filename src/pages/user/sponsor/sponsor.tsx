import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { } from 'react';



export interface Props {
    name: string;
}




const MySponsor: React.FC<Props> = () => {








    return (
        <PageContainer>
            <GridContent>
                <Card bordered={false} >


                    <img alt="logo" src="/img/wxzsm.jpg" width={"500px"} />
                </Card>
            </GridContent>

        </PageContainer>
    );
};

export default MySponsor;
