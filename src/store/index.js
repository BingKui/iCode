import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import code from './modules/code';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: [
            'app',
            'code',
        ],
        storage: window.sessionStorage
    })],
    modules: {
        app,
        code,
    },
});

export default store;
