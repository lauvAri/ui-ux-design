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
                    v-for="item in majors.filter(major => major.school == school)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <div id="search-student">
                <el-input v-model="name" placeholder="姓名" required></el-input>
                <el-button icon="el-icon-search" circle @click='searchStudentByName()'></el-button>
            </div>
            <!-- 触发新增学生对话框的按钮 -->
            <el-button type="primary" @click="dialogVisible = true">新增学生</el-button>
        </div>
        

        <!-- 新增学生的弹出表单 -->
        <el-dialog title="新增学生" :visible.sync="dialogVisible">
            <el-form :model="newStudent" label-width="80px" :rules="rules" ref="newStudentForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="newStudent.name" @change="onFieldChange('name')"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="newStudent.gender" @change="onFieldChange('gender')">
                        <el-option value="男" label="男"></el-option>
                        <el-option value="女" label="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学号" prop="studentId">
                    <el-input v-model="newStudent.studentId" @change="onFieldChange('studentId')"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="mobile">
                    <el-input v-model="newStudent.mobile" @change="onFieldChange('mobile')"></el-input>
                </el-form-item>
                <el-form-item label="学院" prop="school">
                    <el-select v-model="newStudent.school" placeholder="选择学院" filterable @change="onFieldChange('school')">
                        <el-option
                            v-for="item in schools"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-select v-model="newStudent.major" placeholder="选择专业" filterable @change="onFieldChange('major')">
                        <el-option
                            v-for="item in majors.filter(major => major.school === newStudent.school)"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-progress
                :text-inside="false"
                :stroke-width="26"
                :percentage="progress"
                :status="progressStatus"
                :format="progressFormat"></el-progress>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="addNewStudentAndClose">确 定</el-button>
            </span>
        </el-dialog>
       
        <el-table
            :data="studentsFiltered"
            style="width: 100%"
            height="600"
            >
            <el-table-column
                v-for="column in columns"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm title="确定删除吗？">
                        <el-button
                        size="mini"
                        type="danger"
                        slot="reference"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    `,
    data() {
        return {
            dialogVisible: false,
            newStudent: {
                name: '',
                gender: '',
                studentId: '',
                mobile: '',
                school: '',
                major: ''
            },
            name: '',
            gender: '',
            studentId: '',
            mobile: '',
            school: '',
            major: '',

            originalStudents: students,
            studentsFiltered: students,

            columns,
            students,
            schools,
            majors,
            progress: 0,//进度条的初始值

            rules: {
                name: [
                    {required: true, message:'请输入学生姓名', trigger: 'blur'}
                ],
                gender: [
                    {required: true, message:'请选择学生性别', trigger: 'blur'}
                ],
                studentId: [
                    {required: true, message: '请输入学生学号', trigger: 'blur' },
                    {min: 8, max:8, message:'学号的长度应该为8位', trigger: 'blur'}
                ],
                mobile: [
                    { required: true, message: '请输入学生手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号应该为11位', trigger: 'blur' }
                ],
                school: [
                    { required: true, message: '请选择学生学院', trigger: 'blur' },
                ],
                major: [
                    { required: true, message: '请选择学生专业', trigger: 'blur' },
                ],
            }
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
        addNewStudentAndClose() {
            this.$refs['newStudentForm'].validate((v) => {
                if (v) {
                    this.originalStudents.push({ ...this.newStudent });
                    this.studentsFiltered = [...this.originalStudents]; // 更新过滤后的列表

                    //提醒成功
                    const h = this.$createElement;

                    this.$notify({
                        title: '提交成功',
                        message: h('i', { style: 'color: green' }, '提交成功！')
                    });
                    // 清空表单
                    this.resetNewStudent();
                    this.progress = 0;
                } else {
                    //提醒失败
                    const h = this.$createElement;

                    this.$notify({
                        title: '提交失败',
                        message: h('i', { style: 'color: red' }, '请完整填写表单')
                    });
                }
            })
        },
        closeDialog() {
            this.dialogVisible = false;
            this.resetNewStudent(); // 取消时也重置表单
            this.$refs['newStudentForm'].resetFields();
            this.progress = 0;
        },
        resetNewStudent() {
            this.newStudent = {
                name: '',
                gender: '',
                studentId: '',
                mobile: '',
                school: '',
                major: ''
            };
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        updataProgress() {
            this.progress = this.completedPercentage;
        },
        onFieldChange(fieldName) {
            this.$nextTick(() => {
                this.progress = this.completedPercentage;
            });
        }
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
        studentsFiltered() {
            return originalStudents.filter(student =>
                (!this.school || student.school === this.school) &&
                (!this.major || student.major === this.major))
        },
        completedPercentage() {
            let completed = 0;
            const requiredFields = ['name', 'gender', 'studentId', 'mobile', 'school', 'major'];
            requiredFields.forEach(field => {
                if (this.newStudent[field]) {
                    completed++;
                }
            });
            return Math.round((completed / requiredFields.length) * 100);
        },
        progressStatus() {
            return this.progress === 100 ? 'success' : undefined;
        },
        progressFormat() {
            return this.progress === 100 ? 'success' : `${this.progress}%`;
        }
    },
}

export default EventTable;

if (typeof window !== 'undefined') {
    Vue.component('event-table', EventTable);
}
