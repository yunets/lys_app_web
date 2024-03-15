import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { FC, useEffect } from 'react'
import { Dispatch, connect, useDispatch, useRequest } from 'umi'

import { Card } from './Card'
const style = {
    // width: 100,

}
export interface ContainerState {
    cards: any[]
}

export interface Props {
    title: any;
    dispatch: Dispatch;
}
export const CateContainer: FC<Props> = (props) => {
    {
        const {
            //   dispatch,
            title
        } = props;
        const dispatch = useDispatch();




        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ])
        const [webCategoryList, setWebCategoryList] = useState<any>([]);

        useRequest(
            () => ({
                url: '/api/webCategory/list',
                method: 'get',
                data: {},
            }),
            {
                manual: false,
                onSuccess: (result, params) => {
                    console.log(result);
                    setWebCategoryList(result.content);
                    setCards(result.content);
                },
            },
        );


        const fetchUpdateWebInfoList = (webCategoryList1: any) => {
            debugger
            if (webCategoryList1.length > 0) {
                dispatch({
                    type: 'navigation/fetchWebCategoryUpdateList',
                    payload: webCategoryList1,
                    callback: (response: any) => {
                        console.log("fetchUpdateWebInfoList");
                    }
                });
            }
        };

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





        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])
        const renderCard = useCallback((card, index) => {
            return (
                <Card
                    key={card.uid}
                    index={index}
                    id={card.uid}
                    text={card.name}
                    moveCard={moveCard}
                />
            )
        }, [])
        return (
            <>
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
export default connect(mapStateToProps)(CateContainer as any);