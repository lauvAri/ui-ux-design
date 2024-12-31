import attends from './attends.js';

const EventAttend = {
    template: `
<div>
    <!-- 添加考勤记录的表单 -->
    <div class="form-container" style="width: 100%; margin: 20px 0; padding:0;" >
      <el-form @submit.prevent="showConfirmDialog" style="width: 100%" inline>
        <el-row :gutter="24" type="flex" align="left" style="width: 100%;">
          <!-- 姓名 -->
          <el-col :span="4">
            <el-form-item label="姓名">
              <el-input type="text" v-model="newAttendance.name" required></el-input>
            </el-form-item>
          </el-col>
          <!-- 日期 -->
          <el-col :span="4">
            <el-form-item label="日期">
              <el-input type="date" v-model="newAttendance.date" required></el-input>
            </el-form-item>
          </el-col>
          <!-- 状态 -->
          <el-col :span="4">
            <el-form-item label="状态">
             <el-select v-model="newAttendance.status" placeholder="选择考勤状态" filterable style="width: 100%" required>
                <el-option value="" disabled selected>请选择</el-option>
                <el-option value="出勤">出勤</el-option>
                <el-option value="缺勤">缺勤</el-option>
                <el-option value="迟到">迟到</el-option>
                <el-option value="早退">早退</el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <!-- 添加按钮 -->
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="showConfirmDialog">添加</el-button>
            </el-form-item>
          </el-col>
          <!-- 查找按钮 -->
          <el-col :span="2">
            <el-form-item>
              <el-button type="success" @click="searchAttends">查找</el-button>
            </el-form-item>
          </el-col>
          <!-- 取消按钮 -->
          <el-col :span="2">
            <el-form-item>
              <el-button type="info" @click="clearSearch">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
     <!-- 确认新增对话框 -->
        <el-dialog
            title="确认新增"
            :visible.sync="confirmDialogVisible"
            width="30%">
            <span>确定新增这条考勤信息吗？ {{ confirmationMessage }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewAttendanceAndClose">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改考勤状态对话框 -->
        <el-dialog
            title="修改考勤状态"
            :visible.sync="editDialogVisible"
            width="30%">
            <div class="edit-form">
                <div class="info-row">
                    <span class="label">姓名：</span>
                    <span class="value">{{ editingAttendance.name }}</span>
                </div>
                <div class="info-row">
                    <span class="label">日期：</span>
                    <span class="value">{{ formatDate(editingAttendance.date) }}</span>
                </div>
                <div class="status-row">
                    <span class="label">状态：</span>
                    <el-radio-group v-model="editingAttendance.status">
                        <el-radio label="出勤">出勤</el-radio>
                        <el-radio label="缺勤">缺勤</el-radio>
                        <el-radio label="迟到">迟到</el-radio>
                        <el-radio label="早退">早退</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>
        
     <!-- 考勤记录表格 -->
    <div class="table-container">
      <el-table :data="paginatedAttends" style="width: 80%;margin-left: 200px">
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="150"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showEditDialog(scope.$index)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteRecord(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        class="mt-4"
        style="margin-left: 200px"
      />
    </div>
  </div>
  </div>
<style>
.el-form-item {
  margin-bottom: 0;
}

.el-row {
  display: flex;
  align-items: center;
}

.el-col {
  display: flex;
  align-items: center;
}

.table-container {
  margin: 20px auto;
  width: 80%;
  max-width: 800px;
}

.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}

.edit-form {
  padding: 20px;
}

.info-row {
  margin-bottom: 15px;
}

.status-row {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.el-radio {
  margin-right: 15px;
}
</style>
`,

    data() {
        return {
            newAttendance: {
                name: '',
                date: '',
                status: ''
            },
            attends: [], // 原始数据
            filteredAttends: [], // 过滤后的数据
            confirmDialogVisible: false,
            confirmationMessage: '',
            currentPage: 1,
            pageSize: 7,
            editDialogVisible: false,
            editingAttendance: {
                name: '',
                date: '',
                status: '',
                index: -1
            }
        };
    },
    computed: {
        total() {
            return this.filteredAttends.length;
        },
        paginatedAttends() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredAttends.slice(start, end);
        }
    },
    created() {
        this.loadAttends();
    },
    methods: {
        loadAttends() {
            this.attends = [...attends];
            this.filteredAttends = [...attends]; // 初始化过滤数据为全部数据
        },
        validateForm() {
            if (!this.newAttendance.name.trim()) {
                this.$message.error('请填写姓名');
                return false;
            }
            if (!this.newAttendance.date) {
                this.$message.error('请选择日期');
                return false;
            }
            if (!this.newAttendance.status) {
                this.$message.error('请选择考勤状态');
                return false;
            }
            return true;
        },
        showConfirmDialog() {
            if (!this.validateForm()) {
                return;
            }
            this.confirmationMessage = `${this.newAttendance.name} 在 ${this.formatDate(this.newAttendance.date)} ${this.newAttendance.status}`;
            this.confirmDialogVisible = true;
        },
        addNewAttendanceAndClose() {
            // 在数组开头添加新记录
            this.attends.unshift({ ...this.newAttendance });
            this.filteredAttends.unshift({ ...this.newAttendance }); // 同时更新过滤数据
            this.newAttendance = { name: '', date: '', status: '' };
            this.confirmDialogVisible = false;
            this.$message.success('考勤记录添加成功');
            // 确保显示第一页
            this.currentPage = 1;
        },
        showEditDialog(index) {
            // 计算在完整数据中的实际索引
            const realIndex = (this.currentPage - 1) * this.pageSize + index;
            const record = this.filteredAttends[realIndex];
            this.editingAttendance = {
                ...record,
                index: realIndex
            };
            this.editDialogVisible = true;
        },
        confirmEdit() {
            // 更新记录
            this.filteredAttends[this.editingAttendance.index].status = this.editingAttendance.status;
            this.editDialogVisible = false;
            this.$message.success('考勤记录修改成功');
        },
        deleteRecord(index) {
            // 计算在完整数据中的实际索引
            const realIndex = (this.currentPage - 1) * this.pageSize + index;
            this.filteredAttends.splice(realIndex, 1);

            // 如果当前页没有数据了且不是第一页，则跳转到上一页
            if (this.paginatedAttends.length === 0 && this.currentPage > 1) {
                this.currentPage--;
            }

            this.$message.success('考勤记录删除成功');
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(dateString).toLocaleDateString('zh-CN', options);
        },
        searchAttends() {
            // 根据姓名、日期、状态进行模糊查找
            this.filteredAttends = this.attends.filter(record => {
                const nameMatch = !this.newAttendance.name || record.name.includes(this.newAttendance.name);
                const dateMatch = !this.newAttendance.date || record.date === this.newAttendance.date;
                const statusMatch = !this.newAttendance.status || record.status === this.newAttendance.status;
                return nameMatch && dateMatch && statusMatch;
            });
            this.currentPage = 1; // 查找后跳转到第一页
            this.$message.success('查找完成');
        },
        clearSearch() {
            // 清空输入框内容
            this.newAttendance = { name: '', date: '', status: '' };
            // 重置过滤数据为全部数据
            this.filteredAttends = [...this.attends];
            this.currentPage = 1; // 重置到第一页
            this.$message.success('已取消查找');
        }
    }
};

export default EventAttend;

if (typeof window !== 'undefined') {
    Vue.component('event-attend', EventAttend);
}