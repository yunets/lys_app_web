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

export async function FundInfoDelete(params?: any) {
    return request('/api/FundInfo/delete', {
        method: 'POST',
        data: params,
    });
}

export async function FundInfoUpdate(params?: any) {
    return request('/api/FundInfo/updateSelect', {
        method: 'POST',
        data: params,
    });
}

export async function FundDictionaryList(params?: any) {
    return request('/api/FundInfo/dictionary/listByPage', {
        method: 'POST',
        data: params,
    });
}

export async function getFundInfo(fundCode: any) {
    console.log(fundCode);
    console.log(`/api/FundInfo/getFundInfo/${fundCode}`);
    return request(`/api/FundInfo/getFundInfo/${fundCode}`, {
        method: 'GET',
        data: {},
    });
}


export async function THistoryList(params?: any) {
    return request('/api/th/list', {
        method: 'POST',
        data: params,
    });
}

export async function THistorySave(params?: any) {
    return request('/api/th/save', {
        method: 'POST',
        data: params,
    });
}

export async function THistoryUpdate(params?: any) {
    return request('/api/th/updateSelect', {
        method: 'POST',
        data: params,
    });
}