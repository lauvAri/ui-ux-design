const accountInfo = {
    template:`
    <div style="width:75%;position:relative;left:12.5%">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="left" 
    style="width: 100%; border:2px solid #409EFF;border-radius: 30px;">
    <br/>
    <div class="btn" style="display: flex; justify-content: center; align-items: center; font-size:20px">
        <span>账号信息</span>
    </div>
    <div style="position:relative; left:30%; top:20px; width:80%">
        <el-row>
            <el-col :span="24">
            <div class="username" style="position: relative;">
                <i class="el-icon-monitor" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">账号:</span>&nbsp&nbsp&nbsp&nbsp
                <span id="usernameSpan">username</span>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="admin" style="position: relative;">
                <i class="el-icon-user" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">用户名:</span>
                <el-form-item prop="adminInput">
                <el-input v-model="ruleForm.adminInput" :disabled="isAdminIptDisable" style="width: 50%;" id="adminIpt"></el-input>
                </el-form-item>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="tel" style="position: relative;">
                <i class="el-icon-phone-outline" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">电话:</span>&nbsp&nbsp&nbsp&nbsp
                <el-form-item prop="telInput">
                <el-input v-model="ruleForm.telInput" :disabled="isTelIptDisable" type="tel" style="width: 50%;" 
                id="telIpt" autocomplete="off" ref="telInput"></el-input>
                </el-form-item>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="pass" style="position: relative;">
                <i class="el-icon-lock" style="font-size: 20px;"></i>
                <span style="font-size: 20px;">密码:</span>&nbsp&nbsp&nbsp&nbsp
                <el-form-item prop="passInput">
                <el-input v-model="ruleForm.passInput" :disabled="isPassIptDisable" type="password" style="width: 50%;" 
                id="passIpt" autocomplete="off" ref="passInput"></el-input>
                </el-form-item>
            </div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="checkPass" style="position: relative;" id="checkPass" v-show="isCheckpassVisible">
                <span style="font-size: 20px;">确认密码:</span>&nbsp
                <el-form-item prop="checkpassInput">
                <el-input v-model="ruleForm.checkpassInput" type="password" style="width: 50%;" id="checkpassIpt" 
                autocomplete="off" ref="checkpassInput"></el-input>
                </el-form-item>
            </div>
            </el-col>
        </el-row>
        <br/>
    </div>
        <br/>
        <el-row>
            <el-col :span="24">
            <div class="btn" style="display: flex; justify-content: center; align-items: center;">
                <el-button type="primary" @click="updateBtn" id="updateBtn" style="width:100px;">
                    <span id="updateSpan" style="display: flex; justify-content: center; align-items: center;">修 改</span>
                </el-button>
                <el-button type="primary" @click="exitBtn" id="exitBtn" style="width:100px;" :disabled="isExitDisable">
                    <span id="exitSpan"  style="display: flex; justify-content: center; align-items: center;">退 出 登 录</span>
                </el-button>
                <el-button type="primary" @click="deleteBtn" id="deleteBtn" style="width:100px;" :disabled="isDeleteDisable">
                    <span id="deleteSpan" style="display: flex; justify-content: center; align-items: center;">注 销 账 号</span>
                </el-button>
            </div>
            </el-col>
        </el-row>
        <br/>
    </el-form>
        <el-dialog
            title="提示"
            :visible.sync="successDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>修改成功</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successDialogVisible = false;">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="failDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>修改内容不符合要求，请重试</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancelUpdate();failDialogVisible = false">取 消 修 改</el-button>
                <el-button type="primary" @click="failDialogVisible = false" id="failBtnS">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="telDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>您当前尚未绑定手机，确定继续吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="telDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateData();telDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="exitDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>确定退出账号吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exitDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="exit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="警告"
            :visible.sync="confirmDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>您正在进行注销账号操作,是否继续?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteAccount" id="confirmBtn">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>注销账号会删除账号所有数据，确定注销账号吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteDialogVisible = false;confirmDialogVisible = true" id="deleteBtn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
    `,
    data(){
        var validateUser = (rule,value,callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            }else {
                callback();
            }
        }
        var validateTel = (rule, value, callback) => {
            if(!isTelLength11(value) && value != ""){
                callback(new Error('请输入正确的手机号码'));
            }else{
                callback();
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            }else if(!isRegisterPasswordValid(value)){
                callback(new Error('密码至少为5位且应包含字母以及数字'))
            }else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value != this.ruleForm.passInput) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        }
        return{
            isAdminIptDisable: true,
            isPassIptDisable: true,
            isTelIptDisable: true,
            isCheckpassVisible: false,
            isUpdatingFlag: false,
            isExitDisable: false,
            isDeleteDisable: false,
            successDialogVisible: false,
            failDialogVisible: false,
            telDialogVisible: false,
            exitDialogVisible: false,
            deleteDialogVisible: false,
            confirmDialogVisible: false,

            ruleForm:{
                adminInput: 'aa',
                passInput: 'pass1',
                checkpassInput: '',
                telInput: '',
            },
            rules: {
                adminInput: [
                    {validator: validateUser, trigger: 'blur'}
                ],
                telInput: [
                    {validator: validateTel, trigger: 'blur'}
                ],
                passInput: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkpassInput: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        };
    },
    mounted(){
        document.addEventListener('keydown',this.keydownOccured);
        this.initInfo();
    },
    methods: {
        //初始化信息
        initInfo(){
            let accountUsername = getNowLoginUser();
            let account = getAccount(accountUsername);
            document.getElementById('usernameSpan').innerText = account.username;
            this.ruleForm.adminInput = account.admin;
            this.ruleForm.passInput = account.password;
            this.ruleForm.telInput = account.tel;
        },
        //修改按钮被点击
        updateBtn(){
            if(!this.isUpdatingFlag){
                this.isAdminIptDisable = false;
                this.isPassIptDisable = false;
                this.isCheckpassVisible = true;
                this.isTelIptDisable = false;
                this.isUpdatingFlag = true;
                this.isExitDisable = true;
                this.isDeleteDisable = true;
                document.getElementById("updateSpan").innerText = "完 成";
            }else if(this.isUpdatingFlag){
                this.checkIsValid();
            }      
        },
        updateData(){
            let newAccount = {
                username : getNowLoginUser(),
                password : this.ruleForm.passInput,
                admin : this.ruleForm.adminInput,
                tel : this.ruleForm.telInput,
            }
            updateAccountData(newAccount);

            console.log("更新");
            this.successDialogVisible = true;
            this.isUpdatingFlag = false;
            this.isExitDisable = false;
            this.isDeleteDisable = false;
            this.isAdminIptDisable = true;
            this.isPassIptDisable = true;
            this.isCheckpassVisible = false;
            this.isTelIptDisable = true;
            this.checkpassInput = "";
            document.getElementById("updateSpan").innerText = "修 改";
        },
        cancelUpdate(){
            this.initInfo();
            this.isUpdatingFlag = false;
            this.isAdminIptDisable = true;
            this.isPassIptDisable = true;
            this.isCheckpassVisible = false;
            this.isTelIptDisable = true;
            this.isExitDisable = false;
            this.isDeleteDisable = false;
            this.checkpassInput = "";
            document.getElementById("updateSpan").innerText = "修 改";
        },
        deleteBtn(){
            this.deleteDialogVisible = true;
            document.getElementById('deleteBtn').focus();
        },
        deleteAccount(){
            deleteAccountData(getNowLoginUser());
            window.location.href = "./login.html";
        },
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
        },
        isUpdateValid(){
            console.log("isUpdateValid");
            if(this.ruleForm.adminInput != "" && isRegisterPasswordValid(this.ruleForm.passInput) && 
            isRegisterCheckpassValid(this.ruleForm.passInput,this.ruleForm.checkpassInput)){
                console.log(this.ruleForm.passInput);
                console.log(this.ruleForm.checkpassInput);
                return true;
            }
            return false
        },
        checkIsValid(){
            if(this.isUpdateValid() && this.ruleForm.telInput == ""){
                this.telDialogVisible = true;
            }else if(this.isUpdateValid() && isTelLength11(this.ruleForm.telInput)){
                this.updateData();
            }else{
                this.failDialogVisible = true;
                document.getElementById('failBtn').focus();
            }
        },
        exitBtn(){
            this.exitDialogVisible = true;
        },
        exit(){
            window.location.href = "./login.html";
        },
        handleClose(){

        },
        isDialogVisible(){
            if(this.successDialogVisible || this.failDialogVisible || this.telDialogVisible || 
                this.exitDialogVisible || this.deleteDialogVisible || this.confirmDialogVisible){
                    return true;
            }
            return false;
        },
        keydownOccured(event){
            if(event.key === 'Enter'){
                console.log(this.isDialogVisible());
                if(!this.isDialogVisible()){
                    //console.log("Enter pressed")
                    if (document.activeElement.id === "adminIpt") {  //焦点在用户名框 按enter到tel框
                    event.preventDefault(); // 阻止默认行为（表单提交等）
                    //console.log("Enter pressed on username input, focusing password input.");

                    // 将焦点设置到tel输入框
                    this.$nextTick(() => {
                    if (this.$refs.telInput) {
                        this.$refs.telInput.focus();
                        }
                    });
                    }else if(document.activeElement.id === "telIpt"){
                        this.$nextTick(() => {
                            if (this.$refs.passInput) {
                                this.$refs.passInput.focus();
                                }
                            });
                    }else if(document.activeElement.id === "passIpt"){
                        this.$nextTick(() => {
                            if (this.$refs.checkpassInput) {
                                this.$refs.checkpassInput.focus();
                                }
                            });
                    }else if(document.activeElement.id === "checkpassIpt"){
                        this.updateBtn();
                    }
                }else{
                    if(this.successDialogVisible){
                        this.successDialogVisible = false;
                    }else if(this.failDialogVisible){
                        event.preventDefault();
                        this.failDialogVisible = false;
                    }else if(this.telDialogVisible){
                        event.preventDefault();
                        this.updateData();
                        this.telDialogVisible = false;
                    }else if(this.exitDialogVisible){
                        this.exitDialogVisible = false;
                        this.exit();
                    }else if(this.deleteDialogVisible){
                        event.preventDefault();
                        this.deleteDialogVisible = false;
                        this.confirmDialogVisible = true;
                    }else if(this.confirmDialogVisible){
                        this.deleteAccount();
                    }
                }
            }
            
        }
    }
}
// 导出组件，以便可以在其他地方使用
export default accountInfo;

if (typeof window !== 'undefined') {
    Vue.component('account-info', accountInfo);
}
