// EventNoticeComponent.js
import { notices, addNotice, deleteNotice } from './notices.js';

const EventNotice = {
    template: `
<el-container>
    <el-main>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="info"
                label="文件标题"
                width="550">
                <template slot-scope="scope">
                    <a class="table-info" :href="scope.row.url" target="_blank" rel="noopener noreferrer">{{ scope.row.info }}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="source"
                label="发布方"
                width="200">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="100">
            </el-table-column>
        </el-table>
    </el-main>
    <el-main style="border: 2px solid lightgray; background-color: white; height:200px;padding: 0;">
        <el-row style="border-bottom: 2px solid lightgray;height: 100px; display: flex; align-items: center; justify-content: center;">
            <i class="el-icon-user-solid"></i>
            <el-button type="primary" @click="currentMenu = '3-2'"> + 发布公告</el-button>
            <event-release v-if="currentView === 'event-release'"></event-release>
            <script type="module" src="./EventRelease.js"></script>
        </el-row>
        <el-row :gutter="0" style="height: 95px; display: flex; text-align: center;">
            <el-col :span="8" style="border-right: 2px solid lightgray;display: flex; align-items: center; justify-content: center;">
                <div class="grid-content bg-purple" style="margin:0">
                    <label style="font-size:20px">0</label><br>
                    <label>我收藏的</label>
                </div>
            </el-col>
            <el-col :span="8" style="border-right: 2px solid lightgray;display: flex; align-items: center; justify-content: center;">
                <div class="grid-content bg-purple" style="margin:0">
                    <label style="font-size:20px">3</label><br>
                    <label>我发起的</label>
                </div>
            </el-col>
            <el-col :span="8" style="display: flex; align-items: center; justify-content: center;">
                <div class="grid-content bg-purple" style="margin:0">
                    <label style="font-size:20px">0</label><br>
                    <label>公告审核</label>
                </div>
            </el-col>
        </el-row>
    </el-main>
</el-container>
`,

    data() {
        return {
            // 动态加载 notices 数据
            tableData: [...notices],
            currentView: null
        };
    },
    methods: {
        handleClick(row) {
            if (row.url) {
                window.location.href = row.url;
            }
        },
        toggleView(view) {
            this.currentView = this.currentView === view ? null : view;
        },
        addNewNotice() {
            // 示例：添加新的公告
            const newNotice = {
                info: '关于新年庆典活动的通知',
                source: '学生会',
                date: '2025-01-01',
                url: 'https://newyear.csu.edu.cn/'
            };
            addNotice(newNotice);
            this.tableData.push(newNotice);
        },
        deleteExistingNotice(info) {
            // 示例：删除公告
            const isDeleted = deleteNotice(info);
            if (isDeleted) {
                this.tableData = this.tableData.filter(notice => notice.info !== info);
            } else {
                alert('未找到要删除的公告');
            }
        }
    }
};

export default EventNotice;

if (typeof window !== 'undefined') {
    Vue.component('event-notice', EventNotice);
}
el