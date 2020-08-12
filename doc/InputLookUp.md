---
name: input-look-up

---

[TOC]

# 输入框弹框选择

表单弹框

- input + LookUpTable
- 可现实可清除
- 可清除

### 使用场景

想要通过弹框选择要取的值

### 如何使用

```vue
   <input-look-up
      ref="domRef"
      selection="single"
      title="选择报账用户"
      v-model="inputValue"
      :formItems="formItems"
      :columns="columns"
      @on-ok="onOk"
      :disabled="false"
      @on-cancel="onCancel"
      @fetchData="fetchData"
    ></input-look-up>
```

### 引入方式

```javascript
import InputLookUp from "@/components/LookUp/InputLookUp";
```

### 组件使用

#### 属性

> ```js
> <input-look-up title="选择用户" />
> ```

| 参数                | 说明                     | 类型    | 默认值 |
| ------------------- | ------------------------ | ------- | ------ |
| title               | 标题                     | Array   | -      |
| selection           | 单选和多选 single｜mulit | Boolean | 多选   |
| formItems           | 查看FormFilter           | Array   |        |
| columns             | 查看DataTable            | Array   |        |
| disabled            | 禁用                     | Boolean |        |
| v-model             | 绑定的值                 | String  | -      |
| 其他查看LookUpTable |                          |         | -      |
|                     |                          |         |        |

#### 方法

> 通过ref引用 
>
> ```js
> <look-up-table ref="domRef" ... />
> 
> <script>
> ...
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
| 其他      |                                                     | 查看FormFilter 和 LookUpTable    | -    |

