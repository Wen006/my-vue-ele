const sys = require("./sys")


module.exports={
    ...sys,
    "sm.user.list":{
        url: "/sys/user/list",
        method: "get",
        author: "Jack",
        m_table: "sm_user",
        m_handle: "list",
    },
    "sm.user.saveOrUpdate":{
        url: "/sys/user/saveOrUpdate",
        method: "post",
        author: "Jack",
        m_table: "sm_user",
        m_handle: "saveOrUpdate",
    },
    "sm.user.remove":{
        url: "/sys/user/remove",
        method: "get",
        author: "Jack",
        m_table: "sm_user",
        m_handle: "remove",
    },
    "sm.user.getOne":{
        url: "/sys/user/getOne",
        method: "get",
        author: "Jack",
        m_table: "sm_user",
        m_handle: "getOne",
    },
    "sm.user.queryParam":{
        url: "/sys/menu/queryParam",
        method: "get",
        author: "Jack",
        m_table: "sm_user",
        m_handle: "queryParam",
    },
    
}
