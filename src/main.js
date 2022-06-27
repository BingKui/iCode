// 主入口文件
import { app, Tray, screen } from 'electron';
import { isDev, isMac, mainURL, createMainWindow, createTrayMenu, trayIcon, appIcon, createSearchWindow, searchURL, addURL } from '@/utils';
import { AddAppSetting, AddAppUpdate, AddDataBase, AddMenuList, AddSearchUpdate, AddShortcuts } from '@/support';
import { getCursorPoint, getPointDisplay } from './feature/common';
import { SEARCH_WINDOW } from '@constants/common';
import DB_NAME from '@constants/db';
import path from 'path';

let mainWindow, searchWindow, tray;

// 初始化窗口
const initAppWindow = (url) => {
    mainWindow = createMainWindow();
    mainWindow.loadURL(url || mainURL);
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

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

const PROTOCOL = 'iCode';
const args = [];
if (!app.isPackaged) {
    // 如果是开发阶段，需要把我们的脚本的绝对路径加入参数中
    args.push(path.resolve(process.argv[1]));
}
if (isDev) {
    // 如果是开发阶段，需要把我们的脚本的绝对路径加入参数中
    args.push(path.resolve(process.argv[1]));
}
// 加一个 `--` 以确保后面的参数不被 Electron 处理
args.push('--');
app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, args);

function handleArgv(argv) {
    const prefix = `${PROTOCOL}:`;
    // 开发阶段，跳过前两个参数（`electron.exe .`）
    // 打包后，跳过第一个参数（`myapp.exe`）
    const offset = app.isPackaged ? 1 : 2;
    const url = argv.find((arg, i) => i >= offset && arg.startsWith(prefix));
    if (url) handleUrl(url);
}

// 如果打开协议时，没有其他实例，则当前实例当做主实例，处理参数
handleArgv(process.argv);

// 其他实例启动时，主实例会通过 second-instance 事件接收其他实例的启动参数 `argv`
app.on('second-instance', (event, argv) => {
    console.log(argv);
    // Windows 下通过协议URL启动时，URL会作为参数，所以需要在这个事件里处理
    if (process.platform === 'win32') {
        handleArgv(argv);
    }
});

// macOS 下通过协议URL启动时，主实例会通过 open-url 事件接收这个 URL
app.on('open-url', (event, urlStr) => {
    console.log(urlStr);
    handleUrl(urlStr);
});

function handleUrl(urlStr) {
    // myapp://?name=1&pwd=2
    const urlObj = new URL(urlStr);
    const { searchParams } = urlObj;
    // console.log(urlObj.search); // -> ?name=1&pwd=2
    // console.log(searchParams.get('name')); // -> 1
    // console.log(searchParams.get('pwd')); // -> 2
    // 根据需要做其他事情
    const url = `${addURL}?isPublic=1&code=${searchParams.get('code')}`;
    mainWindow ? mainWindow.loadURL() : initAppWindow(url);
}

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
