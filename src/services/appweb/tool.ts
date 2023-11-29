// @ts-ignore
/* eslint-disable */
import { request } from 'umi';



export async function getDomainsByDomain(params?: any) {
    return request('/api/tool/getDomainsByDomain', {
        method: 'GET',
        data: params,
    });
}