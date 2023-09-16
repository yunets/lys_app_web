// @ts-ignore
/* eslint-disable */
import { request } from 'umi';



export async function HouseInfoListByPage(params?: any) {
    return request('/api/HouseInfo/listByPage', {
        method: 'POST',
        data: params,
    });
}