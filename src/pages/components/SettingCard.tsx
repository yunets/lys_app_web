import { Tag } from 'antd';
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
            <h3>

                {urlItemList && urlItemList.length > 0 && (
                    <Tag color="magenta">
                        {urlItemList[0] && urlItemList[0].content ? urlItemList[0].content : '暂无内容'}
                    </Tag>
                )}

            </h3>
        </Fragment >
    );
};

export default SettingCard;
