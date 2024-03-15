import { Button, Form, Input, Modal, message } from 'antd'
import update from 'immutability-helper'
import { FC, useEffect } from 'react'
import { useCallback, useState } from 'react'
import { connect, Dispatch, useRequest } from 'umi'
import { Card } from './Card'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'



const style = {
    // width: '300px',
}

// export interface Item {
//     // id: number
//     // text1: string
//     // text2: string
//     urlInfo: any
// }

export interface ContainerState {
    cards: any[]
}
export interface Props {
    webCategory: any;
    list: any;
    loading: any;
    title: any;
    dispatch: Dispatch;
    updateWebCategoryList: any;
    editInfo: any;
}
const MyContainer: FC<Props> = (props) => {
    {
        const {
            webCategory,
            dispatch,
            updateWebCategoryList,
            editInfo
        } = props;


        const [cards, setCards] = useState([])


        const aaa = () => {
            updateWebCategoryList();
        }
        const editInfo2 = (webInfoList: any) => {
            editInfo(webInfoList);
        }


        const fetchWebCategoryDelete = (webCategory1: any) => {
            dispatch({
                type: 'navigation/fetchWebCategoryDelete',
                payload: {
                    ...webCategory1,
                }, callback: (response: any) => {
                    console.log("fetchUpdateWebInfoList");
                    aaa();
                }
            });
        };


        const fetchUpdateWebInfoList = (webInfoList: any) => {
            if (webInfoList.length > 0) {
                dispatch({
                    type: 'navigation/fetchWebInfoUpdateList',
                    payload: {
                        webInfoList,
                    }, callback: (response: any) => {
                        console.log("fetchUpdateWebInfoList");
                    }
                });
            }
        };

        // 只执行一次
        useEffect(() => {
            setCards(webCategory.webInfoList);

        }, [webCategory.webInfoList]);


        useEffect(() => {
            console.log('开启延时器')
            const timer = setTimeout(() => {
                console.log('进入延时器')
                // 注:在setCount中使用箭头函数是最好方式之一,只有一个timer生成
                cards.forEach((i: any, index) => {
                    i.weight = index;
                });

                setCards(cards);
                fetchUpdateWebInfoList(cards);
            }, 1000)
            return () => {
                console.log('清除延时器')

                clearTimeout(timer)
            }

        }, [cards]);









        const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
            setCards((prevCards: any) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex] as any],
                    ],
                }),
            )
        }, [])

        const renderCard = useCallback(
            (card: any, index: number) => {
                return (
                    <Card
                        key={card.uid}
                        index={index}
                        id={card.uid}
                        text={card.name}
                        itemUrl={card}
                        moveCard={moveCard}
                        aa={() => aaa()}
                        editInfo={() => editInfo2(card)}
                    />
                )
            },
            [],
        )

        const [form] = Form.useForm();

        const [isWebCategoryModalOpen, setIsWebCategoryModalOpen] = useState(false);

        const handleCancelWebCategory = () => {
            setIsWebCategoryModalOpen(!isWebCategoryModalOpen);
        };
        const handleOk = async () => {
            form.validateFields()
                .then((values) => {

                    dispatch({
                        type: 'navigation/fetchUpdateWebCategoryName',
                        payload: {
                            ...values, uid: webCategory.uid
                        },
                        callback: (response: any) => {
                            updateWebCategoryList();
                            message.success('操作成功！')
                        }
                    });
                    form.resetFields();
                    setIsWebCategoryModalOpen(false);
                })
                .catch((errorInfo) => {
                    console.log(errorInfo);
                });
        };
        return (
            <>
                {/* <Button type="primary" onClick={() => { console.log(cards); }}> 当前次序</Button>
                <Button type="primary" onClick={() => { console.log(cards); }}> 新增</Button> */}
                <Button type="primary" onClick={() => { console.log(cards); }}> {webCategory.name}</Button>

                <Button type="primary" onClick={() => { handleCancelWebCategory() }}>
                    <EditOutlined title='重命名' />重命名
                </Button>
                <Button onClick={() => { fetchWebCategoryDelete(webCategory) }}>
                    <DeleteOutlined title='重命名' />删除
                </Button>

                <br />
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
                <Modal title="编辑分类" open={isWebCategoryModalOpen} onOk={handleOk} onCancel={handleCancelWebCategory}>
                    <Form form={form}>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{ required: true, message: '请输入名称', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>




                    </Form>
                </Modal>

            </>
        )
    }
}

function mapStateToProps(state: any) { //state是项目所有的models
    const { list } = state.navigation; //获取namespace命名空间为navigation的models数据state
    const { title } = state.navigation;
    return {
        cards: list.content,
        title
    };
}
export default connect(mapStateToProps)(MyContainer as any);