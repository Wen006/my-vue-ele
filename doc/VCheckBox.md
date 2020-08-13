---
name: v-check-box
---

[TOC]

# 下拉选择VCheckbox

基于el-checkbox封装

单选直接用官网的

- 多选

- datasource 数据字典

  

### 使用场景

下拉选择多选或者单选

### 如何使用

```vue
<template>
  <div> 
    <v-check-box v-model="boxVal" :dataSource="dataSource"></v-check-box>
    <v-check-box v-model="boxVal" :dataSource="dataSource" type="button"></v-check-box>
  </div>
</template>


<script> 
import VCheckBox from "@/components/FormMark/VCheckBox"; 

export default {
  name: "FormDemo",
  components: { 
    VCheckBox, 
  },
  props: {},
  data() {
    return {
      boxVal: ["1"],
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
import VCheckBox from "@/components/FormMark/VCheckBox"; 
```

### 组件使用

#### 属性

> 直接写到标签上 
>
> ```js
> <v-check-box v-model="boxVal"></v-check-box>
> ```

| 参数          | 说明                                    | 类型   | 默认值 |
| ------------- | --------------------------------------- | ------ | ------ |
| dataSource    | 每个选择向属性 【数据字典+el-item属性】 | Array  | -      |
| value/v-modal | 值                                      | Array  | -      |
| type          | 类型 button｜box                        | String | box    |
| 其他          | element 官网el-checkbox-group           |        | -      |

##### dataSource

| 属性  | 说明                                        | 类型   |
| ----- | ------------------------------------------- | ------ |
| name  | 标签显示名称                                | String |
| value | 属性值                                      | String |
| 其他  | element 官网el-checkbox-button\|el-checkbox | String |

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
><v-check-box @change="change" />
>```

| 名称   | 参数          | 说明                        | 默认 |
| ------ | ------------- | --------------------------- | ---- |
| change | valArr,rowArr | 选择的项目 值，和当前行对象 | -    |
| 其他   |               | 查看element官网             | -    |

