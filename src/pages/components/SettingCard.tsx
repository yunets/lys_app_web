import { Fragment, useState } from 'react';
import React from 'react';
import { useRequest } from 'umi';



export interface Props {
    name: string;
}

const SettingCard: React.FC<Props> = (props) => {
    const {
        name
    } = props;

    const [urlItemList, setUrlItemList] = useState<any>([])
    useRequest(() => ({
        url: '/api/setting/list',
        method: 'post',
        data: { uid: name },
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
                {urlItemList && urlItemList.length > 0 && (
                    <h5>
                        {urlItemList[0] && urlItemList[0].content ? urlItemList[0].content : '暂无内容'}
                    </h5>
                )}

            </div>
        </Fragment >
    );
};

export default SettingCard;
