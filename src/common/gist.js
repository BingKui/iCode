import { createGistLibrary, getContributeList, getGistContent, getUserGistList, updateContributeList, updateOwnerGistContent } from '@/api/gist';
import DB_NAME from '@/constants/db';
import { PUBLIC_GIST_DESC, PRIVATE_GIST_DESC, PUBLIC_GIST_FILE_NAME, PRIVATE_GIST_FILE_NAME } from '@constants/gist';
import { addItem, getList, updateItem } from './db';

/**
 * 初始化仓库地址
 * @param {String} token 用户token
 */
export const initGistRepo = async (token) => {
    let privateId, publicId;
    // 执行仓库创建
    // 获取所有仓库
    const userAllList = await getUserGistList(token);
    // 判断名字是否存在 desc
    // 私用仓库
    const privateList = userAllList.filter(item => item.description === PRIVATE_GIST_DESC);
    const publicList = userAllList.filter(item => item.description === PUBLIC_GIST_DESC);
    // 存在更新本地id
    // 不存在创建，更新本地id
    if (privateList.length > 0) {
        privateId = privateList[0].id;
        // 更新本地数据
        await syncPrivateCode(token, privateId);
    } else {
        privateId = await createGistLibrary(token, PRIVATE_GIST_DESC, PRIVATE_GIST_FILE_NAME);
    }
    if (publicList.length > 0) {
        publicId = publicList[0].id;
        // 更新本地数据
        syncPublicCode(token, publicId);
    } else {
        publicId = await createGistLibrary(token, PUBLIC_GIST_DESC, PUBLIC_GIST_FILE_NAME, true);
    }
    return { privateId, publicId };
};

/**
 * 合并数据
 * @param {Array} online 线上数据
 * @param {Array} local 本地数据
 * @param {Boolean} isOwner 是否是所有者
 */
const margeListData = async (online, local, isOwner = false) => {
    const onlineIds = online.map(item => item.id);
    // 本地多出的部分，最后添加到最后
    const _localMore = local.filter(item => onlineIds.indexOf(item.id) == -1);
    for (let i = 0; i < online.length; i++) {
        const item = online[i];
        const localList = await getList(DB_NAME.local, { id: item.id });
        if (localList.length == 0) {
            await addItem(DB_NAME.local, { ...item, isOwner });
        } else {
            await updateItem(DB_NAME.local, localList[0]._id, { ...item, isOwner });
        }
    }
    // const targetList = [...online, ..._localMore];
    // 返回本地多出的部分
    return _localMore;
};

/**
 * 添加私有代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {Object} item 内容
 */
export const addPrivateItem =  async(token, id, item) => {
    if(!token || !id) return;
    // 获取所有数据
    const list = await getGistContent(token, id, PRIVATE_GIST_FILE_NAME);
    const tartgetList = [...list, item];
    await updateOwnerGistContent(token, id, PRIVATE_GIST_FILE_NAME, tartgetList);
};

/**
 * 更新私有代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {Object} item 内容
 */
export const updatePrivateItem = async (token, id, item) => {
    if(!token || !id) return;
    // 获取所有数据
    const list = await getGistContent(token, id, PRIVATE_GIST_FILE_NAME);
    const tartgetList = list.map(temp => {
        if (temp.id === item.id) {
            return item;
        }
        return temp;
    });
    await updateOwnerGistContent(token, id, PRIVATE_GIST_FILE_NAME, tartgetList);
};
/**
 * 删除私有代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {String} itemId id
 */
export const deletePrivateItem = async (token, id, itemId) => {
    if(!token || !id) return;
    // 获取所有数据
    const list = await getGistContent(token, id, PRIVATE_GIST_FILE_NAME);
    const tartgetList = list.filter(temp => temp.id !== itemId);
    await updateOwnerGistContent(token, id, PRIVATE_GIST_FILE_NAME, tartgetList);
};

/**
 * 同步私有代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 */
