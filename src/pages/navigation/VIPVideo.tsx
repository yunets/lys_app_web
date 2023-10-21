import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useState } from 'react';



const { Option } = Select;



export interface Props {
    name: string;
}



const VIPVideo: React.FC<Props> = () => {
    const [vipUrl, setVipUrl] = useState("")
    const [form] = Form.useForm();
    const myList = [
        { "name": "超级vip", "url": "https://jx.jsonplayer.com/player/?url=", "showType": 3 },
        { "name": "爱豆", "url": "https://jx.aidouer.net/?url=", "showType": 1 },
        { "name": "虾米", "url": "https://jx.xmflv.com/?url=", "showType": 1 },
        { "name": "OK解析", "url": "https://okjx.cc/?url=", "showType": 3 },
        { "name": "诺讯", "url": "https://www.nxflv.com/?url=", "showType": 1 },
        { "name": "夜幕", "url": "https://www.yemu.xyz/?url=", "showType": 3 },
        { "name": "M3U8.TV", "url": "https://jx.m3u8.tv/jiexi/?url=", "showType": 3 },
        { "name": "人人迷", "url": "https://jx.blbo.cc:4433/?url=", "showType": 3 },
        { "name": "全民", "url": "https://jx.blbo.cc:4433/?url=", "showType": 3 },
        { "name": "七哥", "url": "https://jx.nnxv.cn/tv.php?url=", "showType": 3 },
        { "name": "冰豆", "url": "https://api.qianqi.net/vip/?url=", "showType": 3 },
        { "name": "迪奥", "url": "https://123.1dior.cn/?url=", "showType": 1 },
        { "name": "CK", "url": "https://www.ckplayer.vip/jiexi/?url=", "showType": 1 },
        { "name": "ckmov", "url": "https://www.ckmov.vip/api.php?url=", "showType": 1 },
        { "name": "playerjy/B站", "url": "https://jx.playerjy.com/?url=", "showType": 3 },
        { "name": "ccyjjd", "url": "https://ckmov.ccyjjd.com/ckmov/?url=", "showType": 1 },
        { "name": "诺诺", "url": "https://www.ckmov.com/?url=", "showType": 1 },
        { "name": "H8", "url": "https://www.h8jx.com/jiexi.php?url=", "showType": 1 },
        { "name": "BL", "url": "https://vip.bljiex.com/?v=", "showType": 1 },
        { "name": "解析la", "url": "https://api.jiexi.la/?url=", "showType": 1 },
    ];



    const renderWebCategoryOptions = () => {
        const options: any = []
        myList.forEach((item: any) => {
            options.push(<Option key={item.name} value={item.url}>{item.name}</Option>)
        })
        return <Select style={{ width: 120 }}   >
            {options}
        </Select>
    }
    const handleOk = async () => {
        form.validateFields()
            .then((values) => {
                setVipUrl(values.vipSrc + values.url);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };



    return (
        <PageContainer>
            <GridContent>
                <Form form={form} >
                    <Form.Item
                        name="vipSrc"
                        label="vip线路"
                        rules={[{ required: true, message: 'vip线路!', whitespace: true }]}
                    >

                        {renderWebCategoryOptions()}

                    </Form.Item>

                    <Form.Item
                        name="url"
                        label="视频的连接地址"
                        rules={[
                            {
                                type: 'url',
                                message: '网址不合法，样例https://cn.bing.com!',
                            },
                            {
                                required: true,
                                message: '输入视频的连接地址点击播放',
                            },
                        ]}
                    >

                        <Input />
                    </Form.Item>


                </Form>
                <Button type="primary" onClick={handleOk}>
                    播放
                </Button>
                <div><iframe src={vipUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="100%" height="450px" /></div>
            </GridContent>
        </PageContainer>
    );
};

export default VIPVideo;
