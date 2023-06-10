import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;

export interface Props {
    name: string;
}




const MutilSearchBar: React.FC<Props> = () => {




    const [searchUrl, setSearchUrl] = useState<string>("https://www.baidu.com");

    const handleChange = (value: string) => {
        setSearchUrl(value);
    };

    const [searchContent, setSearchContent] = useState<string>("");



    return (
        <div>
            <Input.Group compact>
                <Select defaultValue={searchUrl} onChange={handleChange} >
                    <Option value="https://www.baidu.com">百度</Option>
                    <Option value="bing">bing</Option>
                    <Option value="搜狗">搜狗</Option>
                </Select>
                <Input style={{ width: '50%' }} onChange={(e) => { setSearchContent(e.target.value) }} />
                <Button type="primary" onClick={() => { window.open(`${searchUrl}/s?wd=${searchContent}`, '_blank',); }}> 搜索</Button>
            </Input.Group>
        </div>
    );
};

export default MutilSearchBar;
