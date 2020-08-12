---
name: data-table
---

[TOC]

# 通用DataTable

基于v-table封装

- 封装选择
- 封装ajax请求数据交互
- 翻页逻辑

### 使用场景

后台数据翻页展示

### 如何使用

```vue
<template>
    <div class="table-form-page">
        <form-filter advance :formItems="formItems" @on-submit="submit"></form-filter>
        <data-table columnType="selection" ref="demoTable" :columns="columns" :fetchData="fetchData" />
    </div>
</template>

<script>
import DataTable from "@/components/Table/DataTable";
import FormFilter from "@/components/FormFilter";

export default {
  name: "Table",
  components: {
    DataTable,
    FormFilter
  },
  data() {
    return {
      formItems: [
        {
          label: "名称",
          prop: "name",
          type: "text",
          itemProps: {}
        }
      ],
      columns: [
        {
          label: "名称",
          prop: "name"
        },
        {
          label: "邮件",
          prop: "email"
        },
        {
          label: "创建时间",
          prop: "createdDate",
          formatter: function(row, column, cellValue, index) {
            return "日期： " + cellValue;
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    submit(formVal) {
      this.$refs.demoTable.submit(formVal);
    },
    /** 请求方法*/
    async fetchData(queryParam) {
      const { data, code } = await this.api.callRpc({
        key: "sm.user.list",
        param: queryParam,
        query: queryParam
      });
      const { list, total } = data;
      return { list, total };
    }
  },
  mounted() {
    this.$nextTick(() => { // 页面加载完就请求
      this.$refs.demoTable.submit({});
    });
  }
};
</script>

<style lang="scss">
</style>
```

### 引入方式

```javascript
import DataTable from "@/components/Table/DataTable";
```

### 组件使用

#### 属性

> 属性和v-table 一样
>
> ```js
> <data-table :columns="[]" />
> ```

| 参数    | 说明             | 类型  | 默认值 |
| ------- | ---------------- | ----- | ------ |
| columns | 列属性>查看官网  | Array | -      |
| 其他    | 和v-table 差不多 |       | -      |



#### 方法

> 通过ref引用 
>
> ```js
> <data-table ref="tableRef" ... />
> 
> <script>
>   ...
> 		this.$refs.tableRef.submit();
> 	...
> <script>
> ```
>
> 

| 名称         | 参数       | 说明       | 默认 |
| ------------ | ---------- | ---------- | ---- |
| submit       | queryParam | 提交查询   | {}   |
| getSelectRow | -          | 获取选择行 | -    |
| clearSelect  | -          | 清除选择   | -    |

#### 事件

>当属性传入 其他事件可以参考element官网
>
>```js
><v-table @tableCurrentChange="tableCurrentChange" />
>```

| 名称                  | 参数                                               | 说明                            | 默认 |
| --------------------- | -------------------------------------------------- | ------------------------------- | ---- |
| tableCurrentChange    | newRecored,oldRecord                               | 当前列表单选回调                | -    |
| fetchData             | `queryParam`查询条件，返回`{list:[],total:number}` | 调用后台的方法Promise｜function | -    |
| handleSelectionChange | selectRows 选择的结果                              | 选择回调                        | -    |
| 其他                  |                                                    | 查看v-table和element官网        | -    |

