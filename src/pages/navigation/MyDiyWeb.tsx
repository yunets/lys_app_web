import UserModel, { UserModelType } from '@/models/navigation';
import { UploadOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Input, InputNumber, Card, Select, Modal, Form, FormInstance, message, Upload } from 'antd';
import React, { useEffect, useReducer, useRef, useState } from 'react';
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
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [webCategoryList, setWebCategoryList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webCategory/listAll',
        method: 'get',
        data: {},
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            setWebCategoryList(result.content);

        },
    });


    const updateWebCategoryList = () => {
        dispatch({
            type: 'navigation/fetchWebCategoryListAll',
            payload: {},
            callback: (response: any) => {
                setWebCategoryList(response.content);
            }
        });
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWebCategoryModalOpen, setIsWebCategoryModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showWebCategoryModal = () => {
        setIsWebCategoryModalOpen(true);
    };

    const handleOk = async () => {
        form.validateFields()
            .then((values) => {
                message.success('提交校验成功')
                dispatch({
                    type: 'navigation/fetchWebInfoSave',
                    payload: {
                        ...values,
                    },
                    callback: (response: any) => {
                        updateWebCategoryList();
                        message.success('操作成功！')
                    }
                });
                form.resetFields();
                // setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    const handleOkWebCategory = async () => {
        form2.validateFields()
            .then((values) => {
                dispatch({
                    type: 'navigation/fetchWebCategorySave',
                    payload: {
                        ...values,
                    },
                    callback: (response: any) => {
                        updateWebCategoryList();
                        message.success('操作成功！')
                    }
                });
                form2.resetFields();
                // setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });
    };






    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelWebCategory = () => {
        setIsWebCategoryModalOpen(false);
    };








    const renderWebCategoryOptions = () => {
        const options: any = []
        webCategoryList.forEach((item: any) => {
            options.push(<Option key={item.uid} value={item.uid}>{item.name}</Option>)
        })

        return <Select style={{ width: 120 }}  >
            {options}
        </Select>
    }

    const UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <PageContainer>


            <Modal title="新增网页" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item
                        name="webCategoryId"
                        label="分类"
                        rules={[{ required: true, message: '分类!', whitespace: true }]}
                    >
                        {renderWebCategoryOptions()}

                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true, message: '网页名称自动回填可修改!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="url"
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
                        <Input />
                    </Form.Item>


                </Form>
            </Modal>

            <Modal title="新增分类" open={isWebCategoryModalOpen} onOk={handleOkWebCategory} onCancel={handleCancelWebCategory}>
                <Form form={form2}>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true, message: '请输入名称', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="weight"
                        label="序号"
                        rules={[{ required: true, message: '序号', whitespace: true }]}
                    >
                        <Input type='number' />
                    </Form.Item>



                </Form>
            </Modal>








            <GridContent>
                <Button type="primary" onClick={showModal}>
                    新增网址
                </Button>
                <Button type="primary" onClick={showWebCategoryModal}>
                    新增分类
                </Button>
                <Upload {...UploadProps}>
                    <Button icon={<UploadOutlined />}>批量导入</Button>
                </Upload>

                {webCategoryList.map((item, index) => {
                    return <Card bordered={false} key={item.uid}>



                        <DndProvider backend={HTML5Backend} >
                            <MyContainer webCategory={item} />
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


