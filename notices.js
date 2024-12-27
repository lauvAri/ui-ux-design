// notices.js
const notices = [
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
    }
];

// 增加通知
function addNotice(newNotice) {
    notices.push(newNotice);
}

// 删除通知（通过 info 匹配）
function deleteNotice(info) {
    const index = notices.findIndex(notice => notice.info === info);
    if (index !== -1) {
        notices.splice(index, 1);
        return true;
    }
    return false;
}

// 导出模块
export { notices, addNotice, deleteNotice };
