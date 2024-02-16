import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, Modal, Select } from 'antd';
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
    const [shareUrl, setShareUrl] = useState("http://124.220.104.235/web/play/navigation/VIPVideo")
    const [shareModal, setShareModal] = useState(false)
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

            const urls = window.location.href.split("VIPVideo?");
            const paramsURL = new URLSearchParams(urls[1]);

            form.setFieldValue('url', paramsURL.get("url"));
            form.setFieldValue('vipSrc', paramsURL.get("vipSrc"));
            setShareUrl(window.location.href);
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
                setShareUrl(window.location.origin + "/web/play/navigation/VIPVideo?url=" + values.url + "&vipSrc=" + values.vipSrc);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    const setShareModalFalse = async () => {
        setShareModal(false);
    };
    const setShareModalTrue = async () => {
        setShareModal(true);
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
                <Button type="primary" onClick={setShareModalTrue}>
                    视频分享
                </Button>
                <div><iframe src={vipUrl} allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="100%" height="450px" /></div>
                <SettingCard name="vipPageFooter" />


                <Modal title="视频分享" open={shareModal} onOk={setShareModalFalse} onCancel={setShareModalFalse}>
                    <p> 微信或者手机浏览器扫描二维码手机观看或者复制链接浏览器直接打开：<br />
                        {shareUrl}<br />
                    </p>
                    <QRCode
                        id="qrCode"
                        value={shareUrl}
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
                </Modal>

            </GridContent>
        </PageContainer>
    );
};

export default VIPVideo;
