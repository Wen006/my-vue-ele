<template>
    <div class="table-form-page">
        <form-filter advance :formItems="formItems" @on-submit="submit"></form-filter>
        <data-table columnType="selection" ref="demoTable" :columns="columns" :fetchData="fetchData"></data-table>
    </div>
</template>

<script>
import DataTable from "@/components/Table/DataTable";
import FormFilter from "@/components/FormFilter";

export default {
  name: "demo",
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
        },
        {
          label: "地区",
          prop: "area",
          type: "select",
          dataSource:[
            {name:'1name',label:'1label'},
            {name:'2name',label:'2label'},
          ],
          itemProps: {}
        },
        {
          label: "年龄",
          prop: "age",
          type: "number",
          itemProps: {},
          col: {}
        },
        {
          label: "创建时间",
          prop: "createdTime",
          type: "date",
          advance: true,
          itemProps: {},
          col: {}
        },
        {
          label: "创建时间1",
          prop: "createdTime1",
          type: "date",
          advance: true,
          // hide: true,
          itemProps: {},
          col: {}
        },
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
          label: "城市",
          prop: "city"
        },
        {
          label: "地址",
          prop: "addr"
        },
        {
          label: "创建时间",
          prop: "createdDate",
          formatter: function(row, column, cellValue, index) {
            return "日期： " + cellValue;
          }
        }
      ].map(i => {
        return {
          //   ...i,
          columnsProps: i
        };
      })
    };
  },
  created() {},
  methods: {
    submit(formVal) {
      this.$refs.demoTable.submit(formVal);
    },
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
    this.$nextTick(() => {
      console.log("this.$refs.demoTable", this.$refs.demoTable);
      this.$refs.demoTable.submit();
    });
  }
};
</script>


<style lang="scss">
.table-form-page {
}
</style>

