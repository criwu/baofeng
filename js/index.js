(function () {


    /* -------------banner----------------- */
    var banner = document.getElementById("banner");
    var bannerPic = banner.getElementsByTagName("div")[3];
    var bannerPicImg = bannerPic.getElementsByTagName("img");
    var bannerUl = banner.getElementsByTagName("ul")[0];
    var bannerUlImg = bannerUl.getElementsByTagName("img");
    var bannerUlLi = bannerUl.getElementsByTagName("li");
    var bannerSpan = banner.getElementsByTagName("span");
    var timer = null;
    var num = 0;
    var auto = null;

    wxd.ajax({
        "url": "./static/banner.json",
        "type": "get",
        "data": "",
        "success": function (res) {
            var content = JSON.parse(res).data;
            var bannerPicStr = "";
            var bannerUlStr = "";
            // 设置对应个数标签
            for (let i = 0; i < content.length; i++) {
                bannerPicStr += '<img src="' + content[i].big_img + '">';
                bannerUlStr += ' <li><img src="' + content[i].small_img + '"></li>'
            }
            bannerPic.innerHTML = bannerPicStr;
            bannerUl.innerHTML = bannerUlStr;

            // 设置初始化样式
            bannerPicImg[0].style.opacity = "1";
            bannerUlLi[0].style.border = "2px solid #e8e7e4";
            for (let i = 0; i < content.length; i++) {
                bannerUlLi[i].className = "shade";
            }
            bannerUlLi[0].className = "";


            // 动态交互
            for (var i = 0; i < bannerUlImg.length; i++) {
                bannerUlLi[i].index = i;

                // 鼠标划入
                bannerUlLi[i].onmouseover = function () {
                    if (this.index !== num) {
                        clearInterval(timer)

                        // 清空样式
                        for (let j = 0; j < bannerUlImg.length; j++) {
                            bannerUlLi[j].style.border = "2px solid transparent";
                            bannerPicImg[j].style.opacity = "0";
                            bannerUlLi[j].className = "shade";
                        }

                        // 变换图片透明度
                        timer = wxd.backForth(bannerPicImg[this.index], { opacity: 100 }, 20);
                        this.style.border = "2px solid #e8e7e4";
                        bannerUlLi[this.index].className = "";
                        num = this.index
                    }
                }
            }

            // 自动切图
            auto = setInterval(function () {
                num++;
                num = num == 9 ? 0 : num;
                autoChange();
            }, 2000);
            // 自动切换函数
            function autoChange() {
                clearInterval(timer);
                // 清空样式
                for (let j = 0; j < bannerUlImg.length; j++) {
                    bannerUlLi[j].style.border = "2px solid transparent";
                    bannerPicImg[j].style.opacity = "0";
                    bannerUlLi[j].className = "shade";
                }

                // 变化
                timer = wxd.backForth(bannerPicImg[num], { opacity: 100 }, 20);
                bannerUlLi[num].style.border = "2px solid #e8e7e4";
                bannerUlLi[num].className = "";
            }
            // 鼠标移入清除自动
            banner.onmouseover = function () {
                clearInterval(auto)
            }
            // 鼠标移出开启自动
            banner.onmouseout = function () {
                auto = setInterval(function () {
                    num++;
                    num = num == 9 ? 0 : num;
                    autoChange();
                }, 2000);
            }

            // 左右切图
            bannerSpan[1].onclick = function () {
                num++;
                num = num == 9 ? 0 : num;
                autoChange();
            }
            bannerSpan[0].onclick = function () {
                num--;
                num = num < 0 ? 8 : num;
                autoChange();
            }
        }
    })

    /* -------------vip privilege--------------------- */
    var vip = document.getElementById("vip");
    var vipSpan = vip.getElementsByTagName("span");
    var vipP = vip.getElementsByTagName("p")[0];
    // 右击
    vipSpan[1].onclick = function () {
        wxd.backForth(vipP, { left: -1070 }, 10)
    }
    vipSpan[0].onclick = function () {
        wxd.backForth(vipP, { left: 0 }, 10)
    }

    /* -----------------recommend------------------------ */
    var recommendUl = document.getElementById("recom");
    var hotrecomUl = document.getElementById("hot_recom");
    wxd.ajax({
        "url": "./static/hot.json",
        "type": "get",
        "data": "",
        "success": function (res) {
            recommendUl.innerHTML = wxd.movie(JSON.parse(res).recommend);
            hotrecomUl.innerHTML = wxd.movie(JSON.parse(res).hot_showing);
        }
    })



})();