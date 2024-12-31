function isAccountValid(username,password){
    if(username == 'a' && password == 'a'){
        return true;
    }else{
        return false;
    }
}

function isRegisterPasswordValid(password){
    //console.log("check psw");
    let isLengthValid = false;
    let isExistLetter = false;
    let isExistNum = false;

    if(password.length>=5){
        isLengthValid = true;
    }

    for(let i=0;i<password.length;i++){
        let temp = password[i];
        if('a' <= temp && temp <= 'z'){
            isExistLetter = true;
        }
        if('A' <= temp && temp <= 'Z'){
            isExistLetter = true;
        }
        if('0' <= temp && temp <= '9'){
            isExistNum = true;
        }
    }
    if(isLengthValid && isExistLetter && isExistNum){
        return true;
    }
    else{
        return false;
    }
}

function isRegisterUserValid(value){
    console.log("check user");
    return (value.length>=5);
}

function isRegisterCheckpassValid(pass,value){
    return value == pass;
}