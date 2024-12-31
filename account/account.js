//设置当前登录账号
function setNowLoginUser(username){
    localStorage.setItem('nowLoginUser', username);
}

function getNowLoginUser(){
    return localStorage.getItem('nowLoginUser');
}

function clearNowLoginUser() {
    localStorage.removeItem('nowLoginUser');
}

// 存储账号数据
function saveAccountData(username, password) {
    // 获取现有账号数据（如果存在）
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 创建新账号对象
    const newAccount = {
        username: username,
        password: password,
        admin: "admin",
        tel: "",
    };

    // 将新账号添加到数组中
    accounts.push(newAccount);

    // 存储更新后的账号数组
    localStorage.setItem('accounts', JSON.stringify(accounts));

    console.log('账号数据已存储');
}

// 读取多个账号数据
function getAccountData() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    return accounts;
}

//读取单个账号数据
function getAccount(username){
    // 获取现有账号数据
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 查找要更新的账号
    const account = accounts.find(acc => acc.username === username);

    return account;
}

//获得账号密码
function getAccountPass(username){
    const account = getAccount(username);
    return account.password;
}

//获得账号手机号
function getAccountTel(username){
    const account = getAccount(username);
    return account.tel;
}

//获得账号用户名 
function getAccountAdmin(username){
    const account = getAccount(username);
    return account.admin;
}

//更新账号数据
function updateAccountData(newAccount){
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const index = accounts.findIndex(account => account.username === newAccount.username);

    if (index !== -1) {
        // 更新账号数据
        accounts[index] = { ...accounts[index], ...newAccount };
        // 保存更新后的数据
        localStorage.setItem('accounts', JSON.stringify(accounts));
        console.log('账号数据已更新');
    } else {
        console.error('账号未找到');
    }
}

// 查看特定用户名是否被占用
function isUserExist(username){
    // 获取现有账号数据
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 查找要更新的账号
    const account = accounts.find(acc => acc.username === username);
    if(account){
        return true;
    }
    return false;
}

// 更新特定账号数据
function updateAccountPass(oldUsername, newPassword) {
    // 获取现有账号数据
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 查找要更新的账号
    const account = accounts.find(acc => acc.username === oldUsername);

    if (account) {
        // 更新账号的密码
        account.password = newPassword;

        // 存储更新后的账号数组
        localStorage.setItem('accounts', JSON.stringify(accounts));

        console.log('账号数据已更新');
    } else {
        console.log('未找到该账号');
    }
}

// 删除特定账号数据
function deleteAccountData(username) {
    // 获取现有账号数据
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 过滤掉要删除的账号
    accounts = accounts.filter(acc => acc.username !== username);

    // 存储更新后的账号数组
    localStorage.setItem('accounts', JSON.stringify(accounts));

    console.log('账号数据已删除');
}

function isAccountCorrect(username,password){
    // 获取现有账号数据
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    //获得账号
    const account = accounts.find(acc => acc.username === username);
    if(account){
        console.log('账号存在');
        if(account.password === password){
            console.log('密码正确');
            return true;
        }
    }

    return false;
}

function isTelLength11(value){
    if(!value){
        return false;
    }
    if(value.length == 11){
        return true;
    }
    return false;
}