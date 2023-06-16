import { Fragment, useState } from 'react';
import React from 'react';
import { useRequest } from 'umi';
import ItemShowReadOnly from './ItemShowReadOnly';
import { uniqueId } from 'lodash';



export interface Props {
    name: string;
}

const WebCategoryShow: React.FC<Props> = (props) => {
    const {
        name
    } = props;

    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/webInfo/listByWebCategoryName',
        method: 'post',
        data: { name: name },
    }), {
        manual: false,
        onSuccess: (result, params) => {
            console.log(result);
            if (result.code != -1) {
                setUrlItemList(result.content);
            }


        },
    });

    return (
        <Fragment>
            <div>
                <h1>{name}</h1>
                {
                    urlItemList.map((item1: any, index: number) => {
                        return (
                            <ItemShowReadOnly key={uniqueId()} item={item1} />
                        );
                    })
                }
            </div>
        </Fragment>
    );
};

export default WebCategoryShow;
