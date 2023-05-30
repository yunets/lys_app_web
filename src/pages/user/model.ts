import { getMyUrlList, } from '@/services/appweb/appweb';
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
    namespace: 'user';
    state: { list: any, title: any, name: any };
    effects: {
        fetchProject: Effect;
        fetchWebCategoryList: Effect;

    };
    reducers: {
        saveProject: Reducer;
    };
};

const initState = {
    list: {},
};

const UserModel1: UserModelType = {
    namespace: 'user',
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
