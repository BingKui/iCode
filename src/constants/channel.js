// 主进程与渲染进程之间的通信渠道

// 系统操作
export const ACTION_KEY = {
    // app 相关
    getSetting: 'get-user-setting',
    setSetting: 'set-user-setting',
    // 更新相关的操作
    updateCheck: 'app-update-check', // 检查更新
    updateMessage: 'app-update-message', // 更新信息
    updateDownload: 'app-update-download', // 下载更新
    updateProgress: 'app-update-progress', // 更新进度
    updateNow: 'app-update-now', // 立即更新
    // 数据库相关
    dbAddItem: name => `${name}-db-add-item`, // 添加
    dbDeleteItem: name => `${name}-db-delete-item`,
    dbUpdateItem: name => `${name}-db-update-item`,
    dbFindItem: name => `${name}-db-find-item`,
    dbFind: name => `${name}-db-find`,
    dbCount: name => `${name}-db-count`,
    // 搜索相关
    searchAction: 'search-action',
};
// 操作结果后缀
export const ACTION_RESULT = '-result';

// 更新消息类型
export const UPDATE_MESSAGE_TYPE = {
    message: 'update-message',
    actionYes: 'update-action-yes',
    actionNo: 'update-action-no',
    actionComplate: 'update-action-complate',
    progress: 'update-progress',
};
