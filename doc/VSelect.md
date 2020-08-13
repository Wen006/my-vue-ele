---
name: v-select
---

[TOC]

# 下拉选择VSelect

基于el-select封装

- 数据生成下拉

  

### 使用场景

下拉选择多选或者单选

### 如何使用

```vue
<template>
  <div>
    <v-select v-model="selectVal" :dataSource="dataSource"></v-select>
    <v-select multiple v-model="selectVals" :dataSource="dataSource"></v-select>
  </div>
</template>
<script>
import VSelect from "@/components/FormMark/VSelect";
export default {
  name: "Demo",
  components: {
    VSelect
  },
  props: {},
  data() {
    return {
      selectVal: "",
      selectVals: [],
      dataSource: [
        { name: "篮球", value: "1" },
        { name: "足球", value: "2" },
        { name: "羽毛球", value: "3" }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

```

### 引入方式

```javascript
import VSelect from "@/components/FormMark/VSelect";
```

### 组件使用

#### 属性

> 直接写到标签上 
>
> ```js
> <v-table :columns="[]" />
> ```

| 参数          | 说明                                    | 类型  | 默认值 |
| ------------- | --------------------------------------- | ----- | ------ |
| dataSource    | 每个选择向属性 【数据字典+el-item属性】 | Array | -      |
| value/v-modal | 值                                      | Array | -      |
| 其他          | element 官网el-select                   |       | -      |

##### dataSource

| 属性  | 说明                          | 类型   |
| ----- | ----------------------------- | ------ |
| name  | 标签显示名称                  | String |
| value | 属性值                        | String |
| 其他  | element 官网el-select-options | String |

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
><v-table @change="change" />
>```

| 名称   | 参数          | 说明                        | 默认 |
| ------ | ------------- | --------------------------- | ---- |
| change | valArr,rowArr | 选择的项目 值，和当前行对象 | -    |
| 其他   |               | 查看element官网             | -    |

