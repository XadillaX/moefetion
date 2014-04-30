/**
 * Created with JetBrains WebStorm.
 * User: XadillaX
 * Date: 13-10-14
 * Time: 下午12:35
 * index action.
 */
exports.index = function(req, resp) {
    resp.render("index/index", { title : '(〃ノ∇ノ) 飞信喵 Nyaa～' });
};
