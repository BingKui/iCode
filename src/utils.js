// 主程序相关方法
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
const { port, host } = require('../electron/config');
import { PLATFORM_VALUE, SEARCH_WINDOW } from '@constants/common';
import { ACTION_RESULT } from '@constants/channel';
import path from 'path';

// 是否是测试环境
export const isDev = process.env.ENV === 'dev';
// 是否是 Windows
export const isWin = process.platform === PLATFORM_VALUE.win;
// 是否是 Mac
export const isMac = process.platform === PLATFORM_VALUE.mac;
// 是否是 Linux
export const isLinux = process.platform === PLATFORM_VALUE.linux;
// 应用图标
export const appIcon = path.resolve(__dirname, './assets/app.png');
// 系统托盘图标
export const trayIcon = path.resolve(__dirname, isMac ? './assets/trayTemplate.png' : './assets/tray.png');
// 主界面地址
export const mainURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;
export const addURL = isDev ? `http://${host}:${port}/#/public-add` : `file://${__dirname}/index.html#/public-add`;
export const searchURL = isDev ? `http://${host}:${port}/#/search` : `file://${__dirname}/index.html#/search`;

/**
 * 创建主窗口
 * @returns BreoserWindow
 */
export const createMainWindow = () => {
    return new BrowserWindow({
        title: app.getName(),
        height: 700,
        width: 860,
        center: true,
        show: false, // 禁止显示
        autoHideMenuBar: true,
        resizable: false, // 不可修改窗口大小
        // maximizable: false, // 不存在最大化
        // skipTaskbar: true, // 任务栏显示
        // useContentSize: false, // 不允许修改大小
        // transparent: true, // 透明
        frame: false, // 不使用框架
        // fullscreenable: false,
        // titleBarStyle: 'hidden',
        // backgroundColor: 'none',
        roundedCorners: false, // 是否显示圆角（macOS）
        webPreferences: {
            devTools: isDev,
            scrollBounce: false,
            nodeIntegration: true,
            contextIsolation: false,
            // webSecurity: false,
        },
    });
};

export const createSearchWindow = () => {
    const searchWindow = new BrowserWindow({
        maxWidth: SEARCH_WINDOW.width,
        maxHeight: SEARCH_WINDOW.maxHeight,
        minHeight: SEARCH_WINDOW.minHeight,
        height: SEARCH_WINDOW.minHeight,
        width: SEARCH_WINDOW.width,
        center: true,
        zoomToPageWidth: true,
        useContentSize: true, // 使用内容大小
        show: false, // 禁止显示
        movable: true, // 不可移动
        autoHideMenuBar: true, // 隐藏菜单栏
        resizable: false, // 不可修改窗口大小
        maximizable: false, // 不存在最大化
        skipTaskbar: true, // 任务栏显示
        transparent: true, // 透明
        frame: false, // 不使用框架
        titleBarStyle: 'default',
        backgroundColor: 'none',
        thickFrame: false,
        alwaysOnTop: true,
        // roundedCorners: false, // 是否显示圆角（macOS）
        webPreferences: {
            devTools: isDev,
            scrollBounce: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: false,
            contextIsolation: false,
        },
    });
    // 设置在所有区域可见
    searchWindow.setVisibleOnAllWorkspaces(true, {
        visibleOnFullScreen: true,
    });
    // 绑定事件
    searchWindow.on('blur', () => {
        searchWindow.hide();
    });
    searchWindow.on('close', (event) => {
        event.preventDefault();
        searchWindow.hide();
    });
    return searchWindow;
};

/**
 * 生成状态栏菜单
 */
export const createTrayMenu = () => {
    return Menu.buildFromTemplate([
        { label: '退出', click: () => {
            app.exit();
            // 强制结束进程
        } },
    ]);
};

/**
 * 主进程通信事件封装
 * @param {String} channel 具体的通道
 * @param {Function} callback 回调函数，参数：通讯函数sender，具体的通信参数
 * @returns
 */
export const mainEvent = (channel, callback) => {
    ipcMain.on(channel, (event, ...params) => {
        const sender = (info) => event.sender.send(`${channel}${ACTION_RESULT}`, info);
        callback(sender, ...params);
    });
};

