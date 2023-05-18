// @ts-ignore
/* eslint-disable */
import { request } from 'umi';



export async function FundInfoList(params?: any) {
    return request('/api/FundInfo/list', {
        method: 'POST',
        data: params,
    });
}


export async function FundInfoSave(params?: any) {
    return request('/api/FundInfo/save', {
        method: 'POST',
        data: params,
    });
}