export const syncPrivateCode = async (token, id) => {
    if(!token || !id) return false;
    // 获取线上的代码
    const online = await getGistContent(token, id, PRIVATE_GIST_FILE_NAME);
    // 获取本地的代码
    const local = await getList(DB_NAME.local, {
        isPublic: false,
    });
    // 合并
    const moreList = await margeListData(online, local, true);
    return moreList;
};

/**
 * 新增公共代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {Object} item 内容
 */
export const addPublicItem = async (token, id, item) => {
    if(!token || !id) return;
    // 获取所有数据
    const list = await getGistContent(token, id, PUBLIC_GIST_FILE_NAME);
    const tartgetList = [...list, item];
    await updateOwnerGistContent(token, id, PUBLIC_GIST_FILE_NAME, tartgetList);
};

/**
 * 更新公共代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {Object} item 内容
 */
export const updatePublicItem = async (token, id, item) => {
    if(!token || !id) return;
    if (item._id) delete item._id;
    // 获取所有数据
    const list = await getGistContent(token, id, PUBLIC_GIST_FILE_NAME);
    const tartgetList = list.map(temp => {
        if (temp.id === item.id) {
            return item;
        }
        return temp;
    });
    await updateOwnerGistContent(token, id, PUBLIC_GIST_FILE_NAME, tartgetList);
};

/**
 * 删除公共代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 * @param {String} itemId id
 */
export const deletePublicItem = async (token, id, itemId) => {
    if(!token || !id) return;
    // 获取所有数据
    const list = await getGistContent(token, id, PUBLIC_GIST_FILE_NAME);
    const tartgetList = list.filter(temp => temp.id !== itemId);
    await updateOwnerGistContent(token, id, PUBLIC_GIST_FILE_NAME, tartgetList);
};

/**
 * 同步公共代码
 * @param {String} token 用户token
 * @param {String} id 线上仓库id
 */
export const syncPublicCode = async (token, id) => {
    if(!token || !id) return false;
    // 获取线上的代码
    const online = await getGistContent(token, id, PUBLIC_GIST_FILE_NAME);
    // 获取本地的代码
    const local = await getList(DB_NAME.local, {
        isPublic: true,
    });
    // 合并
    const moreList = await margeListData(online, local, true);
    return moreList;
};

/**
 * 添加贡献者
 * @param {Object} item 贡献项
 * @returns
 */
export const addContributeItem = async (item) => {
    if (!item.gistId) return;
    const list = await getContributeList();
    if (list.filter(temp => temp.gistId == item.gistId).length > 0) return;
    const target = [...list, item];
    const result = await updateContributeList(target);
    return result;
};

/**
 * 更新本地数据
 * 1.贡献列表数据
 * 2.代码数据
 */
export const updateLocalDB = async (token) => {
    // 获取贡献列表
    const contributeList = await getContributeList();
    for (let i = 0; i < contributeList.length; i++) {
        const item = contributeList[i];
        // 更新本地配置信息
        await updateLocalConfigDB(item);
        // 更新本地code数据
        await updateLocalCodeDB(token, item, false);
    }
};

/**
 * 更新贡献列表
 * @param {Object} item 贡献者信息
 */
export const updateLocalConfigDB = async (item) => {
    const _temp = await getList(DB_NAME.config, { id: item.id });
    if (_temp.length > 0) {
        await updateItem(DB_NAME.config, _temp[0]._id, item);
    } else {
        await addItem(DB_NAME.config, item);
    }
};

/**
 * 更新本地code数据
 * @param {String} token 用户token
 * @param {Object} item 贡献者内容
 */
export const updateLocalCodeDB = async (token, item, isOwner = false) => {
    const { gistId } = item;
    const contentList = await getGistContent(token, gistId, PUBLIC_GIST_FILE_NAME);
    for (let i = 0; i < contentList.length; i++) {
        const temp = contentList[i];
        const _list = await getList(DB_NAME.local, { id: temp.id });
        if (_list.length == 0) {
            if (temp._id) delete temp._id;
            await addItem(DB_NAME.local, { ...temp, isOwner });
        } else {
            await updateItem(DB_NAME.local, _list[0]._id, temp);
        }
    }
};
