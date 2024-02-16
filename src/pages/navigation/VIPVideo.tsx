import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'umi';
import SettingCard from '../components/SettingCard';
import QRCode from 'qrcode.react';



const { Option } = Select;



export interface Props {
    name: string;
}



const VIPVideo: React.FC<Props> = () => {
    const [vipUrl, setVipUrl] = useState("")
    const [form] = Form.useForm();
    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: 'vip视频解析' },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            if (result.code != -1) {
                setUrlItemList(result.content);
            }


        },
    });







    const renderWebCategoryOptions = () => {

        const options: any = []
        urlItemList.forEach((item: any) => {
            options.push(<Option key={item.name} value={item.url}>{item.name}</Option>)
        })
        return <Select style={{ width: 120 }} defaultValue={options[0]} >
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
                支持爱奇艺、腾讯视频、优酷视频、B站视频等免费解析观看，如线路不支持请切换线路
                <Form form={form} >
                    <Form.Item
                        name="vipSrc"
                        label="vip线路："
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
                <SettingCard name="vipPageFooter" />
                <QRCode
                    id="qrCode"
                    value="https://qgeybn-ovmiro-8000.preview.myide.io/web/play/navigation/VIPVideo?url=https://v.youku.com/v_show/id_XNjM3MTYyMTY1Ng==.html?spm=a2hja.14919748_WEBMOVIE_JINGXUAN.drawer3.d_zj1_3&s=fcacdd773de94ab5aa4d&scm=20140719.apircmd.4424.show_fcacdd773de94ab5aa4d&vipSrc=https://jx.xmflv.com/?url="
                    size={200} // 二维码的大小
                    fgColor="#000000" // 二维码的颜色
                    style={{ margin: 'auto' }}
                    imageSettings={{ // 二维码中间的logo图片
                        src: 'logoUrl',
                        height: 100,
                        width: 100,
                        excavate: true, // 中间图片所在的位置是否镂空
                    }}
                />

            </GridContent>
        </PageContainer>
    );
};

export default VIPVideo;
