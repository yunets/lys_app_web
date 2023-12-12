import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";



export interface Props {
    name: string;
}





const MyChat5: React.FC<Props> = () => {

    const ws = new WebSocket("ws://localhost/appchat/username2");
    useEffect(() => {

        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("发送数据");

        };

        ws.onmessage = function (evt) {
            console.log("数据已接收..." + evt.data);
        };

        ws.onclose = function () {
            // 关闭 websocket
            console.log("连接已关闭...");
        };

    }, []);


    return (
        <PageContainer>



            <GridContent>
                <h3><Tag color="magenta">！</Tag></h3>


            </GridContent>


        </PageContainer>
    );
};

export default MyChat5;
