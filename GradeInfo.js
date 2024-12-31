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
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <el-button @click="showDialog = true" style="margin-right: 10px;">修改科目</el-button>
              
              <el-input
                  placeholder="输入姓名或关键字进行搜索"
                  v-model="searchKeyword"
                  size="mini"
                  style="width: 200px; margin-right: 10px;"
                  @keyup.enter="filterStudents">
              </el-input>
              <el-button
                  type="primary"
                  size="mini"
                  @click="filterStudents">
                  查询
              </el-button>
              <el-button
                  type="default"
                  size="mini"
                  @click="resetFilter">
                  重置
              </el-button>
          </div>
          
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
                          <el-select v-model="scope.row.selectedSubject" placeholder="选择科目" size="mini" style="width: 120px; margin-right: 10px;">
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
                              style="width: 120px; margin-right: 10px;"
                              @keyup.enter="updateScore(scope.row)">
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
            selectedSubjects: ['语文', '数学', '英语'], // 初始化 selectedSubjects 为语文、数学和英语
            searchKeyword: '' // 用于存储搜索关键字
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
            if (row.inputValue < 0 || row.inputValue > 100|| isNaN(row.inputValue)) {
                // 使用Element UI的$message方法提示用户
                this.$message.error('成绩必须在0到100之间的整数，请重新输入。');
            } else if (row.inputValue === '') {
                // 使用Element UI的$message方法提示用户
                this.$message.error('成绩不能为空，请重新输入。');
            } else {
                // 根据选择的科目更新对应的成绩
                const subjectKey = `grades.${row.selectedSubject.toLowerCase()}`;
                if (!row.grades) {
                    this.$set(row, 'grades', {});
                }
                this.$set(row.grades, row.selectedSubject.toLowerCase(), row.inputValue);
                this.$message.success('成功修改成绩！');
                
                // 更新 filteredStudents 中的对应学生的成绩
                const student = this.filteredStudents.find(s => s.name === row.name);
                if (student) {
                    this.$set(student.grades, row.selectedSubject.toLowerCase(), row.inputValue);
                }
            }
            // 清空输入框
            row.inputValue = '';
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
                // 更新每个学生的 selectedSubject 属性为第一个显示“未录入”的课程
                const firstUnrecordedSubject = this.selectedSubjects.find(subject => student.grades[subject.toLowerCase()] === "未录入");
                student.selectedSubject = firstUnrecordedSubject || this.selectedSubjects[0];
            });
            
            // 过滤 students 数据，只保留包含所有 selectedSubjects 成绩的学生
            this.filteredStudents = this.students.filter(student => {
                return this.selectedSubjects.every(subject => {
                    return student.grades && student.grades[subject.toLowerCase()] !== "未选择";
                });
            });

            // 按照名字的字典顺序对 filteredStudents 进行排序
            this.filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
            
            // 关闭对话框
            this.showDialog = false;
        },
        filteredSubjects(student) {
            // 确保下拉框中的科目按照固定的顺序显示
            const subjectOrder = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];
            return subjectOrder.filter(subject => this.selectedSubjects.includes(subject) && student.grades[subject.toLowerCase()] !== "未选择");
        },
        filterStudents() {
            const keyword = this.searchKeyword.toLowerCase();
            // 先过滤出包含所有勾选科目的学生
            const studentsWithSelectedSubjects = this.students.filter(student => {
                return this.selectedSubjects.every(subject => {
                    return student.grades && student.grades[subject.toLowerCase()] !== "未选择";
                });
            });
            // 再根据关键字进行搜索
            if (keyword) {
                this.filteredStudents = studentsWithSelectedSubjects.filter(student => {
                    return student.name.toLowerCase().includes(keyword);
                });
            } else {
                // 如果没有输入关键字，返回最开始根据勾选产生的按照字典顺序排序的表格
                this.filteredStudents = studentsWithSelectedSubjects;
            }
            // 按照名字的字典顺序对 filteredStudents 进行排序
            this.filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
            // 清空搜索关键字
            this.searchKeyword = '';
        },
        resetFilter() {
            // 过滤出包含所有勾选科目的学生
            this.filteredStudents = this.students.filter(student => {
                return this.selectedSubjects.every(subject => {
                    return student.grades && student.grades[subject.toLowerCase()] !== "未选择";
                });
            });
            // 按照名字的字典顺序对 filteredStudents 进行排序
            this.filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
            // 清空搜索关键字
            this.searchKeyword = '';
        }
    }
}

export default GradeInfo;

if (typeof window !== 'undefined') {
    Vue.component('grade-info', GradeInfo);
}