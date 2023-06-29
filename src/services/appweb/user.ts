// @ts-ignore
/* eslint-disable */
import { request } from 'umi';



export async function listByPage(params?: any) {
    return request('/api/user/listByPage', {
        method: 'POST',
        data: params,
    });
}

export async function register(params?: any) {
    return request('/api/user/register', {
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

export async function FundInfoDelete(params?: any) {
    return request('/api/FundInfo/delete', {
        method: 'POST',
        data: params,
    });
}


export async function FundInfoUpdate(params?: any) {
    return request('/api/FundInfo/update', {
        method: 'POST',
        data: params,
    });
}