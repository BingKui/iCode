import Vue from 'vue';
import Tpl from './index.vue';
import store from '@store/index';
import router from '@router/index';
import './styles/theme.less';
import dayjs from 'dayjs';

Vue.filter('timeFormat', (time) => {
    return dayjs(time).format('YYYY-MM-DD');
});

new Vue({
    router,
    store,
    render: h => h(Tpl),
}).$mount('#app');
