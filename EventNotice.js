// EventNoticeComponent.js
import { notices, addNotice, deleteNotice } from './notices.js';
import sources from "./sources.js";

const EventNotice = {
    template: `
<el-container>
     <el-main>
        <el-table
            :data="paginatedData()"
            style="width: 100%">
            <el-table-column
                prop="info"
                label="文件标题"
                width="550">
                <template slot-scope="scope">
                    <el-link class="table-info" :href="getNoticeUrl(scope.row.id)" target="_blank" rel="noopener noreferrer">
                       {{ scope.row.info }}
                     </el-link>
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
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            class="mt-4"
        />
    </el-main>
    <el-main style="border: 2px solid lightgray; background-color: white; height:200px;padding: 0;">
        <el-row style="border-bottom: 2px solid lightgray;height: 100px; display: flex; align-items: center; justify-content: center;">
            <i class="el-icon-user-solid"></i>
        <el-button type="primary" @click="dialogVisible = true"> + 发布公告</el-button>
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
    
    
   <el-dialog title="公告编辑" :visible.sync="dialogVisible">
    <el-form :model="newNotice" label-width="80px">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-form-item label="公告标题">
                    <el-input v-model="newNotice.info"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="发布方">
                    <el-select v-model="newNotice.source" placeholder="选择发布方" filterable style="width: 100%">
                        <el-option
                            v-for="item in sources"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="正文">
            <el-input
                v-model="newNotice.mainText"
                type="textarea"
                :rows="10"
                style="width: 100%"
                placeholder="在这里输入正文内容"
            />
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveNewNotice">保 存</el-button>
        <el-button type="primary" @click="confirmPublish">确 定</el-button>
    </span>
</el-dialog>
<el-dialog
    title="确认发布"
    :visible.sync="confirmDialogVisible"
    width="30%">
    <span>确定发布这条公告吗？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewNoticeAndClose">确 定</el-button>
    </span>
</el-dialog>
</el-container>
`,

    data() {
        return {
            dialogVisible: false,
            confirmDialogVisible: false,
            newNotice: {
                info: '',
                source: '',
                mainText: '',
                date: ''
            },
            // 动态加载 notices 数据
            tableData: [],
            currentView: null,
            currentPage: 1,
            pageSize: 10,
            total: notices.length,
            sources: sources
        };
    },
    created() {
        // 组件创建时从 notices 加载数据
        this.loadNotices();
    },
    methods: {
        loadNotices() {
            this.tableData = [...notices];
            this.total = this.tableData.length;
        },

        addNewNoticeAndClose() {
            const currentDate = new Date().toISOString().split('T')[0];
            const newNotice = {
                id: Date.now().toString(), // 生成唯一 ID
                info: this.newNotice.info,
                source: this.newNotice.source,
                date: currentDate,
                mainText: this.newNotice.mainText
            };

            // 添加到 notices.js 和本地存储
            if (addNotice(newNotice)) {
                // 重新加载数据以确保与存储同步
                this.loadNotices();
                this.currentPage = 1;  // 重置到第一页

                this.confirmDialogVisible = false;
                this.dialogVisible = false;
                this.resetNewNotice();

                this.$message({
                    message: '公告已成功发布',
                    type: 'success'
                });
            }
        },
        getNoticeUrl(id) {
            return `./notice-detail.html?id=${id}`; // 生成公告详情页链接
        },
        handleClick(row) {
            if (row.url) {
                window.location.href = row.url;
            }
        },
        closeDialog() {
            this.dialogVisible = false;
            this.resetNewNotice();
        },

        saveNewNotice() {
            // 这里可以添加保存草稿的逻辑


            this.$message({
                message: '公告已保存为草稿',
                type: 'success'
            });
        },
        validateNewNotice() {
            if (!this.newNotice.info || !this.newNotice.source || !this.newNotice.mainText) {
                this.$message({
                    message: '请填写完整的公告信息',
                    type: 'warning'
                });
                return false;
            }
            return true;
        },
        confirmPublish() {
            if (this.validateNewNotice()) {
                this.confirmDialogVisible = true;
            }
        },
        toggleView(view) {
            this.currentView = this.currentView === view ? null : view;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },

        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            // No need to sort here as the data is already sorted
            return this.tableData.slice(start, end);
        },
        resetNewNotice() {
            this.newNotice = {
                info: '',
                source: '',
                mainText: '',
                date: ''
            };
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
