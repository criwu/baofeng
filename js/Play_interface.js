(function () {
    /* -------------------rank--------------------- */
    var rankUl = document.getElementById("rank");
    var rankLi = rankUl.getElementsByTagName("li");
    for (let i = 0; i < rankLi.length; i++) {
        rankLi[i].onmouseover = function () {
            for (let i = 0; i < rankLi.length; i++) {
                rankLi[i].innerHTML = "<span>2</span>痞子熊兵之杀狼祭天<em>4.3</em>";
                rankLi[i].className = "";
            }
            this.className = "active";
            this.innerHTML = '<img src="./images/hotrecommend/1.jpg"><p><i>1</i>龙泉沟</p>';
        }
    }
    /* ----------视频点赞------------ */
    var playLeft = document.getElementById("play_left");
    var playLeftA = playLeft.getElementsByTagName("a");
    var playLeftI = playLeft.getElementsByTagName("i");
    var playLeftSpan = playLeft.getElementsByTagName("span");
    var flag1 = true;
    var flag2 = true;
    var flag3 = true;
    // 点赞
    playLeftA[0].onclick = function () {
        let num = parseInt(playLeftSpan[0].innerHTML);
        if (flag1) {
            num++;
            playLeftI[0].style.backgroundPosition = "0 -272px";
            playLeftSpan[0].style.color = "#009cff";
        } else {
            num--
            playLeftI[0].style.backgroundPosition = "0 0"
            playLeftSpan[0].style.color = "#989898";
        }
        flag1 = !flag1;
        playLeftSpan[0].innerHTML = num;
    }
    // 吐槽
    playLeftA[1].onclick = function () {
        let num = parseInt(playLeftSpan[1].innerHTML);
        if (flag2) {
            num++;
            playLeftI[1].style.backgroundPosition = "0 -308px"
            playLeftSpan[1].style.color = "#009cff";
        } else {
            num--
            playLeftI[1].style.backgroundPosition = "0 -36px";
            playLeftSpan[1].style.color = "#989898";
        }
        flag2 = !flag2;
        playLeftSpan[1].innerHTML = num;
    }
    // 收藏
    playLeftA[2].onclick = function () {
        if (flag3) {
            playLeftI[2].style.backgroundPosition = "0 -344px";
            playLeftSpan[2].style.color = "#009cff";
        } else {
            playLeftI[2].style.backgroundPosition = "0 -72px";
            playLeftSpan[2].style.color = "#989898";
        }
        flag3 = !flag3;
    }

    /* ---------------comment----------------- */
    var comBox = document.getElementById("com_box");
    var comBoxI = comBox.getElementsByTagName("i")[0];
    var comBoxText = comBox.getElementsByTagName("div");

    // 显示输入框
    comBoxText[0].onclick = function () {
        comBoxText[2].style.display = "none";
    }
    // 输入后提示字符变化
    comBoxText[1].oninput = function () {
        let comeBoxStr = comBoxText[1].innerHTML;
        comBoxI.innerHTML = 140 - comeBoxStr.length;
    }

    //------------评论部分------------
    var commentUl = document.getElementById("comment");
    var comControl = document.getElementById("com_control");
    var comControlBtn = comControl.getElementsByTagName("button");
    var comControlIn = comControl.getElementsByTagName("input")[0];
    var comControlSpan = comControl.getElementsByTagName("span")[0];
    var comNav = document.getElementById("nav");
    var comNavSpan = comNav.getElementsByTagName("span");
    wxd.ajax({
        "url": "./static/recommend.json",
        "type": "get",
        "data": "请求参数",
        "success": function (res) {
            var comArr = JSON.parse(res).comment;
            var pageCount = Math.ceil(comArr.length / 6);
            var page = 0;
            var str = "";
            comControlSpan.innerHTML = pageCount;
            // 按照时间排序
            var comArrTime = comArr.concat().sort(function (a, b) {
                return Date.parse(b.date + " " + b.time) - Date.parse(a.date + " " + a.time);
            })
            //按照点赞数排序
            var comArrCount = comArr.concat().sort(function (a, b) {
                return b.count - a.count;
            })
            // -----默认照点赞数排序-------
            change(comArrCount);
            // ------按照时间排序----------
            comNavSpan[1].onclick = function () {
                change(comArrTime);
                this.className = "select";
                comNavSpan[0].className = "";
            }
            // 
            comNavSpan[0].onclick = function () {
                change(comArrCount);
                this.className = "select";
                comNavSpan[1].className = "";
            }
            // 评论区变化效果
            function change(comArr) {
                // 默认热度排序
                turnPage(comArr);
                // 下一页
                comControlBtn[2].onclick = function () {
                    // 自加1
                    page++;
                    turnPage(comArr);
                }
                // 上一页
                comControlBtn[1].onclick = function () {
                    // 自加1
                    page--;
                    turnPage(comArr);
                }
                // 点击确定
                comControlBtn[0].onclick = function () {
                    page = comControlIn.value - 1;
                    turnPage(comArr);
                }
            }

            function turnPage(comArr) {
                // 清空内容
                str = "";
                // 设置到最后一页时不能继续翻页     设置第一页不能继续上一页
                if ((page + 1) > pageCount) {
                    page = pageCount - 1;
                    return false;
                }
                if (page < 0) {
                    page = 0;
                    return false;
                }
                // 设置上一页样式
                page == 0 ? comControlBtn[1].className = "opacity" : comControlBtn[1].className = "";
                (page + 1) == pageCount ? comControlBtn[2].className = "opacity" : comControlBtn[2].className = "";
                count = (page + 1) * 6 < comArr.length ? (page + 1) * 6 : comArr.length;
                for (let i = 6 * page; i < count; i++) {
                    str += `<li>
                            <div class="name_time">
                            <i></i>
                            <p>${comArr[i].userId}</p>
                            <p>${comArr[i].date}<span> ${comArr[i].time}</span></p>
                            </div>
                            <p>${comArr[i].content}</p>
                            <div class="bottom"><a href="#" class="none"><i>举报</i></a><ahref="#"><span>${comArr[i].count}</span></a></div>
                            </li>`;
                }
                commentUl.innerHTML = str;
                comControlIn.value = page + 1;
            }
        }
    })
})()