import students from './students.js';
import subjects from './subjects.js';
let columns = [
    {
        prop: 'grades.chinese', label: '语文', width: '180'
    },
    {
        prop: 'grades.math', label: '数学', width: '180'
    },
    {
        prop: 'grades.english', label: '英语', width: '180'
    },
]
const GradeInfo = {
    template: `
      <div>
          <el-button @click="addSubject()">添加科目</el-button>
      </div>
      <el-table
        :data="students"
        border
        style="width: 100%">
        <el-table-column
              v-for="column in columns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width">
        </el-table-column>
      </el-table>
    `,
    data(){
        return {
            // tableData: [{
            //     date: '2016-2017-1',
            //     course: '软件交互设计',
            //     credit: '3',
            //     score: '60'
            //   }, {
            //     date: '2016-2017-1',
            //     course: '中国近代史纲要',
            //     credit: '3',
            //     score: '60'
            //   }, {
            //     date: '2016-2017-1',
            //     course: '离散数学',
            //     credit: '3',
            //     score: '60'
            //   }, {
            //     date: '2016-2017-1',
            //     course: '算法分析与设计',
            //     credit: '3',
            //     score: '60'
            //   }],
              students: students,
              columns: columns,
              subjects: subjects
        }
    },
    methods: {
        updateScore(row) {
            // 检查成绩是否在0到100之间
            if (row.inputValue < 0 || row.inputValue > 100) {
              // 使用Element UI的$message方法提示用户
              this.$message.error('成绩必须在0到100之间，请重新输入。');
            } else {
              // 更新成绩为输入框中的值
              row.score = row.inputValue;
              this.$message.success('成功修改成绩！');
            }
            // 清空输入框
            row.inputValue = '';
        },
        addSubject() {
          console.log(columns);
          console.log(subjects);
          subjects.push({
              name: '物理',
          });
          columns.push({
              prop: 'grades.physics', label: '物理', width: '180'
          });
      }
    }
      
}
export default GradeInfo;

if (typeof window !== 'undefined') {
    Vue.component('grade-info', GradeInfo);
}