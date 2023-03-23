import { Button } from 'antd'
import update from 'immutability-helper'
import { FC, useEffect } from 'react'
import { useCallback, useState } from 'react'
import { useRequest } from 'umi'
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

export const Container: FC = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text1: 'liuyunshengsir1',
                text2: 'liuyunshengsir2',
            },
            {
                id: 2,
                text1: 'liuyunshengsir2',
                text2: 'liuyunshengsir2',
            },

        ])


        useRequest(() => ({
            url: '/api/webInfo/list',
            method: 'get',
            data: {},
        }), {
            manual: false,
            onSuccess: (result, params) => {
                console.log(result);
                setCards(result.content);

            },
        });

        useEffect(() => {

            console.log('开启延时器')
            const timer = setTimeout(() => {
                console.log('进入延时器')
                // 注:在setCount中使用箭头函数是最好方式之一,只有一个timer生成
                console.log(cards);
            }, 1000)
            return () => {
                console.log('清除延时器')
                clearTimeout(timer)
            }

        }, [cards]);


        const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
            // console.log(cards)
            // console.log(cards[dragIndex])
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
                <Button type="primary" onClick={() => { console.log(cards); }}> 当前次序</Button>
                <Button type="primary" onClick={() => { console.log(cards); }}> 新增</Button>
                <br />
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>


            </>
        )
    }
}

