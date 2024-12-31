const accountInfo = {
    template:`
    <div style="width:75%;position:relative;left:12.5%">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="left" 
    style="width: 100%; border:2px solid #409EFF;border-radius: 30px;">
    <div class="btn" style="display: flex; justify-content: center; align-items: center; font-size:20px">
        <span>账号信息</span>
    </div>
    <div style="position:relative; left:8%; top:20px; width:90%">
        <el-row>
            <el-col :span="12">
            <div class="username" style="position: relative;">
                <i class="el-icon-monitor" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">账号:</span>&nbsp&nbsp&nbsp&nbsp
                <span id="usernameSpan">username</span>
            </div>
            </el-col>
            <el-col :span="12">
            <div class="admin" style="position: relative;">
                <i class="el-icon-user" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">用户名:</span>
                <el-input v-model="ruleForm.adminInput" :disabled="isAdminIptDisable" style="width: 40%;" id="adminIpt"></el-input>
                <el-button type="primary" @click="updateAdmin"><span id="updateAdminSpan">修改</span></el-button>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="12">
            <div class="pass" style="position: relative;">
                <i class="el-icon-lock" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">密码:</span>&nbsp&nbsp&nbsp&nbsp
                <el-input v-model="ruleForm.passInput" :disabled="isPassIptDisable" type="password" style="width: 40%;" 
                id="passIpt" autocomplete="off"></el-input>
                <el-button type="primary" @click="updatePass" id="passBtn"><span id="updatePassSpan">修改</span></el-button>
            </div>
            </el-col>
            <el-col :span="12">
            <div class="checkPass" style="position: relative;" id="checkPass" v-show="isCheckpassVisible">
                <span style="font-size: 20px;">确认密码:</span>&nbsp
                <el-input v-model="ruleForm.checkpassInput" type="password" style="width: 40%;" id="checkpassIpt" autocomplete="off"></el-input>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="12">
            <div class="tel" style="position: relative;">
                <i class="el-icon-phone-outline" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">电话:</span>&nbsp&nbsp&nbsp&nbsp
                <el-input v-model="ruleForm.telInput" :disabled="isTelIptDisable" type="tel" style="width: 40%;" 
                id="telIpt" autocomplete="off"></el-input>
            </div>
            </el-col>
        </el-row>
    </div>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="btn" style="display: flex; justify-content: center; align-items: center;">
                <el-button type="primary" @click="updatePass" id="passBtn"><span id="updatePassSpan">修改</span></el-button>
            </div>
            </el-col>
        </el-row>
        <br/>
    </el-form>
    </div>
    `,
    data(){
        return{
            isAdminIptDisable: true,
            isPassIptDisable: true,
            isTelIptDisable: true,
            isCheckpassVisible: false,
            ruleForm:{
                adminInput: 'aa',
                passInput: 'pass1',
                checkpassInput: '',
            },
        };
    },
    mount(){
        
    },
    methods: {
        //更新用户名
        updateAdmin(){
            if(this.isAdminIptDisable){
                this.isAdminIptDisable = false;
                document.getElementById("updateAdminSpan").innerText = "完成";
            }else if(!this.isAdminIptDisable){
                this.isAdminIptDisable = true;
                document.getElementById("updateAdminSpan").innerText = "修改";
            }      
        },
        updatePass(){
            if(this.isPassIptDisable){
                this.isPassIptDisable = false;
                document.getElementById("passBtn").style.visibility = "hidden";
                this.isCheckpassVisible = true;
            }
        },
        finishUpdatePass(){
            if(!this.isPassIptDisable){
                this.isPassIptDisable = true;
                document.getElementById("passBtn").style.visibility = "visible";
                this.isCheckpassVisible = false;
            }
        }
    }
}
// 导出组件，以便可以在其他地方使用
export default accountInfo;

if (typeof window !== 'undefined') {
    Vue.component('account-info', accountInfo);
}
