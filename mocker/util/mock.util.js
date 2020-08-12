
const Mock = require("mockjs");

const globalConfig = {
    maxRecord:1000,
    minRecord:1000,
}

/**
 * 统一接口配置
 */
function IResult() {
    
    code = 200;
    msg = "成功";
    data = "obj";
    
    this.ok = function(data){
        this.data = data;
        this.code = 200;
        return this;
    }

    this.message = function(msg){
        this.msg = msg;
        return this;
    }
    this.error = function(msg){
        this.code = "500";
        this.msg = msg;
        return this;
    }
    this.addError = function(msg){
        if(!Array.isArray(this.msg)){
            this.msg = new Array();
        }
        this.msg.push(msg);
        return this;
    }
}

// 产生数据
function loadDb(dbConfig,min=globalConfig.minRecord,max=globalConfig.maxRecord){
    const key = "list|"+(min > max?max+""+min:min+"-"+max);
    return Mock.mock({
        [`${key}`]: [dbConfig]
    }).list;
}

/**
 * 代理格式转化
 * @param { 数组 } arr 
 * @param {string 上下文} context 
 */
function toProxy(arr,context){
    const proxy = {}
    arr.forEach(item=>{
        proxy[item.method.toUpperCase()+" "+(context?context:"")+item.url] = item.result
    })
    return proxy;
}


module.exports={
    IResult,
    ok:function(data){
        return new IResult().ok(data);
    },
    error:function(msg){
        return new IResult().error(msg);
    },
    writeOk:function(res,data){
        res.send(new IResult().ok(data));
    },
    writeFail:function(res,msg){
        res.send(new IResult().error(msg))
    },
    loadDb,
    mockOne:function(dbCfg){
        return Mock.mock(dbCfg);
    },
    toProxy,
}