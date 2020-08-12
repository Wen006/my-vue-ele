---
name: LookUp
---

# 弹框选择

## prop

selection=[single,multiple]
formItem
columns
title

## callback

afterShow
onOk
onCancel

## api

show([param])
hide()
reset()

操作列显示

### 使用场景

弹框选择数据

### 如何使用

```javascript

```

### 引入方式

```javascript
import Act from 'plugins'
```

### 组件使用

#### Act

| 参数    | 说明         | 类型   | 默认值 |
| ------- | ------------ | ------ | ------ |
| maxShow | 最大显示项目 | number | 2      |

#### Act.Item

| 参数      | 说明      | 类型    | 默认值 |
| --------- | --------- | ------- | ------ |
| onClick   | 点击事件  | number  | -      |
| className | className | string  | -      |
| disabled  | 是否禁用  | boolean | false  |

`Act.children`这是针对所有被Act 包含到直系子标签

| 参数   | 必填 | 说明                                | 类型    | 默认值 |
| ------ | ---- | ----------------------------------- | ------- | ------ |
| hidden |      | 是否隐藏                            | boolean | false  |
| key    | ✅    | 唯一key，这个必须唯一，否则页面出错 | string  | -      |
