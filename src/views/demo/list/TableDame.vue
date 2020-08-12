<template>
    <v-table
        :columnType="columnType"
        :data="data"
        :columns="columns"
        @select="select"
        @sort-change="sortChange"
        @tableCurrentChange="tableCurrentChange"
        :default-sort="{prop: 'date', order: 'descending'}"
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
        { name: "张三1", email: "zs@qq.com", city: "nj" },
        { name: "张三2", email: "zs@qq.com", city: "nj" },
        { name: "张三3", email: "zs@qq.com", city: "nj" },
        { name: "张三4", email: "zs@qq.com", city: "nj" }
      ],
      columnType: ["selection", "index"],

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
        },
        {
          label: "地址",
          prop: "addr"
        },
        {
          label: "创建时间",
          prop: "createdDate"
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
    },
    tableCurrentChange(a, b) {
      console.log("a,b,", a, b);
    }
  }
};
</script>

<style lang="less">
</style>
