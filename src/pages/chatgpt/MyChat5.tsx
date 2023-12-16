import { formatDate } from '@/utils/TimeUtils';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Tag, Button, Input, Avatar } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.less';
import gpt from '@/assets/img/gpt.png';
export interface Props {
    name: string;
}





const MyChat5: React.FC<Props> = () => {
    const [list, setList] = useState<{}[]>([])
    const ws = useRef<WebSocket | null>(null);




    useEffect(() => {
        ws.current = new WebSocket("ws://124.220.104.235/appchat/" + localStorage.getItem("user-ip"));
        ws.current.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            const a = {
                "ip": localStorage.getItem("user-ip"),
                "address": localStorage.getItem("user-address"),
                "msg": "上线了！"
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

                const a = {
                    "ip": localStorage.getItem("user-ip"),
                    "address": localStorage.getItem("user-address"),
                    "msg": values.name,
                    "time": formatDate(new Date())
                };
                ws.current.send(JSON.stringify(a));



            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };
    return (
        <PageContainer>



            <GridContent>
                <h3><Tag color="magenta">chatgpt在线交流</Tag></h3>
                <div className={styles.myChatLeft}>
                    {list.map((item: any) => {
                        return <Tag color="#108ee9" key={item.ip} >
                            <Avatar src={<img src={gpt} alt="avatar" />} />
                            {item.address} {item.time}
                            <br />
                            {JSON.stringify(item)}</Tag>;
                    })}
                </div>
                <Form form={form} className={styles.myChatForm}>

                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ message: '请输入内容', whitespace: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item> <Button type="primary" onClick={() => { handleSearch(); }}>
                        群发消息
                    </Button></Form.Item>
                </Form>

            </GridContent>


        </PageContainer>
    );
};

export default MyChat5;
