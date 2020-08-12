---
name: look-up-table
---

[TOC]

# 通用弹框选择

弹出弹框列表选择，可移动，可放大

- 弹框 + 表单（FormFilter）+ 列表查询（DataTable）

### 使用场景

想要通过弹框选择要取的值

### 如何使用

```vue
    <look-up-table
      title="选择用户"
      ref="lookUpRef"
      selection="single"
      :formItems="formItems"
      :columns="columns"
      @on-ok="onOk"
      :disabled="false"
      @on-cancel="onCancel"
      :fetchData="fetchData"
    >
      <btn name="search">我是占位符点击我弹出来</btn>
    </look-up-table>
```

### 引入方式

```javascript
import LookUpTable from "@/components/LookUp/LookUpTable";
```

### 组件使用

#### 属性

> ```js
><look-up-table title="选择用户" />
> ```

| 参数      | 说明                     | 类型    | 默认值 |
| --------- | ------------------------ | ------- | ------ |
| title     | 标题                     | Array   | -      |
| selection | 单选和多选 single｜mulit | Boolean | 多选   |
| formItems | 查看FormFilter           | Array   |        |
| columns   | 查看DataTable            | Array   |        |
| disabled  | 禁用                     | Boolean |        |
|           |                          |         |        |
| 其他      |                          |         |        |
|           |                          |         |        |

#### 方法

> 通过ref引用 
>
> ```js
> <look-up-table ref="domRef" ... />
> 
> <script>
>   ...
> 		this.$refs.domRef.show();
> 	...
> <script>
> ```

| 名称       | 参数 | 说明     | 默认 |
| ---------- | ---- | -------- | ---- |
| show       | -    | 显示弹框 | -    |
| hide       | -    | 隐藏弹框 | -    |
| switchFull | -    | 切换全屏 | -    |
| 其他       |      |          | -    |

#### 事件

>当属性传入 其他事件可以参考element官网
>
>```js
><look-up-table @on-ok="onSubmit" />
>```

| 名称      | 参数                                                | 说明                             | 默认 |
| --------- | --------------------------------------------------- | -------------------------------- | ---- |
| on-ok     | selectRows选择的行数组                              | 点击确定双击行回调               | -    |
| on-cancel | -                                                   | 点击取消                         | -    |
| fetchData | `queryParam`查询条件，返回`{list:[],total:number}`- | 调用后台的方法Promise｜function- | -    |
| 其他      |                                                     | 查看FormFilter 和 DataTable      | -    |

