import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Modal, Table, message } from 'antd';
import React, { useState } from 'react';
import wxzsm from '@/assets/img/wxzsm.jpg';


import { Dispatch, connect } from 'umi';
import styles from './index.less';



export interface Props {
    name: string;
    dispatch: Dispatch;
}




const TodayFrequencyStatistics: React.FC<Props> = (props) => {
    const {

        dispatch,
    } = props;

    const [form] = Form.useForm();







    const columns = [
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '运营商',
            dataIndex: 'operator',
            key: 'operator',
        },
        {
            title: '位置',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '访问时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];


    const [ipList, setIpList] = useState<any>([])



    const todayFrequencyStatistics = () => {
        dispatch({
            type: 'navigation/fetchTodayFrequencyStatistics',
            payload: {},
            callback: (response: any) => {
                setIpList(response.content);
            }
        });
    }

    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const today = new Date();
                const year = today.getFullYear().toString().substr(-2) + 1;
                const month = (today.getMonth() + 1).toString().padStart(2, '0') + 3;
                const day = today.getDate().toString().padStart(2, '0') + 5;

                const output = year + month + day;
                debugger
                console.log(values);
                if (values.code === output) {
                    todayFrequencyStatistics();
                    setIsModalOpen(false);
                } else {
                    message.error(`输入错误，赞赏后获取验证码查看`);
                }


                console.log(output);
                form.resetFields();

            })
            .catch((errorInfo) => {
                console.log(errorInfo);
                message.error(`输入错误，赞赏后获取验证码查看`);
            });






    };

    const handleCancel = () => {
        setIsModalOpen(false);
        if ("admin".includes(localStorage.getItem("user-name")) || localStorage.getItem("user-name").includes("shengsir")) {
            todayFrequencyStatistics();
        }
    };



    return (
        <PageContainer>


            <Modal title="数据查看验证" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>赞赏后关注：恒生科技小姐姐，获取验证码查看<a href="https://web.51.la/report/main?comId=21845483" target='_blank'> 概览</a><br /></p><br />

                <Form form={form}>
                    <Form.Item
                        name="code"
                        label="赞赏码"
                        rules={[]}
                    >
                        <img alt="logo" src={wxzsm} className={styles.myImg} />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label="赞赏后获取验证码查看"
                        rules={[{ required: true, message: '请赞赏后获取验证码!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>



            <Table dataSource={ipList} columns={columns} />;



        </PageContainer>
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
export default connect(mapStateToProps)(TodayFrequencyStatistics as any);