import { HouseInfoListByPage } from '@/services/appweb/house';
import { getDomainsByDomain } from '@/services/appweb/tool';
import type { Effect, Reducer } from 'umi';



export type FundModelType = {
    namespace: 'house';
    state: { list: any };
    effects: {
        fetchHouseInfoListByPage: Effect;
        fetchGetDomainsByDomain: Effect;


    };
    reducers: {
        save: Reducer;
    };
};

const initState = {
    list: {},
};

const UserModel1: FundModelType = {
    namespace: 'house',
    state: {
        list: {}
    },
    effects: {

        *fetchHouseInfoListByPage({ payload, callback }, { call, put }) {
            const response = yield call(HouseInfoListByPage, { ...payload });
            callback(response);
        },
        *fetchGetDomainsByDomain({ payload, callback }, { call, put }) {
            const response = yield call(getDomainsByDomain, { ...payload });
            callback(response);
        },


    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};

export default UserModel1;
