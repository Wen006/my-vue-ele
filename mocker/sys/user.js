const dao = require("../util/dao.util");
const { writeOk, writeFail, toProxy } = require("../util/mock.util");

const adminUser = {
    name: "admin",
    password: "admin123",
    nickName: "零点",
    age: 18,
    avatar:"http://www.wennn.top:8802/static/images/tx.jpg",
    addr: "中国南京",
    email: "1432316105@qq.com"
}

dao.saveOrUpdate("sm_user", adminUser);

const sessions = {}

function getFreshTime() {
    return +new Date() + 1000 * 30 * 60;
}


const arr = [
    {
        url: '/checklogin',
        method: 'post',
        result: function (req, res) {
            const header = req.headers;
            const lang = header['accept-language'];
            const host = header['host'];
            if (sessions[host]) {
                if (sessions[host].time < +new Date()) {
                    writeFail(res, "Session过期");
                    delete sessions[host];
                } else {
                    writeOk(res, sessions[host].curUser)
                    sessions[host].time = getFreshTime();
                }
                return;
            }
            writeFail(res, "用户未登陆");
        }
    },
    {
        url: "/login",
        method: "POST",
        result: function (req, res) {
            const { username, password, vercode } = { ...req.query, ...req.body }
            const header = req.headers
            const lang = header['accept-language'];
            const host = header['host'];

            if (!username || !password) {
                writeFail(res, "用户名和密码不能为空");
                return
            }
            const ds = dao.selectDb("sm_user");
            let curUser;
            ds.some(u => {
                if (u.name == username && u.password == password) {
                    curUser = u;
                    return true;
                }
                return false;
            })
            if (curUser) {
                const token = "Token"+getFreshTime();
                sessions[host] = {
                    curUser,
                    time: getFreshTime()
                }; 
                return writeOk(res, token);
            }
            writeFail(res, "用户或密码不正确");
        }
    },
    {
        url: "/logout",
        method: 'post',
        result: function (req, res) {
            const header = req.headers
            const lang = header['accept-language'];
            const host = header['host'];
            if (sessions[host]) {
                delete sessions[host];
            }
            return writeOk(res, '退出成功');
        }
    },
    {
        url:"/captchaImage",
        method:"get",
        result:{
            "msg": "操作成功",
            "img": "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",
            "code": 200,
            "uuid": "563052b36897476e9c1dedfcad78bb0d"
        }
    }

]

module.exports=arr;