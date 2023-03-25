import { Button } from 'antd'
import update from 'immutability-helper'
import { FC, useEffect } from 'react'
import { useCallback, useState } from 'react'
import { connect, Dispatch, useRequest } from 'umi'
import { Card } from './Card'



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
}
const MyContainer: FC<Props> = (props) => {
    {
        const {
            webCategory,
            dispatch,
        } = props;


        const [cards, setCards] = useState([])


        useRequest(() => ({
            url: '/api/webInfo/list',
            method: 'post',
            data: { ...webCategory }

        }), {
            manual: false,
            onSuccess: (result, params) => {
                console.log(result);
                setCards(result.content);

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

        useEffect(() => {

            console.log('开启延时器')
            const timer = setTimeout(() => {
                console.log('进入延时器')
                // 注:在setCount中使用箭头函数是最好方式之一,只有一个timer生成
                console.log(cards);
                //fetchTest(cards);
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
                    />
                )
            },
            [],
        )

        return (
            <>
                {/* <Button type="primary" onClick={() => { console.log(cards); }}> 当前次序</Button>
                <Button type="primary" onClick={() => { console.log(cards); }}> 新增</Button> */}
                <br />{webCategory.name}
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>


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