var index = require("./action/index");
var api = require("./action/api");

exports.getRouter = {
    "/"             : index.index,
    "/api/intro"    : api.intro,
    "/api/send"     : api.send
};

exports.postRouter = {

};

exports.setRouter = function(app) {
    for(var key in this.getRouter) {
        app.get(key, this.getRouter[key]);
    }

    for(var key in this.post) {
        app.post(key, this.postRouter[key]);
    }
};
