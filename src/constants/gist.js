// 公共资源地址访问 token
export const PUBLIC_TOKEN = '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'; // iCodePublicToken
// 公共资源地址库 id
export const PUBLIC_GIST_ID = '35732409b5745b967c7556066ed1f975';
// 资源文件名称
export const PUBLIC_FILE_NAME = 'contribute.json';
// 公共资源描述信息
export const PUBLIC_GIST_DESC = 'iCode_Public_Resource';
// 公共资源名称
export const PUBLIC_GIST_FILE_NAME = 'iCodePublicGistResource.json';
// 私有资源描述信息
export const PRIVATE_GIST_DESC = 'iCode_Private_Resource';
// 私有资源名称
export const PRIVATE_GIST_FILE_NAME = 'iCodePrivateGistResource.json';

// 支持的资源类型
export const RESOURCE_TYPE = {
    css: 'css',
    sass: 'sass',
    less: 'less',
    js: 'js',
    ts: 'ts',
    html: 'html',
    xml: 'xml',
    bash: 'bash',
    python: 'python',
    java: 'java',
    c: 'c',
    objectivec: 'objectivec',
    cpp: 'cpp',
    csharp: 'csharp',
    php: 'php',
    dart: 'dart',
    rust: 'rust',
    ruby: 'ruby',
    lua: 'lua',
    go: 'go',
    algorithm: 'algorithm',
    other: 'other',
};

// 支持的资源类型信息
export const RESOURCE_TYPE_LIST = [
    { type: RESOURCE_TYPE.css, value: 'CSS', color: 'blue' },
    { type: RESOURCE_TYPE.sass, value: 'Sass', color: 'blue' },
    { type: RESOURCE_TYPE.less, value: 'Less', color: 'blue' },

    { type: RESOURCE_TYPE.js, value: 'JavaScript', color: 'green' },
    { type: RESOURCE_TYPE.ts, value: 'TypeScript', color: 'green' },

    { type: RESOURCE_TYPE.html, value: 'HTML', color: 'volcano' },
    { type: RESOURCE_TYPE.xml, value: 'XML', color: 'volcano' },

    { type: RESOURCE_TYPE.bash, value: 'Shell', color: 'red' },

    { type: RESOURCE_TYPE.python, value: 'Python', color: 'orange' },
    { type: RESOURCE_TYPE.java, value: 'Java', color: 'geekblue' },

    { type: RESOURCE_TYPE.c, value: 'C', color: 'magenta' },
    { type: RESOURCE_TYPE.objectivec, value: 'Objective-C', color: 'magenta' },
    { type: RESOURCE_TYPE.cpp, value: 'C++', color: 'magenta' },
    { type: RESOURCE_TYPE.csharp, value: 'C#', color: 'magenta' },

    { type: RESOURCE_TYPE.php, value: 'PHP', color: 'cyan' },
    { type: RESOURCE_TYPE.dart, value: 'Dart', color: 'cyan' },
    { type: RESOURCE_TYPE.ruby, value: 'Ruby', color: 'cyan' },
    { type: RESOURCE_TYPE.rust, value: 'Rust', color: 'cyan' },
    { type: RESOURCE_TYPE.lua, value: 'Lua', color: 'cyan' },
    { type: RESOURCE_TYPE.go, value: 'Go', color: 'cyan' },

    { type: RESOURCE_TYPE.algorithm, value: '算法', color: 'purple' },
    { type: RESOURCE_TYPE.other, value: '其他', color: 'default' },
];

