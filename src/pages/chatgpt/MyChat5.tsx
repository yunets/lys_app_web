import { formatDate } from '@/utils/TimeUtils';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Tag, Button, Input, Avatar, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.less';
import gpt from '@/assets/img/gpt.png';
export interface Props {
    name: string;
}





const MyChat5: React.FC<Props> = () => {
    const [list, setList] = useState<{}[]>([]);
    const [chatCount, setChatCount] = useState<any>(0);
    const ws = useRef<WebSocket | null>(null);




    useEffect(() => {
        ws.current = new WebSocket("ws://124.220.104.235/appchat/" + localStorage.getItem("user-ip"));
        ws.current.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            const a = {
                "ip": localStorage.getItem("user-ip"),
                "address": localStorage.getItem("user-address"),
                "msg": "上线了！",
                "time": formatDate(new Date())
            };
            ws.current.send(JSON.stringify(a));


        };


        ws.current.onmessage = (evt) => {
            console.log("数据已接收..." + evt.data);

            const obj = JSON.parse(evt.data);
            // 等于这个条件说明就是JSON字符串 会返回true
            if (typeof obj == 'object' && obj) {
                // list.push(obj);
                // setList([...list, obj]);

                setList((prevState) => [...prevState, obj]);
            }
        };



        ws.current.onclose = function () {
            // 关闭 websocket
            console.log("连接已关闭...");
        };

    }, []);
    const [form] = Form.useForm();

    const handleSearch = async () => {
        form.validateFields()
            .then((values) => {
                if (chatCount > 5 && localStorage.getItem("user-name").includes("未登录")) {
                    message.info("关注公共号：恒生科技小姐姐！,回复666即可每日不限次数！");
                } else {
                    const a = {
                        "ip": localStorage.getItem("user-ip"),
                        "address": localStorage.getItem("user-address"),
                        "msg": values.name,
                        "time": formatDate(new Date())
                    };
                    ws.current.send(JSON.stringify(a));
                    setChatCount(chatCount + 1);
                }

            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };
    const handleClear = async () => {
        setList([]);
    };
    return (
        <PageContainer>
            <GridContent>
                <div className={styles.myChatDiv}>
                    {list.map((item: any) => {

                        if (localStorage.getItem("user-ip") === item.ip) {
                            return <div key={item.ip} className={styles.myChatRight} >
                                <Avatar src={<img src={gpt} alt="avatar" />} />
                                {item.address} {item.time}--每日扫码领红包，月初最大
                                <br />
                                {item.msg}</div>;
                        }


                        return <div key={item.ip} className={styles.myChatLeft} >
                            <Avatar src={<img src={gpt} alt="avatar" />} />
                            {item.address} {item.time}--每日扫码领红包，月初最大
                            <br />
                            {item.msg}</div>;
                    })}
                </div>
                <Form form={form} className={styles.myChatForm}>

                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true, message: '请输入聊天内容，关注微信公共号：恒生科技小姐姐！', whitespace: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item> <Button type="primary" onClick={() => { handleSearch(); }}>
                        群发消息
                    </Button>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <Button type="primary" onClick={() => { handleClear(); }}>
                            清空聊天记录
                        </Button></Form.Item>
                </Form>

            </GridContent>


        </PageContainer>
    );
};

export default MyChat5;
