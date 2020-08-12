---
name: v-table
---

[TOC]

# 通用VTable

基于el-table封装

- 翻页组件+列表
- 选择+下标
- 统一格式化模版
- columns 基于json

### 使用场景

表格简单展示，和翻页

### 如何使用

```vue
<template>
    <v-table
        :columnType="columnType"
        :data="data"
        :columns="columns"
    ></v-table>
</template>

<script>
import VTable from "@/components/Table/VTable";
  
export default {
  components: {
    VTable
  },
  data() {
    return {
      data: [
        { name: "张三", email: "zs@qq.com", city: "nj" }
      ],
      columnType: ["selection", "index"], // selection 复选框 ，index 下标
      columns: [
        {
          sortable: true,
          label: "名称",
          prop: "name"
        },
        {
          label: "邮件",
          prop: "email",
          align: "right"
        },
        {
          label: "城市",
          prop: "city"
        }
      ]
    };
  },
  created() {},
  methods: {
    select(selectRows) {
      console.log("selectRows", selectRows);
    },
    sortChange(sortInfo) {
      console.log("sortInfo", sortInfo);
    }
  }
};
</script>
<style lang="less">
</style>
```

### 引入方式

```javascript
import VTable from "@/components/Table/VTable";
```

### 组件使用

#### 属性

> 直接写到标签上 
>
> ```js
> <v-table :columns="[]" />
> ```

| 参数       | 说明                       | 类型          | 默认值               |
| ---------- | -------------------------- | ------------- | -------------------- |
| columns    | 列属性>查看官网            | Array         | -                    |
| data       | 数据>查看官网              | Array         | -                    |
| columnType | 列类型[序号、复选框、展开] | String\|Array | -                    |
| offset     | 下边距                     | Number        | 60                   |
| pageSizes  | 翻页大小                   | Array[Number] | [50, 100, 500, 1000] |
| pagination | 分页开关                   | Boolean       | false                |
| pageSize   | 翻页大小                   | Number        | 50                   |
| pageNo     | 当前页                     | Number        | 1                    |
| total      | 0                          | Number        | 0                    |
| 其他       | 查看ele 官网               |               | -                    |

##### columns

| 属性  | 说明                                                      | 类型   | 默认值 |
| ----- | --------------------------------------------------------- | ------ | ------ |
| label | 标签显示名称                                              | String | -      |
| prop  | 属性name                                                  | String | -      |
| align | 显示位置 left\|center\|right                              | String | Left   |
| type  | 显示类型text\|img\|progress\|button\|input\|link\|dynamic | String | Text   |
| 其他  | 详情查看官网                                              |        | -      |

#### 方法

> 通过ref引用
>
> ```js
> <v-table ref="tableRef" ... />
> 
> <script>
>   ...
> 		this.$refs.tableRef.clearSelection();
> 	...
> <script>
> ```
>
> 

| 名称           | 参数 | 说明     | 默认 |
| -------------- | ---- | -------- | ---- |
| clearSelection | -    | 清空选择 | -    |
| 其他           |      |          | -    |

#### 事件

>当属性传入 其他事件可以参考element官网
>
>```js
><v-table @tableCurrentChange="tableCurrentChange" />
>```

| 名称               | 参数                 | 说明            | 默认 |
| ------------------ | -------------------- | --------------- | ---- |
| tableCurrentChange | newRecored,oldRecord | 当前列表单选    | -    |
| currentChange      | val                  | 当前页          | -    |
| 其他               |                      | 查看element官网 | -    |

