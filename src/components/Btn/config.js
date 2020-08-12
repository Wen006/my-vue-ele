/**
 * 通用按钮： 系统中所有可用到的按钮在这里统一管理维护
 * - 国际化
 * - 说明
 * - 图标
 * - 类型
 * - 尺寸
 * ... 
 * @author wennn
 */

// 尺寸
const sizes = ['medium', 'small', 'mini'];
// 类型
const types = ['primary', 'success', 'warning', 'danger', 'info', 'text']
// 与 buttonItems的value对应
const pKeys = ["label", "icon", "type", "size", "other"]
// 使用属性 <Btn name=""></Btn>
// 对应属性 name:"label|icon|type|size|other"
const buttonItems = {
    "save": "保存|edit|0|2",
    "new": "新增|edit|0|2",
    "edit": "编辑|edit|2|2",
    "update": "修改|edit|2|2",
    "audit": "审批|edit|2|2",
    "submit": "提交|edit|2|2",
    "delete": "删除|delete|3|2",
    "search": "查询|search|4|2",
    "reset": "重置|search|2|2",
    "agree": "同意|edit|1|2",
    "disagree": "不同意｜edit|2|2",
    "sure": "确认|edit|1|2",
    "cancel": "取消|edit|2|2",
}

// 缓存处理好的按钮
const btnMap = {
    upload: {
        locale: '',
        name: '上传',
        icon: 'el-icon-upload',
        type: 'primary',
    }
}

/**
 * 获取按钮配置
 * @param {<Btn name=""></Btn>} name 
 */
export function getBtnInfo(name) {
    if (btnMap[name]) {
        return btnMap[name];
    } else if (buttonItems[name]) {
        btnMap[name] = {};
        const props = buttonItems[name].split("|");
        pKeys.forEach((pk, index) => {
            if (props[index]) {
                switch (pk) {
                    case 'size':
                        btnMap[name][pk] = sizes[props[index]]
                        break;
                    case 'type':
                        btnMap[name][pk] = types[props[index]]
                        break;
                    default:
                        btnMap[name][pk] = props[index]
                        break;
                }
            }
        })
        // 默认国际化 app.btn.[name]
        btnMap[name].locale = "app.btn." + name;
        return btnMap[name];
    } else {
        console.warn(
            "按钮name='" + name + "' 不存在，建议配置到 Btn/config.js"
        );
        return {}
    }
}  