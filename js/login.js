// --------记住我切换效果-----------
var loginTip = document.getElementById("tip");
var loginTipI = loginTip.getElementsByTagName("i")[0];
var flag = true;
loginTipI.onclick = function () {
    if (flag) {
        this.style.backgroundPosition = "-20px -66px";
    } else {
        this.style.backgroundPosition = "0 -66px";
    }
    flag = !flag;
}

// ---------输入框x显示-------------
var loginTxt = document.getElementById("txt");
var loginTxtIn = loginTxt.getElementsByTagName("input")[0];
var loginTxtSpan = loginTxt.getElementsByTagName("span")[0];
var loginPw = document.getElementById("pw");
var loginPwIn = loginPw.getElementsByTagName("input")[0];
var loginPwSpan = loginPw.getElementsByTagName("span")[0];

// 输入框有文字显示关闭按钮
loginTxtIn.oninput = function () {
    if (this.value !== "") {
        loginTxtSpan.style.display = "block";
    } else {
        loginTxtSpan.style.display = "none";
    }
}
loginPwIn.oninput = function () {
    if (this.value !== "") {
        loginPwSpan.style.display = "block";
    } else {
        loginPwSpan.style.display = "none";
    }
}
// 点关闭输入框内容消失
loginTxtSpan.onclick = function () {
    loginTxtIn.value = "";
    loginTxtSpan.style.display = "none";
}
loginPwSpan.onclick = function () {
    loginPwIn.value = "";
    loginPwSpan.style.display = "none";
}

// 点击提交验证正误
var login = document.getElementById("login");
var loginBtn = login.getElementsByTagName("button")[0];
var loginHint = document.getElementById("hint");
// 储存cookie
wxd.saveCookie("soso", "soso123", 30);
wxd.saveCookie("huhu", "huhu123", 30);
wxd.saveCookie("xixi", "xixi123", 30);
wxd.saveCookie("wawa", "wawa123", 30);
loginBtn.onclick = function () {
    var txtIn = loginTxtIn.value;
    var pwIn = loginPwIn.value;
    if (wxd.getCookie(txtIn) == pwIn) {
        window.open("./index.html", "_self")
    }else{
        loginHint.innerHTML="你输入的帐号或密码不正确，请重新输入。";
    }
}