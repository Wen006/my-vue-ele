---
name: v-radio
---

[TOC]

# 单择VRadio

基于el-radio封装

- radio
- button
- json schema

### 使用场景

下拉选择多选或者单选

### 如何使用

```vue
<template>
  <div>
    <v-radio v-model="value" :dataSource="dataSource" @change="valChange"></v-radio>
    <v-radio type="button" v-model="value" :dataSource="dataSource" @change="valChange"></v-radio>
  </div>
</template>

<script>
import VRadio from "@/components/FormMark/VRadio";
  
export default {
  name: "FormDemo",
  components: {
    VRadio
  },
  props: {},
  data() {
    return {
      value: "1",
      dataSource: [
        { name: "篮球", value: "1" },
        { name: "足球", value: "2" },
        { name: "羽毛球", value: "3" }
      ]
    };
  },
  computed: {},
  methods: {
    /**回调 */
    valChange(values, rows) {
      console.log("values,rows", values, rows);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

```

### 引入方式

```javascript
import VRadio from "@/components/FormMark/VRadio";
```

### 组件使用

#### 属性

> 直接写到标签上 
>
> ```js
> <v-radio v-model="value" />
> ```

| 参数          | 说明                                    | 类型   | 默认值 |
| ------------- | --------------------------------------- | ------ | ------ |
| dataSource    | 每个选择向属性 【数据字典+el-item属性】 | Array  | -      |
| value/v-modal | 值                                      | Array  | -      |
| type          | 类型 button｜radio                      | String | radio  |
| 其他          | element 官网el-radio-group              |        | -      |

##### dataSource

| 属性  | 说明                                  | 类型           |
| ----- | ------------------------------------- | -------------- |
| name  | 标签显示名称                          | String         |
| value | 属性值                                | String         |
| 其他  | element 官网el-radio-button｜el-radio | el-radioString |

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
><v-radio @change="change" />
>```

| 名称   | 参数          | 说明                        | 默认 |
| ------ | ------------- | --------------------------- | ---- |
| change | valArr,rowArr | 选择的项目 值，和当前行对象 | -    |
| 其他   |               | 查看element官网             | -    |

