
const apiConfig = require("../../src/api/config/index");
const { writeFail, writeOk } = require("./mock.util")
const dao = require("./dao.util")
function parseReq(req){
    const { m_table } = req.headers;
    const params = {...req.query,...req.body};
    if(!m_table){
        console.error("开发环境下 前端请求未指定m_table");
        return {};
    }
    return {
        m_table,
        ...params
    }
}

const genApi = {
    list: function (req, res) {
        const { pageSize=10,pageNo=1,m_table, ...other } = parseReq(req);
        if(!m_table){
            return writeFail(res,"请求失败");
        }
        let newData = dao.selectDb(m_table);
        for (const key in other) {
            if ({}.hasOwnProperty.call(other, key)) {
            newData = newData.filter(item => {
                if ({}.hasOwnProperty.call(item, key)) {
                return (
                    String(item[key])
                    .trim()
                    .indexOf(decodeURI(other[key]).trim()) > -1
                );
                }
                return true;
            });
            }
        }
        
        writeOk(res,{
            list: newData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
            total: newData.length,
        });
    },
    queryParam: function (req, res) { 
        const { m_table, ...other } = parseReq(req);
        if(!m_table){
            return writeFail(res,"请求失败");
        }
        const ds = dao.selectDb(m_table);
        const paramKeys = Object.keys(other);
        const filterDs = paramKeys.length> 0?ds.filter(item=>{
                return paramKeys.some(paramKey=>(item[paramKey].includes(other[paramKey])));
            }):ds;
        writeOk(res,filterDs);
    },

    remove: function (req, res) {
        const { m_table, id } = parseReq(req);
        if(!m_table){
            return writeFail(res,"请求失败");
        }
        dao.remove(m_table,id);
        writeOk(res,id);
    },

    saveOrUpdate: function (req, res) {
        const { m_table, ...other } = parseReq(req);
        if(!m_table){
            return writeFail(res,"请求失败");
        }
        const newRecord = dao.saveOrUpdate(m_table,other);
        writeOk(res,newRecord)
    },

    getOne: function (req, res) {
        const { m_table, id } = parseReq(req);
        if(!m_table){
            return writeFail(res,"请求失败");
        }
        const record = dao.getOne(m_table,id);
        if(record){
            return writeOk(res,record)
        }
        writeFail(res,"未找到记录");
    },
}

const arr = [];

for (const key in apiConfig) {
    if (apiConfig.hasOwnProperty(key)) {
        const api = apiConfig[key];
        if(api.m_handle && genApi[api.m_handle]){
            arr.push({
                url:api.url,
                method:api.method,
                result:genApi[api.m_handle],
            }); 
        }
    }
}

// console.log('======== Mock 自动代理生成start：==========')
// console.log(arr)
// console.log('======== Mock 自动代理生成 end ：==========')

module.exports = arr;