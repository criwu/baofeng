// --------点击同意切换效果-----------
var signTip = document.getElementById("tip");
var signTipI = signTip.getElementsByTagName("i")[0];
var flag = true;
signTipI.onclick = function () {
    if (flag) {
        this.style.backgroundPosition = "-20px -66px";
    } else {
        this.style.backgroundPosition = "0 -66px";
    }
    flag = !flag;
}

// --------------验证---------------
var sign = document.getElementById("sign_main");
var signIn = sign.getElementsByTagName("input");
var signHint = document.getElementById("hint");
var signSubmit = document.getElementById("Submit");
var signSpan = document.getElementsByTagName("span");
var signBtn = document.getElementsByTagName("button");
// 手机号验证
signIn[0].onblur = function () {
    signHint.innerHTML = "";
    let reg = /^1[3-9][0-9]{9}$/;
    if (reg.exec(this.value) === null) {
        signHint.innerHTML = "请输入正确的手机号码";
    } else {
        signHint.innerHTML = "";
    }
}
// 密码验证
signIn[1].oninput = function () {
    var signPw = signIn[1].value;
    var arr = [/(?=(.*[#@!~%^&*].*)|(.*[\d].*))(?=(.*[#@!~%^&*].*)|(.*[a-zA-Z].*))(?=(.*[\d].*)|(.*[a-zA-Z].*))^[#@!~%^&*a-zA-Z0-9]+$/, /(?=.*[#@!~%^&*].*)(?=.*[\d].*)(?=.*[a-zA-Z].*)^[#@!~%^&*a-zA-Z0-9]+$/];
    if (/^[#@!~%^&*a-zA-Z0-9]+$/.test(signPw)) {
        if (signPw.length >= 6) {
            signHint.innerHTML = "";
            if (arr[1].test(signPw)) {
                signSpan[1].style.backgroundPosition = "-130px -70px";
            } else if (arr[0].test(signPw)) {
                signSpan[1].style.backgroundPosition = "-100px -70px";
            } else {
                signSpan[1].style.backgroundPosition = "-70px -70px";
            }
        } else if (signPw.length > 0) {
            signHint.innerHTML = "密码过于简单";
        }
    }
    if(signPw.length == 0){
        signHint.innerHTML = "" ;
        signSpan[1].style.backgroundPosition = "-40px -70px";
    }
}

// 验证码
var randomCode = wxd.random(4);
signSpan[2].innerHTML = randomCode;
signIn[2].onblur = function () {
    if (signIn[2].value.toLocaleLowerCase() !== signSpan[2].innerHTML.toLocaleLowerCase()) {
        signHint.innerHTML = "请输入正确的验证码";
    } else {
        signHint.innerHTML = "";
    }
}
signBtn[0].onclick = function () {
    randomCode = wxd.random(4);
    signSpan[2].innerHTML = randomCode;
    signIn[2].onblur = function () {
        if (signIn[2].value.toLocaleLowerCase() !== signSpan[2].innerHTML.toLocaleLowerCase()) {
            signHint.innerHTML = "请输入正确的验证码";
        } else {
            signHint.innerHTML = "";
        }
    }
}

// 短信验证码
signIn[3].onblur = function () {
    let reg = /^[0-9]{4}$/;
    if (reg.exec(this.value) === null) {
        signHint.innerHTML = "请输入正确的短信验证码";
    } else {
        signHint.innerHTML = "";
    }
}
