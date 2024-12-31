const STORAGE_KEY = 'notice_data';
const DRAFT_STORAGE_KEY = 'notice_drafts';

// 获取存储的公告数据
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
            mainText: '<p>这是主要内容。</p>',
            status: 'published' // 默认状态为已发布
        },
        {
            id: '2',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>',
            status: 'published'
        },
        {
            id: '3',
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>',
            status: 'published'
        },
        {
            id: '4',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>',
            status: 'published'
        },
        {
            id: '5',
            info: '关于开展学校“十四五”发展规划等实施情况年度检查与评估工作',
            source: '发展规划与学科建设处',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>',
            status: 'published'
        },
        {
            id: '6',
            info: '2023-2024学年第二学期评教评学情况通报',
            source: '本科生院',
            date: '2024-12-24',
            mainText: '<p>这是主要内容。</p>',
            status: 'published'
        }
    ];
    // 存储默认数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotices));
    return defaultNotices;
};

// 获取存储的草稿数据
const getStoredDrafts = () => {
    const storedData = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    return []; // 默认没有草稿
};

let notices = getStoredNotices();
let drafts = getStoredDrafts();

// 增加公告
function addNotice(newNotice) {
    newNotice.status = 'published'; // 设置为已发布状态
    notices.unshift(newNotice); // 添加到数组开头
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    return true;
}

// 保存草稿
function saveDraft(newDraft) {
    newDraft.status = 'draft'; // 设置为草稿状态
    drafts.unshift(newDraft); // 添加到草稿数组开头
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts));
    return true;
}

// 获取所有草稿
function getDrafts() {
    return drafts;
}

// 删除公告
function deleteNotice(info) {
    const index = notices.findIndex(notice => notice.info === info);
    if (index !== -1) {
        notices.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
        return true;
    }
    return false;
}

// 删除草稿
function deleteDraft(id) {
    const index = drafts.findIndex(draft => draft.id === id);
    if (index !== -1) {
        drafts.splice(index, 1); // 从草稿数组中删除
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts)); // 更新 localStorage
        return true;
    }
    return false;
}

// 导出模块
export { notices, addNotice, deleteNotice, saveDraft, getDrafts, deleteDraft };