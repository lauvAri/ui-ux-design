import students from "./students.js";
import majors from "./majors.js";
import schools from "./schools.js";

let columns = [
    {
        prop: 'name',
        label: '姓名',
    },
    {
        prop: 'gender',
        label: '性别',
    },
    {
        prop: 'studentId',
        label: '学号',
    },
    {
        prop: 'mobile',
        label: '电话号码',
    },
    {
        prop: 'school',
        label: '学院',
    },
    {
        prop: 'major',
        label: '专业',
    },
]
const EventTable = {
    template: `
    <div>
        <div id="filter-student">
            <el-select v-model=school placeholder="选择学院" filterable @change="updateStudents">
            <el-option
                v-for="item in schools"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model=major placeholder="选择专业" filterable @change="updateStudents">
                <el-option
                    v-for="item in majorsFiltered"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <div id="search-student">
                <el-input v-model="name" placeholder="姓名" required></el-input>
                <el-button icon="el-icon-search" circle @click='searchStudentByName()'></el-button>
            </div>
        </div>
       
        <el-table
            :data="studentsFiltered"
            style="width: 100%">
            <el-table-column
                v-for="column in columns"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                ></el-table-column>
        </el-table>
    </div>
    `,
    data() {
        return {
            name: '',
            gender: '',
            studentId: '',
            mobile: '',
            school: '',
            major: '',

            // 使用原始学生数据作为备份
            originalStudents: students,
            // 过滤后的学生列表，初始值为所有学生
            studentsFiltered: students,

            columns,
            students,
            schools,
            majors,
        }
    },
    methods: {
        searchStudentByName() {
            const queryName = this.name.trim().toLowerCase();
            if (queryName === '') {
                // 如果没有输入，则显示所有学生
                this.studentsFiltered = this.originalStudents;
            } else {
                // 根据输入的名字过滤学生列表
                this.studentsFiltered = this.originalStudents.filter(student =>
                    student.name.toLowerCase().includes(queryName)
                );
            }
        },
        updateStudents() {
            this.studentsFiltered = this.originalStudents.filter(student => {
                const matchesSchool = !this.school || student.school === this.school;
                const matchesMajor = !this.major || student.major === this.major;
                return matchesSchool && matchesMajor;
            });
        },
    },
    watch: {
        school(newVal) {
            // 当学院选择改变时，重置专业选择
            this.major = '';
            this.updateStudents(); // 更新表格数据
        },
        major() {
            this.updateStudents(); // 更新表格数据
        }
    },
    computed: {
        majorsFiltered() {
            return majors.filter(major => major.school === this.school);
        },
        studentsFiltered() {
            return students.filter(student => student.school === this.school && student.major === this.major);
        },
    },

}

export default EventTable;

if (typeof window !== 'undefined') {
    Vue.component('event-table', EventTable);
}
