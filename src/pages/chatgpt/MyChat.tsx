import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { useRequest } from 'umi';
import wx from '@/assets/img/wx.jpg';
import wxzsm from '@/assets/img/wxzsm.jpg';
import qqqun1 from '@/assets/img/qqqun1.jpg';
import zfbhongbao from '@/assets/img/zfbhongbao.jpeg';




export interface Props {
    name: string;
}





const MyChat: React.FC<Props> = () => {


    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: "AI国内问答" },
    }), {
        manual: false,
        onSuccess: (result) => {
            console.log(result);
            if (result.code != -1) {
                setUrlItemList(result.content);
            }


        },
    });


    return (
        <PageContainer>
            <GridContent>
                <Tabs tabPosition="top">

                    <Tabs.TabPane tab="关于本站" key={uniqueId()} >


                        <Tag color="#f50"><h2>公益免费，请多多分享，在本页进行打赏支持咱们的免费公益chatgpt</h2>
                            <br />


                        </Tag>

                        <table>
                            <tr>
                                <td width={"300px"}><Tag color="magenta">支付宝红包</Tag></td>
                                <td width={"300px"} ><Tag color="volcano">友情赞助</Tag></td>
                                <td width={"300px"}><Tag color="magenta">交流合作</Tag></td>
                                <td width={"300px"}><Tag color="magenta">好的想法</Tag></td>

                            </tr>
                            <tr>
                                <td><img alt="logo" src={zfbhongbao} className={styles.myImg} /></td>
                                <td><img alt="logo" src={wxzsm} className={styles.myImg} /></td>
                                <td><img alt="logo" src={wx} className={styles.myImg} /></td>
                                <td><a href='https://txc.qq.com/products/598216' target='_blank' rel="noreferrer">qq群（289881319）</a><br />
                                    <img alt="logo" src={qqqun1} className={styles.myImg} /> </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <br /><br /><br /><br /><br />
                                    <Tag color="#f50"><h1>网站主要是为了咱们查找网站更加的方便，便捷，公益为主!!!</h1></Tag>

                                </td>

                            </tr>
                        </table>




                        <div><strong>免责申明</strong>：本平台仅供个人学习、学术研究使用，未经许可，请勿分享、传播输入及生成的文本、图片内容，禁止询问违反国家规定的问题，所产生的法律责任自行负责。倡导大家文明、合法使用，切勿违反国家法律！</div>

                    </Tabs.TabPane>

                    {urlItemList.map((item: any) => {
                        return <Tabs.TabPane tab={item.name} key={uniqueId()} >
                            <Card bordered={false} key={uniqueId()}>
                                <div><iframe className={styles.myChat} src={item.url} /></div>
                            </Card></Tabs.TabPane>;
                    })}

                </Tabs>

            </GridContent>


        </PageContainer>
    );
};

export default MyChat;
