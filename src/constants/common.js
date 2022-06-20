// 一些公共的枚举值
export const SETTING_NAME = 'icode-setting';
// 系统基础设置
export const BASE_SETTING = {
    openAtLogin: false, // 开机自启动
    dockShow: false, // dock 展示图标，macOS
    autoUpdate: false, // 是否自动检查更新
    githubToken: '', // github token
    publicId: '', // 公共仓库 id
    privateId: '', // 私有仓库 id
};

// 平台值
export const PLATFORM_VALUE = {
    mac: 'darwin',
    win: 'win32',
    linux: 'linux',
};

// 更新地址
export const UPDATE_URL = 'https://oss.uiseed.cn/app/';

// 更新消息
export const UPDATE_MESSAGE = {
    error: '检查更新出错！',
    checking: '正在检查更新...',
    updateAva: '检测到新版本，是否下载？',
    updateNotAva: '你使用的已是最新版！',
    progress: '下载中...',
    downloaded: '下载完成，是否安装？',
};

// 搜索窗口配置
export const SEARCH_WINDOW = {
    minHeight: 55,
    maxHeight: 600,
    width: 680,
    itemHeight: 55,
    itemMaxLength: 7,
};
