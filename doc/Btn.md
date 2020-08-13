---
name: btn
---

[TOC]

# 通用按钮

统一配置按钮 @/components/Btn/config.js

基于el-button封装

- 国际化

- 图标类型和颜色

- json schema

  

### 使用场景

下拉选择多选或者单选

### 如何使用

```vue
<template>
	<btn name="save"></btn>
</template>

<script>
import Btn from '@/components/Btn'
  
export default {
    name:"ButtonDemo",
    components:{
        Btn
    },
    data(){},
    created(){ }
}
</script>

<style lang="scss" scoped>
</style>

```

### 引入方式

```javascript
import Btn from '@/components/Btn'
```

### 组件使用

在@/components/Btn/config.js 配置所需的按钮通过name获取

#### 属性

> 直接写到标签上 
>
> ```js
> <btn name="value" />
> ```

| 参数 | 说明                                       | 类型   | 默认值  |
| ---- | ------------------------------------------ | ------ | ------- |
| name | 在@/components/Btn/config.js配置的按钮名称 | String | default |
| 其他 | element 官网el-button                      |        | -       |

##### 

#### 方法

> 通过ref引用
>
> ```js
> 
> ```
> 

| 名称 | 参数 | 说明 | 默认 |
| ---- | ---- | ---- | ---- |
| 其他 |      |      | -    |

#### 事件

>当属性传入 其他事件可以参考element官网
>
>```js
><btn name="save" @click="func" />
>```

| 名称  | 参数 | 说明                     | 默认 |
| ----- | ---- | ------------------------ | ---- |
| click |      | 点击时间                 | -    |
| 其他  |      | 查看element官网el-button | -    |

