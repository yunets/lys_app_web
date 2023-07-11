import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tag } from 'antd';
import React, { } from 'react';
import styles from './index.less';



export interface Props {
    name: string;
}




const MySponsor: React.FC<Props> = () => {








    return (
        <PageContainer>
            <GridContent>
                <Card bordered={false} >
                    <table>
                        <tr>
                            <td width={"500px"} ><Tag color="volcano">交流合作</Tag></td>
                            <td width={"400px"}><Tag color="magenta">友情赞助（还没钱买域名，域名名称也想不出来也可以建议个）</Tag></td>
                            <td width={"400px"}><Tag color="magenta">好的想法</Tag></td>
                        </tr>
                        <tr>
                            <td><img alt="logo" src="/img/wxzsm.jpg" className={styles.myImg} /></td>
                            <td><img alt="logo" src="/img/wx.jpg" className={styles.myImg} /></td>
                            <td><a href='https://txc.qq.com/products/598216' target='_blank' rel="noreferrer">意见反馈或留言</a></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <br /><br /><br /><br /><br />
                                <Tag color="#f50"><h1>网站主要是为了咱们查找网站更加的方便，便捷，公益为主!!!</h1></Tag>

                            </td>

                        </tr>
                    </table>



                </Card>
            </GridContent>

        </PageContainer>
    );
};

export default MySponsor;
