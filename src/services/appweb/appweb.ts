// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function getMyUrlList(params?: any) {
    return request('/api/webInfo/list', {
        method: 'GET',
        data: params,
    });
}

export async function fakeAccountLogin(params: any) {
    return request('/api/login/account', {
        method: 'POST',
        data: params,
    });
}

export async function webCategoryList(params?: any) {
    return request('/api/webCategory/list', {
        method: 'GET',
        data: params,
    });
}

export async function webCategoryListAll(params?: any) {
    return request('/api/webCategory/listAll', {
        method: 'GET',
        data: params,
    });
}

export async function webCategorySave(params?: any) {
    return request('/api/webCategory/save', {
        method: 'POST',
        data: params,
    });
}

export async function webInfoSave(params: any) {
    return request('/api/webInfo/save', {
        method: 'POST',
        data: params,
    });
}

export async function webInfoUpdateList(params: any) {
    return request('/api/webInfo/updateList', {
        method: 'POST',
        data: params,
    });
}