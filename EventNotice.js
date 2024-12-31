// EventNoticeComponent.js
import { notices, addNotice, deleteNotice, saveDraft, getDrafts, deleteDraft } from './notices.js';
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
            <el-table-column
                label="操作"
                width="150"
                v-if="currentView === 'drafts'">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="editDraft(scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="deleteDraft(scope.row.id)">删除</el-button>
                </template>
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
                    <label style="font-size:20px">{{ draftCount }}</label><br>
                    <label @click="showDrafts">已保存的</label>
                </div>
            </el-col>
            <el-col :span="8" style="border-right: 2px solid lightgray;display: flex; align-items: center; justify-content: center;">
                <div class="grid-content bg-purple" style="margin:0">
                    <label style="font-size:20px">{{ publishedCount }}</label><br>
                    <label @click="showPublished">已发布的</label>
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
    
   <el-dialog title="公告编辑" :visible.sync="dialogVisible" width="60%">
    <el-form :model="newNotice" label-width="80px" style="width: 90%">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-form-item label="公告标题">
                    <el-input v-model="newNotice.info" placeholder="请输入公告标题"></el-input>
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
                placeholder="在这里输入正文内容（最多 2000 字）"
                maxlength="2000"
                show-word-limit
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
                id: '', // 用于区分新增和修改
                info: '',
                source: '',
                mainText: '',
                date: ''
            },
            tableData: [], // 当前显示的公告数据
            currentView: 'published',
            currentPage: 1,
            pageSize: 10,
            total: 0,
            sources: sources,
            draftCount: 0, // 草稿数量
            publishedCount: 0 // 已发布公告数量
        };
    },
    created() {
        this.loadNotices();
        this.updateCounts();
    },
    methods: {
        loadNotices() {
            if (this.currentView === 'drafts') {
                this.tableData = getDrafts(); // 加载草稿
            } else {
                this.tableData = [...notices]; // 加载已发布公告
            }
            this.total = this.tableData.length;
        },
        updateCounts() {
            this.draftCount = getDrafts().length;
            this.publishedCount = notices.length;
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

            if (addNotice(newNotice)) {
                this.loadNotices();
                this.currentPage = 1;
                this.confirmDialogVisible = false;
                this.dialogVisible = false;
                this.resetNewNotice();
                this.updateCounts();

                this.$message({
                    message: '公告已成功发布',
                    type: 'success'
                });
            }
        },
        getNoticeUrl(id) {
            return `./notice-detail.html?id=${id}`;
        },
        closeDialog() {
            this.dialogVisible = false;
            this.resetNewNotice();
        },
        saveNewNotice() {
            if (this.validateNewNotice()) {
                const draft = {
                    id: this.newNotice.id || Date.now().toString(), // 如果存在 ID，则使用原 ID
                    ...this.newNotice
                };
                saveDraft(draft);
                this.updateCounts();
                this.$message({
                    message: '公告已保存为草稿',
                    type: 'success'
                });
                this.closeDialog();
                this.loadNotices(); // 重新加载数据
            }
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
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.tableData.slice(start, end);
        },
        resetNewNotice() {
            this.newNotice = {
                id: '',
                info: '',
                source: '',
                mainText: '',
                date: ''
            };
        },
        showDrafts() {
            this.currentView = 'drafts';
            this.loadNotices();
        },
        showPublished() {
            this.currentView = 'published';
            this.loadNotices();
        },
        editDraft(draft) {
            this.newNotice = { ...draft }; // 加载草稿内容
            this.dialogVisible = true;
        },
        deleteDraft(id) {
            if (deleteDraft(id)) {
                this.updateCounts(); // 更新草稿数量
                this.loadNotices(); // 重新加载数据
                this.$message({
                    message: '草稿已删除',
                    type: 'success'
                });
            } else {
                this.$message({
                    message: '删除草稿失败',
                    type: 'error'
                });
            }
        }
    }
};

export default EventNotice;

if (typeof window !== 'undefined') {
    Vue.component('event-notice', EventNotice);
}