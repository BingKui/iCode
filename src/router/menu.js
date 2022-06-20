// main
import Main from '@views/Main';
import PublicCode from '@views/PublicCode';
import PrivateCode from '@views/PrivateCode';
import CodeAdd from '@views/CodeAdd';
import About from '@views/About';
import Setting from '@views/Setting';
import Search from '@views/Search';

export const MenuList = [{
    icon: 'ios-home-outline', // 图标
    name: '主页', // 菜单名称
    router: 'main', // 菜单路由
}, {
    icon: 'ios-albums-outline', // 图标
    name: '公共代码', // 菜单名称
    router: 'public', // 菜单路由
}, {
    icon: 'ios-lock-outline', // 图标
    name: '私有代码', // 菜单名称
    router: 'private', // 菜单路由
}, {
    icon: 'ios-settings-outline', // 图标
    name: '设置', // 菜单名称
    router: 'setting', // 菜单路由
}, {
    icon: 'ios-information-circle-outline', // 图标
    name: '关于', // 菜单名称
    router: 'about', // 菜单路由
}];

export const MenuRouter = [{
    path: '/',
    redirect: '/main',
}, {
    name: 'main',
    router: 'main',
    path: '/main',
    component: Main,
}, {
    name: 'public',
    router: 'public',
    path: '/public',
    component: PublicCode,
}, {
    name: 'public-add',
    router: 'public-add',
    path: '/public-add',
    component: CodeAdd,
}, {
    name: 'private',
    router: 'private',
    path: '/private',
    component: PrivateCode,
}, {
    name: 'private-add',
    router: 'private-add',
    path: '/private-add',
    component: CodeAdd,
}, {
    name: 'setting',
    router: 'setting',
    path: '/setting',
    component: Setting,
}, {
    name: 'about',
    router: 'about',
    path: '/about',
    component: About,
}, {
    name: 'search',
    router: 'search',
    path: '/search',
    component: Search,
}];
