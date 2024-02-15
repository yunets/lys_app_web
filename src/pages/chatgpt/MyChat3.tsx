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
import wxdyh from '@/assets/img/wxdyh.png';
import Modal from 'antd/lib/modal/Modal';




export interface Props {
    name: string;
}





const MyChat2: React.FC<Props> = () => {


    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: "在线" },
    }), {
        manual: false,
        onSuccess: (result) => {
            console.log(result);
            if (result.code != -1) {
                setUrlItemList(result.content);
            }


        },
    });

    const [isWebCategoryModalOpen, setIsWebCategoryModalOpen] = useState(false);
    const handleCancel = () => {
        setIsWebCategoryModalOpen(false);
    };
    const handleShow = (e: any) => {
        console.log(e)
        setIsWebCategoryModalOpen(true);
    };
    return (
        <PageContainer>
            <Modal title="新增分类" open={isWebCategoryModalOpen} onOk={handleCancel} onCancel={handleCancel} >
                <div className={styles.wxzsmModal}><img alt="logo" src={wxzsm} className={styles.myImg} /></div>

            </Modal>


            <GridContent>
                <h3><Tag color="magenta">请加QQ群：915997953、901169719(已满)、289881319(已满)，关注公众号可获取公益免费chatgpt服务，个别平台打着充值套餐使用的旗号骗钱，大家小心上当受骗！多关注本站公告！</Tag></h3>
                <Tabs tabPosition="top" >

                    <Tabs.TabPane tab="关于本站" key={uniqueId()} >


                        <Tag color="#f50"><h2>公益免费，请多多分享，在本页进行打赏支持咱们的免费公益chatgpt</h2>
                            <br />


                        </Tag>

                        <table>
                            <tr>
                                <td width={"300px"}><Tag color="magenta">支付宝红包</Tag></td>
                                <td width={"300px"} ><Tag color="volcano">友情赞助</Tag></td>
                                <td width={"300px"}><Tag color="magenta">微信公众号</Tag></td>
                                <td width={"300px"}><Tag color="magenta">微信</Tag></td>

                            </tr>
                            <tr>
                                <td><img alt="logo" src={zfbhongbao} className={styles.myImg} /></td>
                                <td><img alt="logo" src={wxzsm} className={styles.myImg} /></td>
                                <td><a href='https://txc.qq.com/products/598216' target='_blank' rel="noreferrer">qq群（915997953、289881319、901169719）</a><br />
                                    <img alt="logo" src={wxdyh} className={styles.myImg} /> </td>
                                <td><img alt="logo" src={wx} className={styles.myImg} /></td>
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
                        return <Tabs.TabPane tab={item.name} key={uniqueId()}  >
                            <Card bordered={false} key={uniqueId()}>

                                <div><iframe className={styles.myChat} src={item.url} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" /></div>
                            </Card></Tabs.TabPane>;
                    })}

                </Tabs>

            </GridContent>


        </PageContainer>
    );
};

export default MyChat2;
