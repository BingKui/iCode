import { Octokit, App } from 'octokit';
import { PUBLIC_TOKEN, PUBLIC_GIST_ID, PUBLIC_FILE_NAME } from '@constants/gist';
import { get } from '@common/ajax';
import logger from '@/common/logger';
const octokit = new Octokit({ auth: PUBLIC_TOKEN });

/**
 * 获取用户的所有gist
 * @param {String} token 用户token
 */
export const getUserGistList = async (token) => {
    const octokit = new Octokit({ auth: token });
    const getDataByPage = async (page) => {
        let result = [];
        const res = await octokit.rest.gists.list({
            per_page: 100,
        });
        result = [...res.data];
        if (res.data.length == 100) {
            result = result.concat(await getDataByPage(page + 1));
        }
        return result;
    };
    return getDataByPage(1);
};

/**
 * 创建资源库
 * @param {String} token 用户token
 * @param {String} desc 描述信息
 * @param {String} filename 文件名称
 * @returns 生成的 gist 库 id
 */
export const createGistLibrary = async (token, desc, filename, isPublic = false) => {
    const octokit = new Octokit({ auth: token });
    const content = {
        list: [],
    };
    const res = await octokit.rest.gists.create({
        description: desc,
        files: {
            [filename]: {
                content: JSON.stringify(content),
            },
        },
        public: isPublic,
    });
    if (res) return res.data.id;
};

/**
 * 获取用户的公共gist内容，通过id
 * @param {String} token 用户token
 * @param {String} id gist_id
 */
export const getGistContent = async (token, id, filename) => {
    const octokit = new Octokit({ auth: token });
    const info = await octokit.rest.gists.get({ gist_id: id });
    logger.info('当前info项为', info);
    const { files } = info.data;
    logger.info('当前files项为', files);
    logger.info('当前filename项为', filename);
    const item = files[filename];
    logger.info('当前item项为', item);
    if (item.truncated) {
        // 内容被截断，获取全部内容
        const res = await get(item.raw_url);
        return res.list;
    } else {
        return JSON.parse(item.content).list;
    }
};

/**
 * 更新用户gist内容，通过id
 * @param {String} token 用户token
 * @param {String} id gist_id
 * @param {String} filename 文件名称
 * @param {Array} lsit 数据列表
 */
export const updateOwnerGistContent = async (token, id, filename, list) => {
    const octokit = new Octokit({ auth: token });
    const info = await octokit.rest.gists.update({
        gist_id: id,
        files: {
            [filename]: {
                content: JSON.stringify({ list }),
            },
        },
    });
    const { files } = info.data;
    const item = files[filename];
    if (item.truncated) {
        // 内容被截断，获取全部内容
        const res = await get(item.raw_url);
        return res.list;
    } else {
        return JSON.parse(item.content).list;
    }
};

/**
 * 获取用户信息
 * @param {String} token github token
 */
export const getUserInfo = async (token) => {
    const _selfOctokit = new Octokit({ auth: token });
    const res = await _selfOctokit.rest.users.getAuthenticated();
    const info = res.data;
    return {
        id: info.id,
        name: info.name,
        login: info.login,
        type: info.type, // 用户和组织
        avatar: info.avatar_url,
        bio: info.bio,
        company: info.company,
        followers: info.followers,
        following: info.following,
        location: info.location,
        email: info.email,
        link: info.html_url,
        blog: info.blog,
    };
};

/**
 * 获取贡献列表
 */
export const getContributeList = async () => {
    const info = await octokit.rest.gists.get({ gist_id: PUBLIC_GIST_ID });
    const { files } = info.data;
    const item = files[PUBLIC_FILE_NAME];
    if (item.truncated) {
        // 内容被截断，获取全部内容
        const res = await get(item.raw_url);
        return res.list;
    } else {
        return JSON.parse(item.content).list;
    }
};

/**
 * 更新贡献列表数据
 * @param {Array} list 贡献列表
 */
export const updateContributeList = async (list) => {
    const info = await octokit.rest.gists.update({
        gist_id: PUBLIC_GIST_ID,
        files: {
            [PUBLIC_FILE_NAME]: {
                content: JSON.stringify({ list }),
            },
        },
    });
    const { files } = info.data;
    const item = files[PUBLIC_FILE_NAME];
    if (item.truncated) {
        // 内容被截断，获取全部内容
        const res = await get(item.raw_url);
        return res.list;
    } else {
        return JSON.parse(item.content).list;
    }
};
