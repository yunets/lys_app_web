import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { request, useRequest } from 'umi';

import ItemShow from './components/ItemShow';

export interface Props {
  name: string;
}




const MyNavigation: React.FC<Props> = () => {
  const arr = ['a', 'b',];

  // const [data, setData] = useState(
  //   { "success": true, "data": { "name": "liuyunshengsir", "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png", "userid": "00000001", "email": "antdesign@alipay.com", "signature": "海纳百川，有容乃大", "title": "交互专家", "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED", "tags": [{ "key": "0", "label": "很有想法的" }, { "key": "1", "label": "专注设计" }, { "key": "2", "label": "辣~" }, { "key": "3", "label": "大长腿" }, { "key": "4", "label": "川妹子" }, { "key": "5", "label": "海纳百川" }], "notifyCount": 12, "unreadCount": 11, "country": "China", "access": "admin", "geographic": { "province": { "label": "浙江省", "key": "330000" }, "city": { "label": "杭州市", "key": "330100" } }, "address": "西湖区工专路 77 号", "phone": "0752-268888888" } }
  // );

  const [count1, setCount1] = useState<number>(0)
  const [count2, setCount2] = useState<number>(0)

  const requestF = async () => {
    const a = await request('/api/url/list');
    console.log(a);
  }

  const requestFetch = async () => {
    const res = await fetch('/api/url/list');
    const data = await res.json();
    console.log(data);
  }




  //针对count1 产生了作用
  useEffect(() => {
    document.title = `You clicked ${count1} times`;
    console.log(count1)
  }, [count1]);


  const [urlItemList, setUrlItemList] = useState<any>([])
  const { data, loading, run } = useRequest(() => ({
    url: '/api/url/list',
    method: 'get',
    data: {},
  }), {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result);
      setUrlItemList(result.content);

    },
  });
  // useEffect(() => {
  //   //const data41 = data4.content;
  //   console.log(data);
  //   setUrlItemList(data || {});
  // }, [count2]);


  return (
    <PageContainer>
      MyDemo
      <GridContent>
        <Card bordered={false}>
          useEffect的使用
          {/* {JSON.stringify(data)} */}
          <div>
            <div style={{ marginBottom: 20 }} onClick={() => { setCount1(count1 + 1) }}>count1: {count1}</div>
            <div style={{ marginBottom: 20 }} onClick={() => { setCount2(count2 + 2) }}>count2: {count2}</div>
            <div style={{ marginBottom: 20 }} onClick={() => {

              run();
            }}>run: {loading}</div>
            <div style={{ marginBottom: 20 }} onClick={() => {
              requestF();
            }}>requestF: {count2}</div>
            <div style={{ marginBottom: 20 }} onClick={() => {
              requestFetch();
            }}>requestFetch: {count2}</div>
          </div>

          {
            urlItemList.map((item: any, index: number) => {
              return (
                <ItemShow key={index} item={item}>

                </ItemShow>
              );
            })
          }








        </Card>
      </GridContent>
    </PageContainer>
  );
};

export default MyNavigation;
