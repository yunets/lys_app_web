import UserModel, { UserModelType } from '@/models/navigation';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Modal, Form } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { connect, Dispatch, request, useRequest } from 'umi';
import MyContainer from './components/MyContainer';






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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch({
            type: 'navigation/fetchProject',
            payload: {
                data: {},
            },
            callback: (response: any) => {
                console.log('this is callback' + JSON.stringify(response))
            }
        });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [webCategoryList, setWebCategoryList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webCategory/list',
        method: 'get',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setWebCategoryList(result.content);

        },
    });







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
                        name="urlName"
                        label="名称"
                        rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                {/* <div><iframe src={"" + url + ""} id="show"></iframe></div> */}
            </Modal>








            <GridContent>


                {webCategoryList.map((item, index) => {
                    return <Card bordered={false} key={item.uid}>



                        <DndProvider backend={HTML5Backend} >
                            <MyContainer name={item.name} webCategory={item} />
                        </DndProvider>
                    </Card>;
                })}



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


