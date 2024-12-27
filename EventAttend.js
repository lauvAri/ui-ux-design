import attends from './attends.js';

const EventAttend = {
    template: `
<div>
    <!-- 添加考勤记录的表单 -->
    <div class="form-container" style="width: 100%; margin: 20px 0; padding:0;" >
      <el-form @submit.prevent="addAttendance" style="width: 100%" inline>
        <el-row :gutter="24" type="flex" align="left" style="width: 100%;">
          <!-- 姓名 -->
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input type="text" v-model="newAttendance.name" required></el-input>
            </el-form-item>
          </el-col>
          <!-- 日期 -->
          <el-col :span="6">
            <el-form-item label="日期">
              <el-input type="date" v-model="newAttendance.date" required></el-input>
            </el-form-item>
          </el-col>
          <!-- 状态 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="newAttendance.status" placeholder="选择考勤状态" filterable style="width: 100%" required>
                <el-option value="出勤">出勤</el-option>
                <el-option value="缺勤">缺勤</el-option>
                <el-option value="迟到">迟到</el-option>
                <el-option value="早退">早退</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 添加按钮 -->
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" native-type="submit">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 考勤记录表格 -->
    <div class="table-container">
      <el-table :data="attends" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="150"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteRecord(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
<style>
.el-form-item {
  margin-bottom: 0; /* 移除表单项的底部边距 */
}

.el-row {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
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
</style>
`,

    data() {
        return {
            newAttendance: {
                name: '',
                date: '',
                status: ''
            },
            attends: [] // 初始化 attends 为空数组
        };
    },
    created() {
        this.loadAttends(); // 组件创建时加载数据
    },
    methods: {
        loadAttends() {
            // 将 attends.js 中的数据加载到组件的 attends 数组中
            this.attends = [...attends];
        },
        addAttendance() {
            // 表单验证
            if (!this.newAttendance.name || !this.newAttendance.date || !this.newAttendance.status) {
                this.$message.error('请填写完整的考勤信息');
                return;
            }

            // 添加新记录
            this.attends.push({ ...this.newAttendance });

            // 重置表单
            this.newAttendance = { name: '', date: '', status: '' };

            // 提示添加成功
            this.$message.success('考勤记录添加成功');
        },
        deleteRecord(index) {
            // 删除指定索引的记录
            this.attends.splice(index, 1);
            this.$message.success('考勤记录删除成功');
        }
    }
};

export default EventAttend;

if (typeof window !== 'undefined') {
    Vue.component('event-attend', EventAttend);
}