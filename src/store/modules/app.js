import { getUserInfo } from '@/api/gist';
import { getUserSetting, setUserSetting } from '@common/common';
import { getList } from '@/common/db';
import DBNAME from '@constants/db';
import { addContributeItem, updateLocalDB } from '@/common/gist';

const app = {
    state: {
        setting: {
            autoStart: false,
            dockShow: false,
            autoUpdate: false,
            githubToken: '',
            publicId: '',
            privateId: '',
        },
        isDarkMode: false,
        userInfo: {},
        userList: [],
    },
    mutations: {
        USER_SETTING: (state, setting) => {
            Object.assign(state, { setting: { ...setting } });
        },
        CHANGE_MODE: (state, isDarkMode) => {
            Object.assign(state, { isDarkMode });
        },
        USER_INFO: (state, userInfo) => {
            Object.assign(state, { userInfo });
        },
        USER_LIST: (state, userList) => {
            Object.assign(state, { userList });
        },
    },
    actions: {
        // 获取系统设置
        getSystemSetting: async ({ commit, dispatch }) => {
            const setting = await getUserSetting();
            commit('USER_SETTING', setting);
            return setting;
        },
        // 修改系统设置
        setSystemSetting: async ({ commit }, userSetting) => {
            const setting = await setUserSetting(userSetting);
            commit('USER_SETTING', setting);
            return setting;
        },
        changeSystemMode: ({ commit }, isDarkMode) => {
            commit('CHANGE_MODE', isDarkMode);
        },
        // 获取用户信息
        getBindUserInfo: async ({ commit }, token) => {
            const info = await getUserInfo(token);
            commit('USER_INFO', info);
        },
        // 退出用户
        logoutUser: async ({ commit, dispatch }) => {
            const setting = await setUserSetting({
                githubToken: '',
                publicId: '',
                privateId: '',
            });
            commit('USER_SETTING', setting);
            commit('USER_INFO', {});
            dispatch('getSystemSetting');
        },
        // 添加贡献者
        addContribute: async ({ commit }, item) => {
            const list = await addContributeItem(item);
            commit('USER_LIST', list);
            return list;
        },
        // 获取本地保存的代码贡献者
        getContribute: async ({ commit }) => {
            const list = await getList(DBNAME.config);
            commit('USER_LIST', list);
            return list;
        },
        updateLocal: async ({ dispatch, state }) => {
            const { githubToken } = state.setting;
            await updateLocalDB(githubToken);
            dispatch('getContribute');
        },
    },
};

export default app;
