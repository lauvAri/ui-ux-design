// EventFormComponent.js
import majors from './majors.js';
import schools from './schools.js';
import { addStudent } from './db.js';

// 定义 EventForm 组件
const EventForm = {
  template: `
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="学生姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="学生性别">
      <el-select v-model="form.gender" placeholder="选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入学时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="学号">
      <el-input  v-model="form.studentId"></el-input>
    </el-form-item>

    <el-form-item label="电话号码">
      <el-input  v-model="form.mobile"></el-input>
    </el-form-item>

    <el-form-item label="学院">
      <el-select v-model="form.school" placeholder="选择学院" filterable>
        <el-option v-for="item in schools" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="专业">
      <el-select v-model="form.major" placeholder="选择专业" filterable>
        <el-option v-for="item in majorsFiltered" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  `,
  data() {
    return {
      form: {
        name: '',
        gender: '',
        date1: '',
        date2: '',
        studentId: '',
        mobile: '',
        school: '',
        major: '',
      },
      majors,
      schools,
    };
  },
  computed: {
    majorsFiltered() {
      return this.majors.filter(major => major.school === this.form.school);
    }
  },
  methods: {
    async onSubmit() {
      console.log('submit!');
      // 提交逻辑
      const newStudent = { ...this.form };
      newStudent.grades = {};
      let studentArray = [];
      studentArray.push(newStudent);

      let dbRequest = indexedDB.open('mydb', 1);
      dbRequest.onsuccess = async (event) => {
        let db = event.target.result;
        try {
          await addStudent(db, studentArray);
          this.$message.success('提交成功！');
        } catch (error) {
          console.error(error);
          this.$message.error('提交失败！');
        }
      };
    },
    resetForm() {
      Object.assign(this.$data.form, this.$options.data().form); // 重置表单
    }
  },
};

// 导出组件，以便可以在其他地方使用
export default EventForm;

// 如果你是在非模块环境中使用，请确保全局注册这个组件
if (typeof window !== 'undefined') {
  Vue.component('event-form', EventForm);
}