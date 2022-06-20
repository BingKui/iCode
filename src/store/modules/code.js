import { getList } from '@/common/db';
import DB_NAME from '@constants/db';
import logger from '@/common/logger';

import app from './app';

const code = {
    state: {
        // 独立窗口搜索结果
        searchCodeList: [],
        publicCodeList: [],
        privateCodeList: [],
    },
    mutations: {
        SEARCH_LIST: (state, searchCodeList) => {
            Object.assign(state, { searchCodeList });
        },
        PUBLIC_LIST: (state, publicCodeList) => {
            Object.assign(state, { publicCodeList });
        },
        PRIVATE_LIST: (state, privateCodeList) => {
            Object.assign(state, { privateCodeList });
        },
    },
    actions: {
        searchCode: async ({ commit }, searchValue) => {
            if (!searchValue) {
                commit('SEARCH_LIST', []);
                return;
            }
            const condition = {
                '$or': [{
                    name: new RegExp(searchValue, 'i'),
                }, {
                    desc: new RegExp(searchValue, 'i'),
                }],
            };
            const list = await getList(DB_NAME.local, condition);
            logger.success('查询的代码为 =>', list);
            commit('SEARCH_LIST', list);
        },
        // 查询公共代码
        searchPublic: async ({ commit }, searchValue) => {
            let condition = {
                isPublic: true,
            };
            if (searchValue) {
                condition = {
                    ...condition,
                    '$or': [{
                        name: new RegExp(searchValue, 'i'),
                    }, {
                        desc: new RegExp(searchValue, 'i'),
                    }],
                };
            }
            const list = await getList(DB_NAME.local, condition);
            logger.success('查询的Public代码为 =>', list);
            commit('PUBLIC_LIST', list);
        },
        // 搜索私有代码
        searchPrivate: async ({ commit }, searchValue) => {
            let condition = {
                isPublic: false,
            };
            if (searchValue) {
                condition = {
                    ...condition,
                    '$or': [{
                        name: new RegExp(searchValue, 'i'),
                    }, {
                        desc: new RegExp(searchValue, 'i'),
                    }],
                };
            }
            const list = await getList(DB_NAME.local, condition);
            logger.success('查询的Private代码为 =>', list);
            commit('PRIVATE_LIST', list);
        },
    },
};

export default code;
