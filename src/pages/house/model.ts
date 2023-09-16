import { HouseInfoListByPage } from '@/services/appweb/house';
import type { Effect, Reducer } from 'umi';



export type FundModelType = {
    namespace: 'house';
    state: { list: any };
    effects: {
        fetchHouseInfoListByPage: Effect;


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
