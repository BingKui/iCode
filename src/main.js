// 主入口文件
import { app, Tray, screen } from 'electron';
import { isDev, isMac, mainURL, createMainWindow, createTrayMenu, trayIcon, appIcon, createSearchWindow, searchURL } from '@/utils';
import { AddAppSetting, AddAppUpdate, AddDataBase, AddMenuList, AddSearchUpdate, AddShortcuts } from '@/support';
import { getCursorPoint, getPointDisplay } from './feature/common';
import { SEARCH_WINDOW } from '@constants/common';
import DB_NAME from '@constants/db';

let mainWindow, searchWindow, tray;

// 初始化窗口
const initAppWindow = () => {
    mainWindow = createMainWindow();
    mainWindow.loadURL(mainURL);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    if (isDev) mainWindow.openDevTools();
};

const initSearchWindow = () => {
    searchWindow = searchWindow ? searchWindow : createSearchWindow();
    searchWindow.loadURL(searchURL);
    AddSearchUpdate(searchWindow);
};
app.whenReady().then(() => {
    // 初始化窗口
    initAppWindow();
    // 初始化搜索框
    initSearchWindow();
    // 添加测试数据库
    for (let key in DB_NAME) {
        AddDataBase(DB_NAME[key]);
    }
    // 添加设置支持
    AddAppSetting();
    // 添加自定义菜单
    AddMenuList();
    // 添加系统托盘图标
    if (!tray) {
        // 添加托盘
        tray = new Tray(trayIcon);
        tray.setToolTip(app.getName());
        // 左键打开
        tray.on('click', (event, bounds, position) => {
            tray.setContextMenu(null);
            mainWindow ? mainWindow.show() : initAppWindow();
        });
        // 右键点击打开菜单
        tray.on('right-click', (event, bounds) => {
            const contextMenu = createTrayMenu();
            tray.setContextMenu(contextMenu);
        });
    }
    // 支持更新
    AddAppUpdate();
    // 开发环境修改dock图标
    if (isDev && app.dock) {
        app.dock.setIcon(appIcon);
    }
    // 添加快捷键
    AddShortcuts('Option+Space', () => {
        if (searchWindow.isVisible()) return;
        const point = getCursorPoint();
        const item = getPointDisplay(point);
        const { x, width } = item.workArea;
        searchWindow.setBounds({
            x: x + (width - SEARCH_WINDOW.width) / 2,
            y: 200,
        });
        searchWindow.show();
        if (isDev) searchWindow.openDevTools();
        AddShortcuts('Esc', () => {
            searchWindow && searchWindow.hide();
        });
    });
    screen.on('display-metrics-changed', (event) => {
        console.log('屏幕内容修改 => ');
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        tray.destroy();
        tray = null;
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        initAppWindow();
    } else {
        mainWindow.show();
    }
});

app.on('second-instance', () => {
    if (mainWindow) {
        mainWindow.restore();
        mainWindow.show();
    }
});
