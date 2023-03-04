import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import { Button } from 'antd';



export interface Props {
    name: string;
}

const VisitorInfo: React.FC<Props> = ({ }) => {

    const f = () => {
        return JSON.stringify(navigator);
    }

    const [visitorInfo, setVisitorInfo] = useState<any>({})

    //针对count1 产生了作用
    useEffect(() => {
        console.log(visitorInfo);
        setVisitorInfo(navigator.userAgent);
    }, [visitorInfo]);


    return (
        <Fragment>
            <div>
                {JSON.stringify(visitorInfo)}
                <Button type="primary" onClick={() => {
                    console.log(navigator);
                    setVisitorInfo(navigator.userAgent);
                }}> 当前次序</Button>
            </div>
        </Fragment>
    );
};

export default VisitorInfo;
