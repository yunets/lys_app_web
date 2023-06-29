import { getMyUrlList, } from '@/services/appweb/appweb';
import { listByPage, register } from '@/services/appweb/user';
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
        fetchlistByPage: Effect;
        fetchRegister: Effect;
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
        title: '',
        name: 'wise'
    },
    effects: {
        *fetchlistByPage({ payload, callback }, { call, put }) {
            const response = yield call(listByPage, { ...payload });

            callback(response);
        },
        *fetchRegister({ payload, callback }, { call, put }) {
            const response = yield call(register, { ...payload });
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
