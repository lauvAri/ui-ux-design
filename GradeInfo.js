import students from './students.js';
import subjects from './subjects.js';

// 为每个学生添加一个默认的 selectedSubject 属性，默认值为 '语文'
students.forEach(student => {
    student.selectedSubject = '语文';
    student.inputValue = ''; // 添加 inputValue 属性用于输入成绩
});

const GradeInfo = {
    template: `
      <div>
          <el-button @click="showDialog = true">修改科目</el-button>
          
          <el-dialog title="选择科目" :visible.sync="showDialog">
              <el-checkbox-group v-model="selectedSubjects">
                    <el-checkbox v-for="subject in subjects" :label="subject.name" :key="subject.name">{{ subject.name }}</el-checkbox>
              </el-checkbox-group>
              <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="updateColumns">确定</el-button>
                    <el-button @click="showDialog = false">取消</el-button>
              </span>
          </el-dialog>
          
          <el-table :data="filteredStudents" border style="width: 100%">
              <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <div style="display: flex; align-items: center;">
                          <el-select v-model="scope.row.selectedSubject" placeholder="选择科目" size="mini" style="margin-right: 10px;">
                              <el-option
                                  v-for="subject in filteredSubjects(scope.row)"
                                  :key="subject"
                                  :label="subject"
                                  :value="subject">
                              </el-option>
                          </el-select>
                          <el-input
                              placeholder="请输入成绩"
                              v-model="scope.row.inputValue"
                              size="mini"
                              style="margin-right: 10px;">
                          </el-input>
                          <el-button
                              type="primary"
                              size="mini"
                              @click="updateScore(scope.row)">
                              修改成绩
                          </el-button>
                      </div>
                  </template>
              </el-table-column>
          </el-table>
      </div>
    `,
    data() {
        return {
            students,
            filteredStudents: [], // 用于存储过滤后的学生数据
            subjects,
            columns: [
                { prop: 'name', label: '姓名', width: '180' },
                { prop: 'grades.chinese', label: '语文', width: '150' },
                { prop: 'grades.math', label: '数学', width: '150' },
                { prop: 'grades.english', label: '英语', width: '150' }
            ],
            showDialog: false,
            selectedSubjects: ['语文', '数学', '英语'] // 初始化 selectedSubjects 为语文、数学和英语
        }
    },
    watch: {
        showDialog(val) {
            if (val) {
                // 当对话框打开时，根据当前表格中的列更新 selectedSubjects
                this.selectedSubjects = this.columns
                    .filter(column => column.prop !== 'name')
                    .map(column => column.label);
            }
        }
    },
    mounted() {
        this.updateColumns();
    },
    methods: {
        updateScore(row) {
            // 检查成绩是否在0到100之间
            if (row.inputValue < 0 || row.inputValue > 100) {
                // 使用Element UI的$message方法提示用户
                this.$message.error('成绩必须在0到100之间，请重新输入。');
            } else {
                // 根据选择的科目更新对应的成绩
                const subjectKey = `grades.${row.selectedSubject.toLowerCase()}`;
                if(row.grades && row.grades[row.selectedSubject.toLowerCase()] === "未录入") {
                    return;
                }
                if (!row.grades) {
                    this.$set(row, 'grades', {});
                }
                this.$set(row.grades, row.selectedSubject.toLowerCase(), row.inputValue);
                this.$message.success('成功修改成绩！');
            }
            // 清空输入框
            row.inputValue = '';
            // 调用 updateColumns 方法以更新表中数据
            this.updateColumns();
        },
        updateColumns() {
            // 固定的科目顺序数组
            const subjectOrder = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];
            
            // 创建一个新的 columns 数组，保留姓名列
            const newColumns = [{ prop: 'name', label: '姓名', width: '180' }];
            
            // 根据固定的科目顺序数组和用户选择的科目更新 columns 数组
            subjectOrder.forEach(subject => {
                if (this.selectedSubjects.includes(subject)) {
                    const subjectProp = `grades.${subject.toLowerCase()}`;
                    newColumns.push({ prop: subjectProp, label: subject, width: '150' });
                }
            });
            
            // 更新 columns 数组
            this.columns = newColumns;
            
            // 确保每个学生对象都包含所有选定科目的成绩
            this.students.forEach(student => {
                this.selectedSubjects.forEach(subject => {
                    const subjectKey = subject.toLowerCase();
                    if (!student.grades) {
                        this.$set(student, 'grades', {});
                        this.$set(student.grades, subjectKey, "未选择");
                    }
                    if (student.grades[subjectKey] === undefined) {
                        this.$set(student.grades, subjectKey, "未选择");
                    }
                    if (student.grades[subjectKey] === null) {
                        this.$set(student.grades, subjectKey, "未录入");
                    }
                });
            });
            
            // 过滤 students 数据，只保留包含所有 selectedSubjects 成绩的学生
            this.filteredStudents = this.students.filter(student => {
                return this.selectedSubjects.every(subject => {
                    return student.grades && student.grades[subject.toLowerCase()] !== "未选择";
                });
            });
            
            // 关闭对话框
            this.showDialog = false;
        },
        filteredSubjects(student) {
            return this.selectedSubjects.filter(subject => student.grades[subject.toLowerCase()] !== "未选择");
        }
    }
}

export default GradeInfo;

if (typeof window !== 'undefined') {
    Vue.component('grade-info', GradeInfo);
}