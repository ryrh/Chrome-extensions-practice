$(function () {
    console.log(location)
    var url = location.origin;
    var sub, che;
    var checkTimeSet = setInterval(checkTime, 1000);
    function checkTime() {//检查时间
        var date = new Date();//新建一个时间对象获取当前时间
        var month = date.getMonth() + 1;//获取当前月份
        var nowDate = date.getFullYear() + "-" + formatTime(month) + "-" + formatTime(date.getDate());//当前年月日，如2018-11-11
        var time = formatTime(date.getHours()) + ":" + formatTime(date.getMinutes()) + ":" + formatTime(date.getSeconds());//当前时间，如20:26:00
        var orderDate = "2018-11-11";//设定下单时间，格式和上面一样
        var orderTime = "01:53:00";

        if (nowDate == orderDate && time > orderTime) {//判断时间，没到时间即返回
            console.log("yes checked")
            startOrder();
            clearInterval(checkTimeSet);
        }
    }
    function startOrder() {//开始下单
        if (url == "https://buy.taobao.com" || url == "https://buy.tmall.com") {//判断页面
            sub = setInterval(submit, 500)
        } else if (url == "https://cart.taobao.com") {
            che = setInterval(checked, 500)
        } else if (url != "https://cart.taobao.com") {
            var mc_menu_hd = document.getElementById("mc-menu-hd");
            mc_menu_hd.click();
        }
    }
    function checked() {//勾选所有商品
        var J_SelectAll1 = document.getElementById("J_SelectAll1");
        if (J_SelectAll1) {
            J_SelectAll1.click();
            if ($("#J_SelectAll1").hasClass("selected")) {
                clearInterval(che)
                var J_GO = setInterval(cheJ_GO, 500)
                function cheJ_GO() {
                    var J_GoBtn = document.getElementById("J_Go");
                    if (J_Go) {
                        setTimeout(function () { J_GoBtn.click(); }, 5000);//防止被淘宝检测出非人为操作
                        clearInterval(J_GO)
                    }
                }
            }
        }
    }
    function submit() {
        var go = document.getElementsByClassName("go-btn")[0];
        if (go) {
            setTimeout(function () { go.click(); }, 5000)
            clearInterval(sub)
        }
    }
    function formatTime(num) {//统一时间格式 方便比较
        if (num < 10) {
            return "0" + num;
        } else {
            return num
        }
    }
})