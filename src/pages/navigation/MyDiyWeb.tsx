import UserModel, { UserModelType } from '@/models/navigation';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Modal, Form } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { connect, Dispatch, request, useRequest } from 'umi';
import Example from './components/example';
import ItemCard from './components/ItemCard';
import MyContainer from './components/MyContainer';
import UserModel1 from './model';






const { Option } = Select;
export interface Props {
    name: string;
    list: any;
    loading: any;
    title: any;
    dispatch: Dispatch;
}




const MyDiyWeb: React.FC<Props> = (props) => {


    const {
        list,
        loading,
        dispatch,
        title
    } = props;
    debugger;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };









    const fetchTest = (data: any) => {
        dispatch({
            type: 'navigation/fetchProject',
            payload: {
                data,
            },
        });
    };


    const [url, setUrl] = useState('https://cn.bing.com');

    return (
        <PageContainer>


            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <Form>
                    <Form.Item
                        name="email"
                        label="网址"
                        rules={[
                            {
                                type: 'url',
                                message: '网址不合法，样例https://cn.bing.com!',
                            },
                            {
                                required: true,
                                message: '请输入网址',
                            },
                        ]}
                    >
                        <Input value={url} onChange={(e) => {

                            setUrl(e.target.value);
                        }} />
                    </Form.Item>
                    <Form.Item
                        name="nickname"
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <div><iframe src={"" + url + ""}></iframe></div>
            </Modal>








            <GridContent>
                <Card bordered={false}>
                    <Button type="primary" onClick={showModal}>
                        新增网址
                    </Button>
                    <hr />
                    {/* <a> title: {title}</a><br />
                    <a> list: {JSON.stringify(list)}</a><br />
                    <a>loading: {JSON.stringify(loading)}</a>
                    <Button type="primary" onClick={() => { fetchTest(null) }}> fetchTest</Button> */}
                    <DndProvider backend={HTML5Backend} >
                        <MyContainer name="name111" />
                    </DndProvider>
                </Card>
            </GridContent>



        </PageContainer >
    );
};

export type ConnectState = {
    list: any;
    loading: any;
    title: any;
};
function mapStateToProps(state: any) { //state是项目所有的models

    const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
    const { title } = state.navigation;
    return {
        list,
        title
    };
}
export default connect(mapStateToProps)(MyDiyWeb as any);


