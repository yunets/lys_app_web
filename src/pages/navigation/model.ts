import { getMyUrlList, webInfoSave, webCategoryList, webCategorySave, webCategoryListAll, webInfoUpdateList, webInfoDelete } from '@/services/appweb/appweb';
import type { Effect, Reducer } from 'umi';

export type URLItem = {
    name: string;
    url?: string;
    imgUrl?: string;
    comment: string;
    orderByNum?: string;
    userId?: string;
    createTime?: string;
    access?: string;
    delFlag?: string;
    type?: string;
};

export type URLItemPageState = {
    list: URLItem[];
};

export type UserModelType = {
    namespace: 'navigation';
    state: { list: any, title: any, name: any };
    effects: {
        fetchProject: Effect;
        fetchWebCategoryList: Effect;
        fetchWebCategoryListAll: Effect;
        fetchWebInfoSave: Effect;
        fetchWebCategorySave: Effect;
        fetchWebInfoUpdateList: Effect;
        fetchWebInfoDelete: Effect;
    };
    reducers: {
        saveProject: Reducer;
    };
};

const initState = {
    list: {},
};

const UserModel1: UserModelType = {
    namespace: 'navigation',
    state: {
        list: {},
        title: 'Welcome to liuyunshengsir  Bolg',
        name: 'wise'
    },
    effects: {
        *fetchProject({ payload, callback }, { call, put }) {
            const response = yield call(getMyUrlList, { ...payload });
            yield put({
                type: 'saveProject',
                payload: response,
            });
            callback(response);
        },
        *fetchWebCategoryList({ payload, callback }, { call, put }) {
            const response = yield call(webCategoryList, { ...payload });

            callback(response);
        },
        *fetchWebCategoryListAll({ payload, callback }, { call, put }) {
            const response = yield call(webCategoryListAll, { ...payload });

            callback(response);
        },
        *fetchWebCategorySave({ payload, callback }, { call, put }) {
            const response = yield call(webCategorySave, { ...payload });

            callback(response);
        },
        *fetchWebInfoSave({ payload, callback }, { call, put }) {
            const response = yield call(webInfoSave, { ...payload });

            callback(response);
        },
        *fetchWebInfoUpdateList({ payload, callback }, { call, put }) {
            const response = yield call(webInfoUpdateList, { ...payload });

            callback(response);
        },
        *fetchWebInfoDelete({ payload, callback }, { call, put }) {
            const response = yield call(webInfoDelete, { ...payload });

            callback(response);
        },
    },
    reducers: {
        saveProject(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};

export default UserModel1;
