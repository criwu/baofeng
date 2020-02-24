var wxd = (function () {
    /**
 * 多属性同时运动函数
 * @param {HTMLElement} elem 元素
 * @param {Object} obj 对象{key(属性):value(目标值))
 * @param {Number} time 运动快慢 
 * @param {function} 
 */
    function backForth(elem, obj, time, call) {
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
            var flag = true;
            for (var attr in obj) {

                // 1.获取当前位置
                if (attr === "opacity") {
                    var cur = parseInt(getStyle(elem, attr) * 100);
                } else {
                    var cur = parseInt(getStyle(elem, attr));
                }

                // 2.计算步长
                var speed = (obj[attr] - cur) / time;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                // 3.元素运动
                if (attr === "opacity") {
                    elem.style[attr] = (cur + speed) / 100;
                    elem.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
                } else {
                    elem.style[attr] = cur + speed + "px";
                }

                // 4.停止定时器
                if (cur != obj[attr]) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(elem.timer);
                call && call();
            }
        }, 30)
        return elem.timer
    }

    // getStyle
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
    }

    /* var obj = {
        "url": "http://api.msword.top/index/getData",
        "type": "get",
        "data": "请求参数",
        "success": function (res) {
            document.write(res)
        }
    } */
    function ajax(req) {
        // 创建对象
        var ajax = new XMLHttpRequest();

        // 和服务器建立联系
        if (req.type == "get") {
            req.url = req.data ? req.url + "?" + req.data : req.url;
            ajax.open(req.type, req.url);
        } else {
            ajax.open(req.type, req.url);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        // 发送请求
        if (req.type == "get") {
            ajax.send();
        } else {
            ajax.send(req.data)
        }

        // 判断响应
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                req.success(ajax.responseText)
            }
        }
    }

    /**
     * 添加电影简介内容
     * @param {Array} resArr 
     */
    function movie(resArr) {
        var Str = "";
        for (let i = 0; i < resArr.length; i++) {
            Str += '<li><a href="#"><img src="' + resArr[i].img + '"></a><div class="content"><div class="text"><h4><a href="#">' + resArr[i].title + '</a></h4><p>' + resArr[i].detail + '</p></div><div class="score">' + resArr[i].score.substring(0, 2) + '<i>' + resArr[i].score.substring(2, 3) + '</i></div></div>';
            switch (resArr[i].vip) {
                case 1: Str += '<span class="vipfree"></span>'; break;
                case 2: Str += '<span class="forvip"></span>'; break;
                case 3: Str += '<span class="vippay"></span>'; break;
            }
            switch (resArr[i].definition) {
                case 1: Str += '<span class="type">标清</span></li>'; break;
                case 2: Str += '<span class="type">高清</span></li>'; break;
                case 3: Str += '<span class="type">超清</span></li>'; break;
            }
        }
        return Str;
    }

    /**
 * 储存cookie函数
 * @param {String} key 名
 * @param {String} value 值
 * @param {Number} time 过期时间
 */
function saveCookie(key, value, time) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + time)
    document.cookie = `${key}=${value};expires=${oDate}`
}

// 获取cookie的函数
/**
 * 
 * @param {String} key 名 
 */
function getCookie(key) {
    var arr = document.cookie.split("; ");
    var coo = {};
    for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split("=")
        coo[a[0]] = a[1];
    }
    console.log(coo);
    
    return coo[key]
}

/**
 * 获取n位验证码
 * @param {Number} n 验证码位数 
 */
function random(n) {
    var str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var r = ""
    for (let i = 0; i < n; i++) {
        r += str.charAt(Math.floor(Math.random() * 62));
    }
    return r
}
    return {
        //方法名    方法
        "backForth": backForth,
        "getStyle": getStyle,
        "ajax": ajax,
        "movie": movie,
        "saveCookie":saveCookie,
        "getCookie":getCookie,
        "random":random
    }
})();