import { login } from '@/services/ant-design-pro/api';
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
    state: URLItemPageState;
    effects: {
        fetchProject: Effect;
    };
    reducers: {
        saveProject: Reducer;
    };
};

const initState = {
    list: [],
};

const UserModel: UserModelType = {
    namespace: 'navigation',
    state: { ...initState },
    effects: {
        *fetchProject({ callback }, { call, put }) {
            const response = yield call(login);
            yield put({
                type: 'saveProject',
                payload: response.content?.records || [],
            });
            if (response?.content?.records) {
                callback(response?.content?.records);
            }
        },
    },
    reducers: {
        saveProject(state, { payload }) {
            return {
                ...state,
                project: [...payload],
            };
        },
    },
};

export default UserModel;
