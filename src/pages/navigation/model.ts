import { getMyUrlList } from '@/services/appweb/appweb';
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
        title: 'Welcome to Wise.Wrong\'s Bolg',
        name: 'wise'
    },
    effects: {
        *fetchProject({ payload }, { call, put }) {
            const response = yield call(getMyUrlList, { ...payload });
            yield put({
                type: 'saveProject',
                payload: response,
            });
            // if (response?.content?.records) {
            //     callback(response?.content?.records);
            // }
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
