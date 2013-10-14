/**
 * Created with JetBrains WebStorm.
 * User: XadillaX
 * Date: 13-10-14
 * Time: 下午2:17
 * Open api.
 */
var sender = require("fetion-sender");
var validator = require("validator").check;

exports.intro = function(req, resp) {
    resp.render("api/intro", { title : '(〃ノ∇ノ) 飞信喵' });
};

exports.send = function(req, resp) {
    var query = req.query;
    var result = {};

    try {
        validator(query.from, "Invalid sender mobile number.").is(/1(3[4-9]|5[012789]|8[78])\d{8}$/);
        validator(query.to, "Invalid receiver mobile number.").is(/1(3[4-9]|5[012789]|8[78])\d{8}$/);
    } catch(e) {
        result.status = false;
        result.msg = e.message;
        resp.send(200, result);
        return;
    }

    if(query.msg !== null && query.msg.length > 500) {
        result.status = false;
        result.msg = "最多输入 500 字，主人却输入了 " + query.msg.length + " 字。";
        resp.send(200, result);
        return;
    }

    sender.send(query.from, query.password, query.to, query.msg, function(status, msg) {
        if(!status) {
            result.status = false;
            result.msg = msg;
            resp.send(200, result);
            return;
        }

        result.status = true;
        result.msg = "";
        resp.send(200, result);
    });
};
