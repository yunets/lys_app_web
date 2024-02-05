import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'umi';
import SettingCard from '../components/SettingCard';



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
                <SettingCard name="合作" />
            </GridContent>
        </PageContainer>
    );
};

export default VIPVideo;
