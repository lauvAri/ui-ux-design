// notices.js
const STORAGE_KEY = 'notice_data';

const getStoredNotices = () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    // 默认数据
    const defaultNotices = [
        {
            id: '1', // 确保每个通知都有唯一的 id
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
        },
        {
            id: '2',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
        },
        {
            id: '3', // 确保每个通知都有唯一的 id
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
        },
        {
            id: '4',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
        },
        {
            id: '5', // 确保每个通知都有唯一的 id
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
        },
        {
            id: '6',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>'
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