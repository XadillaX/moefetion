var errMap = {
    "Spider error"                                  : "发射娘从飞信那边拿到了一堆没用的东西导致发射失败，请稍后再发射。",

    "Unknown error while checking login status."    : "未知错误导致的发射娘登陆失败，请稍后再试。",
    "Wrong password"                                : "密码错误哦。",
    "You failed to logged in for several times so you have to log in correctly on PC or mobile."    : "主人肯定在调试发射娘之前已经登录失败好多次了，飞信那边要你给验证码才行，发射娘太笨没法识别验证码，请手动去飞信正确登录一次发射娘才能发射。",
    "Wrong username or password."                   : "用户名或者密码错误哦。",
    "Other error."                                  : "登录的时候遇到其它错误了。",

    "You have to log in first."                     : "发射娘感冒了，未能记录登录信息，请稍后再试。",

    "Empty message."                                : "主人怎么可以拿空信息给发射娘吃！",
    "Unknown error."                                : "发射的时候遇到未知错误了。",

    "Can't fetch the CSRF token for"                : "发射娘在获取CSRF验证信息的时候出错了涅。",
    "Can't find friend"                             : "未能找到该好友，但也有可能是发射娘感冒了开了个小差，如果主人确定输入信息无误，请稍后再试。",

    "Invalid sender mobile number."                 : "主人，你的手机号写错啦！",
    "Invalid receiver mobile number."               : "主人，发射娘要射的地方手机号写错啦！",

    "最多输入 500 字"                                : null
};

function getErrorMsg(errinfo) {
    for(var key in errMap) {
        if(errinfo.indexOf(key) !== -1) {
            if(errMap[key] === null) return errinfo;
            return errMap[key];
        }
    }

    console.log(errinfo);
    return "主人，发射娘也不知道发生了什么错误，呜呜呜%>_<%";
}

function sendmsg() {
    $("#submit").button("loading");
    var data = {
        "from"      : $("#from").val(),
        "password"  : $("#password").val(),
        "to"        : $("#to").val(),
        "msg"       : $("#message").val()
    };
    store.set("lastSendInfo", {
        "from"      : data.from,
        "password"  : data.password,
        "to"        : data.to
    });

    $.get("/api/send", data, function(e) {
        if(e["status"] !== undefined) {
            if(e["status"]) {
                $("#result-text").html("主人，发射娘已经成功给 " + data["to"] + " 发送短信了！");
            } else {
                $("#result-text").html("给 " + data["to"] + " 发送短信失败：" + getErrorMsg(e["msg"]));
            }

            $("#result-modal").modal();
        } else {
            $("#result-text").html("给 " + data["to"] + " 发送短信失败：API服务器错误。");
        }

        $("#submit").button("reset");
    });

    return false;
}

function initStore() {
    var lastSendInfo = store.get("lastSendInfo");
    if(undefined === lastSendInfo) return;
    if(null === lastSendInfo) return;
    if(0 === lastSendInfo.length) return;

    $("#from").val(lastSendInfo["from"]);
    $("#password").val(lastSendInfo["password"]);
    $("#to").val(lastSendInfo["to"]);
}

$(function() {
    initStore();
});
