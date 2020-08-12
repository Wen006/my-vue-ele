
module.exports = {
    "sm.user.login": {
        url: "/login",
        method: "post",
        author: "Jack",
        desc: "用户登陆"
    },
    "sm.user.logout":{
        url: "/logout",
        method: "post",
        author: "Jack",
        desc: "退出登陆"
    },
    "sm.user.getInfo":{
        url:"/api/getInfo",
        method:"get",
        author: "Jack",
        desc:"获取登陆用户信息"
    },
    "sm.user.getRouters":{
        url:"/api/getRouters",
        method:"get",
        author: "Jack",
        desc:"获取路由信息"
    }
}