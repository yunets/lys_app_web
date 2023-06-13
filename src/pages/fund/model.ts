import { FundDictionaryList, FundInfoDelete, FundInfoList, FundInfoSave, FundInfoUpdate, getFundInfo, } from '@/services/appweb/fund';
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

export type FundModelType = {
    namespace: 'fund';
    state: { list: any, title: any, name: any };
    effects: {
        fetchFundInfoList: Effect;
        fetchFundInfoSave: Effect;
        fetchFundInfoDelete: Effect;
        fetchFundInfoUpdate: Effect;
        fetchFundDictionaryList: Effect;
        fetchGetFundInfo: Effect;

    };
    reducers: {
        saveProject1: Reducer;
    };
};

const initState = {
    list: {},
};

const UserModel1: FundModelType = {
    namespace: 'fund',
    state: {
        list: {},
        title: 'Welcome to liuyunshengsir  Bolg',
        name: 'wise'
    },
    effects: {



        *fetchFundInfoList({ payload, callback }, { call, put }) {
            const response = yield call(FundInfoList, { ...payload });

            callback(response);
        },
        *fetchFundInfoSave({ payload, callback }, { call, put }) {
            const response = yield call(FundInfoSave, { ...payload });

            callback(response);
        },
        *fetchFundInfoDelete({ payload, callback }, { call, put }) {
            const response = yield call(FundInfoDelete, { ...payload });

            callback(response);
        },
        *fetchFundInfoUpdate({ payload, callback }, { call, put }) {
            const response = yield call(FundInfoUpdate, { ...payload });

            callback(response);
        },
        *fetchFundDictionaryList({ payload, callback }, { call, put }) {
            const response = yield call(FundDictionaryList, { ...payload });

            callback(response);
        },
        *fetchGetFundInfo({ payload, callback }, { call, put }) {
            const fundCode = payload.fundCode;
            const response = yield call(getFundInfo, payload.fundCode, {});
            //const response = yield call(getFundInfo(payload.fundCode), {});

            callback(response);
        },

    },
    reducers: {
        saveProject1(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};

export default UserModel1;
