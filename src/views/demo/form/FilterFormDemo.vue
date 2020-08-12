<template>
    <div class="table-form-search-wrapper">
        <el-form :label-position="labelPosition" label-width="80px" :model="formValues">
            <el-row type="flex" :gutter="2" class="row-bg" justify="space-between">
                <el-col :span="6">
                    <el-form-item label="名称">
                        <el-input v-model="formValues.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="邮箱">
                        <el-input v-model="formValues.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="地址">
                        <el-input v-model="formValues.addr"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="!openMore">
                    <search-btn
                        :openMore="openMore"
                        :openClick="openClick"
                        :searchClick="searchClick"
                        :resetClick="resetClick"
                    ></search-btn>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="end" v-if="openMore">
                <el-col :span="6">
                    <search-btn
                        :openMore="openMore"
                        :openClick="openClick"
                        :searchClick="searchClick"
                        :resetClick="resetClick"
                    ></search-btn>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import SearchBtn from "@/components/FormFilter/SearchBtn";
export default {
  name: "FormPage",
  props: {
    // onSubmit: {
    //   type: Function,
    //   default: param => {}
    // }
  },
  components: {
    SearchBtn
  },
  data() {
    return {
      labelPosition: "right",
      formValues: {},
      formItems: [
        {
          label: "名称",
          prop: "name",
          type: "text",
          itemProps: {},
          col: {}
        },
        {
          label: "年龄",
          prop: "age",
          type: "text",
          itemProps: {},
          col: {}
        },
        {
          label: "邮箱",
          prop: "email",
          type: "text",
          itemProps: {},
          col: {}
        },
        {
          label: "创建时间",
          prop: "createdTime",
          type: "date",
          itemProps: {},
          col: {}
        }
      ],
      count: 4,
      openMore: false
    };
  },
  created() {
    console.log("this", this);
    const ab = this.$slots.default.map(node => {
      return this.$createElement("el-col", {}, [node]);
    });
    this.$slots.default = ab;
    console.log("ab", ab);
  },
  render() {
    console.log("1111", 1111);
    return 1;
  },
  computed: {
    render() {
      console.log("1111", 1111);
      return 1;
    }
    // vformItems(){
    //     const items = this.formItems;
    //     if(!!items){
    //         return [];
    //     }
    //     const layoutFormItems = [];// {item:{},col:{}}
    //     let rowNum = 1; //Math.floor((items.length+1)/this.count);
    //     let span = 0;
    //     items.forEach(item=>{
    //         const {col,...other} = item;
    //         layoutFormItems.push({
    //             item:Object.assign({},other),
    //             col:col||{},
    //         });
    //     })
    //     return layoutFormItems;
    // }
  },
  methods: {
    clickSearch() {},
    openClick() {
      this.openMore = !this.openMore;
    },
    searchClick() {
      console.log("formValues", this.formValues);
      this.$emit("on-submit", this.formValues);
    },
    resetClick() {
      this.formValues = {};
      this.$emit("on-submit", {});
    }
  }
};
</script>

<style lang="scss">
.table-form-search-wrapper {
  background: #f9f4f4;
  margin: 10px 0;
  padding: 10px 0 0px 0;
}
</style>
