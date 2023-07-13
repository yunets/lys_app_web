import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { useRequest } from 'umi';
import wx from '@/assets/img/wx.jpg';
import wxzsm from '@/assets/img/wxzsm.jpg';






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


                        <div >近期，AIGC的火热程度不言而喻。网站建立初衷是为了方便大家学习和研究。我们日常的运营与维护需要花费极大的<strong>精力和成本</strong>，
                            包括服务器、梯子、购买token等，大概上千刀/月的维护成本。为了让网站持续运行下去，因此开通了友情赞助。只要您赞助了就可以一直使用它，每天请求额度由承载能力动态控制，
                            非常感谢已有同学的赞助，我们会尽最大的努力，让网站更好的运行！我们也乐意与你一起交流进步！！！</div>

                        <table>
                            <tr>
                                <td width={"500px"} ><Tag color="volcano">友情赞助（还没钱买域名，域名名称也想不出来也可以建议个）</Tag></td>
                                <td width={"400px"}><Tag color="magenta">交流合作</Tag></td>
                                <td width={"400px"}><Tag color="magenta">好的想法</Tag></td>
                            </tr>
                            <tr>
                                <td><img alt="logo" src={wxzsm} className={styles.myImg} /></td>
                                <td><img alt="logo" src={wx} className={styles.myImg} /></td>
                                <td><a href='https://txc.qq.com/products/598216' target='_blank' rel="noreferrer">意见反馈或留言</a></td>
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
