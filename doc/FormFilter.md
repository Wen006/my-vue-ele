---
name: form-filter
---

[TOC]

# 通用查询表单

通用查询表单，解决简单列表查询的。如果复杂的建议直接用element的做

- 布局 
- 高级和简单查询
- 按钮和回撤查询
- 输入框 json 生成

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
import FormFilter from "@/components/FormFilter";
```

### 组件使用

#### 属性

> 属性和v-table 一样
>
> ```js
> <form-filter advance  />
> ```

| 参数      | 说明             | 类型    | 默认值 |
| --------- | ---------------- | ------- | ------ |
| formItems | 输入框配置       | Array   | -      |
| advance   | 是否开启高级查询 | Boolean | false  |
| 其他      |                  |         | -      |

##### formItems

| 属性       | 说明                                            | 类型    | 默认值 |
| ---------- | ----------------------------------------------- | ------- | ------ |
| label      | 标签显示名称                                    | String  | -      |
| prop       | 属性name                                        | String  | -      |
| type       | 输入框类型[text\|date\|select\|checkbox\|input] | String  | text   |
| advance    | 是否为高级查询项目                              | Boolean | -      |
| hide       | 隐藏                                            | Boolean | false  |
| dataSource | 当type为select\|checkbox                        | Array   | []     |
|            | 其他参考element官网                             |         |        |
| itemProps  | 对于el-form-item 配置                           |         |        |
|            | 详情查看官网                                    |         |        |
|            |                                                 |         |        |
| col        | 对于el-col配置                                  |         |        |
|            | 详情查看官网                                    |         |        |
| 其他       |                                                 |         | -      |



#### 方法

> 通过ref引用 
>
> ```js
> <form-filter ref="filterRef" ... />
> 
> <script>
>     ...
> 		this.$refs.filterRef.resetClick();
> 	...
> <script>
> ```
>

| 名称       | 参数 | 说明       | 默认 |
| ---------- | ---- | ---------- | ---- |
| openClick  | -    | 提交查询   | {}   |
| resetClick | -    | 重置       |      |
| getFormVal | -    | 获取表单值 |      |
| 其他       | -    |            | -    |

#### 事件

>当属性传入 其他事件可以参考element官网
>
>```js
><v-table @on-submit="onSubmit" />
>```

| 名称      | 参数             | 说明             | 默认 |
| --------- | ---------------- | ---------------- | ---- |
| on-submit | formValue 表单值 | 表单提交出发回调 | -    |
| 其他      |                  |                  | -    |

