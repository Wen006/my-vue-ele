const { toProxy } = require("./util/mock.util");

const sys = require("./sys/index");
const exam = require("./exam/index");

// 依据 api|service 下的config 生成mock代理
const proxy = require("./util/rest.util");
const context = process.env.VUE_APP_BASE_API+"/api";
module.exports = {
    ...toProxy(proxy,context),
    ...toProxy(sys,context),
    ...toProxy(exam,context),
}