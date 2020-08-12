<template>
  <div>
    <look-up-table
      v-if="false"
      ref="lookUpRef"
      title="选择用户"
      selection="single"
      :formItems="formItems"
      :columns="columns"
      @on-ok="onOk"
      :disabled="false"
      @on-cancel="onCancel"
      :fetchData="fetchData"
    >
      <btn name="search"></btn>
    </look-up-table>
    <input-look-up
      v-else
      ref="lookUpRef"
      selection="single"
      title="选择报账用户"
      v-model="inputValue"
      :formItems="formItems"
      :columns="columns"
      @on-ok="onOk"
      :disabled="false"
      @on-cancel="onCancel"
      :fetchData="fetchData"
    ></input-look-up>
    {{selectRecords.map(i=>i.name).join(",")}}
  </div>
</template>

<script>
import Btn from "@/components/Btn";
import LookUpTable from "@/components/LookUp/LookUpTable";
import InputLookUp from "@/components/LookUp/InputLookUp";

export default {
  name: "LookUp",
  components: {
    Btn,
    LookUpTable,
    InputLookUp
  },

  data() {
    return {
      inputValue: "",
      selection: "selection",
      title: "选择",
      selectRecords: [],
      formItems: [
        {
          label: "名称",
          prop: "name",
          type: "text",
          itemProps: {}
        },
        {
          label: "年龄",
          prop: "age",
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
          label: "城市",
          prop: "city"
        }
      ]
    };
  },
  methods: {
    /** 双击或者点击ok回调 选择调行 */
    onOk(rows) {
      this.selectRecords = rows;
      this.inputValue = rows.map(i => i.name).join(",");
      this.$refs.lookUpRef.hide();
    },
    /** 取消回调 */
    onCancel() {
      console.log("22222", 22222);
    },
    /** 列表查询函数 */
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
  computed: {},
  mounted() {}
};
</script>
<style lang="scss">
</style>
