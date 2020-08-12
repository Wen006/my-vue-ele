const mockUtil = require("./mock.util")

const comDbField = {
    "id|+1": 1, // 属性 id 是一个自增数，起始值为 1，每次增 1
    "originFlag|1": ["pc" ,"mobile"],
    deletedFlag: "0",
    createdDate: "@date('yyyy-MM-dd')", // 日期
    lastUpdate: "@date('yyyy-MM-dd')", // 日期
    // "name": "@cname",  // 中文名称
    // "age|18-28": 0,   // 18至28以内随机整数, 0只是用来确定类型
    // "city": "@city(true)",   // 中国城市
    // "color": "@color",  // 16进制颜色
    // "email": "@email",  // 邮箱
    // "isMale|1": true,  // 布尔值
    // "isFat|1-2": true,  // true的概率是1/3
    // "fromObj|2": obj,  // 从obj对象中随机获取2个属性
    // "fromObj2|1-3": obj,  // 从obj对象中随机获取1至3个属性
    // "brother|1": ["jack", "jim"], // 随机选取 1 个元素
    // "sister|+1": ["jack", "jim", "lily"], // array中顺序选取元素作为结果
    // "friends|2": ["jack", "jim"] // 重复2次属性值生成一个新数组
};

const dbConf = {
    "sm_user": {
        name: "@cname",
        city: "@city(true)",
        "age|18-28": 0,
        email: "@email",
        addr: "@region"
    },
    "sm_menu": {
        name: "系统",
        icon: "",
        sort: "",
        pid: ""
    }
}

function getDbConfig(dbName) {
    return { ...comDbField, ...dbConf[dbName] };
}

const dbData = {}

function selectDb(dbName) {
    if (dbData[dbName]) {
        return dbData[dbName];
    }
    if (dbConf[dbName]) {
        return dbData[dbName] = mockUtil.loadDb(getDbConfig(dbName), 10, 30);
    } else {
        console.error("Mock 未配置数据库[" + dbName + "]")
        return [];
    }
}

function setDbData(dbName, ds) {
    dbData[dbName] = ds;
}

module.exports = {
    selectDb,
    remove: function (dbName, id) {
        setDbData(dbName, selectDb(dbName).filter(item => item.id !== id));
        return id;
    },
    saveOrUpdate: function (dbName, record) {
        let nRecord = record;
        if (record.id) {
            selectDb(dbName).some(item => {
                if (item.id == record.id) {
                    Object.assign(item, record);
                    return true;
                }
                return false;
            })
        } else {
            const ogRecord = mockUtil.mockOne(getDbConfig(dbName));
            nRecord = { ...ogRecord, ...record };
            selectDb(dbName).push(nRecord);
        }
        return nRecord;
    },
    getOne: function (dbName, id) {
        const arr = selectDb(dbName).filter(it => it.id == id);
        return arr.length == 1 ? arr[0] : undefined;
    }
}

