import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';



export interface Props {
    name: string;
}





const MyChat5: React.FC<Props> = () => {
    const [list, setList] = useState<{}[]>([])
    const ws = useRef<WebSocket | null>(null);




    useEffect(() => {
        ws.current = new WebSocket("ws://localhost/appchat/" + localStorage.getItem("user-ip"));
        ws.current.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            const a = {
                "ip": localStorage.getItem("user-ip"),
                "address": localStorage.getItem("user-address"),
                "msg": "上线了！"
            };
            ws.current.send(JSON.stringify(a));


        };
        ws.current.addEventListener("message", event => {
            console.log("Message from server ", event.data)
            const obj = JSON.parse(event.data);
            // 等于这个条件说明就是JSON字符串 会返回true
            if (typeof obj == 'object' && obj) {
                list.push(obj);
                setList([...list, obj]);
            }
        });

        // ws.current.onmessage = (evt) => {
        //     console.log("数据已接收..." + evt.data);

        //     const obj = JSON.parse(evt.data);
        //     // 等于这个条件说明就是JSON字符串 会返回true
        //     if (typeof obj == 'object' && obj) {
        //         // list.push(obj);
        //         // setList(list);
        //     }
        // };



        ws.current.onclose = function () {
            // 关闭 websocket
            console.log("连接已关闭...");
        };

    }, []);


    return (
        <PageContainer>



            <GridContent>
                <h3><Tag color="magenta">！{JSON.stringify(list)}</Tag></h3>
                {list.map((item: any) => {
                    return <Tag color="magenta" key={item.ip}>{item.msg}</Tag>;
                })}

            </GridContent>


        </PageContainer>
    );
};

export default MyChat5;
