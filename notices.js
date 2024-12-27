// notices.js

const STORAGE_KEY = 'notice_data';

// 从 localStorage 获取数据，如果没有则使用默认数据
const getStoredNotices = () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    // 默认数据
    const defaultNotices = [
        {
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            url: 'https://oa.csu.edu.cn/con/'
        },
        {
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            url: 'https://www.swcontest.com.cn/index'
        },
        {
            info: '关于做好2024年工作总结和2025年工作计划的通知',
            source: '学校办公室',
            date: '2024-12-06',
            url: 'https://54sh.csu.edu.cn/'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-09-26',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-09-02',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-08-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-08-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-08-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-24',
            url: 'https://www.kaggle.com/datasets'
        },
        {
            info: '关于公布学校领导分工情况的通知',
            source: '学校办公室',
            date: '2024-06-01',
            url: 'https://www.kaggle.com/datasets'
        }
    ];
    // 存储默认数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotices));
    return defaultNotices;
};

let notices = getStoredNotices();

// 增加通知
function addNotice(newNotice) {
    notices.unshift(newNotice); // 添加到数组开头
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    return true;
}

// 删除通知
function deleteNotice(info) {
    const index = notices.findIndex(notice => notice.info === info);
    if (index !== -1) {
        notices.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
        return true;
    }
    return false;
}

// 导出模块
export { notices, addNotice, deleteNotice };