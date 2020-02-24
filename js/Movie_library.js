(function () {
    var movie = document.getElementById("movie");
    var movieSpan = movie.getElementsByTagName("span");
    var movieUl = movie.getElementsByTagName("ul")[0];

    wxd.ajax({
        "url": "./static/playMove.json",
        "type": "get",
        "data": "",
        "success": function (res) {
            var resArr = JSON.parse(res);

            // 按照时间从近到远排序
            var resArrTime = resArr.concat().sort(function (a, b) {
                return Date.parse(b.date) - Date.parse(a.date);
            });

            // 最近更新
            movieSpan[3].onclick = function () {
                movieSpan[4].className = "";
                this.className = "blueBorder";
                movieUl.innerHTML = wxd.movie(resArrTime);
                vipSelect(resArrTime);
            }
            
            // 默认界面
            movieUl.innerHTML = wxd.movie(resArrTime);
            vipSelect(resArrTime);

            // 最受欢迎
            var resArrPop = resArr.concat().sort(function (a, b) {
                return parseFloat(b.score) - parseFloat(a.score);
            });
            movieSpan[4].onclick = function () {
                movieSpan[3].className = "";
                this.className = "blueBorder";
                movieUl.innerHTML = wxd.movie(resArrPop);
                vipSelect(resArrPop);
            }
            function vipSelect(resArr) {

                // 全部
                movieSpan[0].onclick = function () {
                    for (let i = 0; i < 3; i++) {
                        movieSpan[i].className = "";
                    }
                    this.className = "blue";
                    movieUl.innerHTML = wxd.movie(resArr);
                }

                // 会员免费
                var resArrVipfree = resArr.concat().filter(function (value) {
                    return value.vip == 1;
                });
                movieSpan[1].onclick = function () {
                    for (let i = 0; i < 3; i++) {
                        movieSpan[i].className = "";
                    }
                    this.className = "blue";
                    movieUl.innerHTML = wxd.movie(resArrVipfree);
                }

                // vip折扣点播
                var resArrVippay = resArr.concat().filter(function (value) {
                    return value.vip == 3;
                });
                movieSpan[2].onclick = function () {
                    for (let i = 0; i < 3; i++) {
                        movieSpan[i].className = "";
                    }
                    this.className = "blue";
                    movieUl.innerHTML = wxd.movie(resArrVippay);
                }
            }
        }
    })
})()