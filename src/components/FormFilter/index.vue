<template>
  <div class="table-form-search-wrapper">
    <el-form
      class="form-search"
      :label-position="labelPosition"
      label-width="80px"
      :model="formValues"
    >
      <el-row
        v-for="(colItems, index) in vformItems"
        type="flex"
        :gutter="2"
        class="row-bg"
        justify="start"
        :key="index"
      >
        <el-col
          :class="{'btn-item-right':colItem.isBtn}"
          v-for="(colItem, colIndex) in colItems"
          v-bind="colItem.col"
          :key="colItem.itemProps.prop+''+colIndex"
        >
          <el-form-item
            :label="colItem.itemProps.label"
            :v-bind="getFormItemProps(colItem.itemProps)"
          >
            <search-btn
              v-if="colItem.isBtn"
              :showMoreBtn="advance"
              :openMore="openMore"
              :openClick="openClick"
              :searchClick="searchClick"
              :resetClick="resetClick"
            ></search-btn>
            <!-- <el-input v-else v-model="formValues[`${colItem.item.prop}`]"></el-input> -->
            <template v-else>
              <el-input
                v-if="colItem.item.type == 'text'"
                v-model="formValues[`${colItem.item.prop}`]"
                width="100%"
              ></el-input>
              <el-date-picker
                v-if="colItem.item.type == 'date'"
                width="100%"
                v-model="formValues[`${colItem.item.prop}`]"
              ></el-date-picker>
              <el-select
                v-if="colItem.item.type == 'select'"
                v-model="formValues[`${colItem.item.prop}`]"
              >
                <el-option
                  v-for="(opt, index) in colItem.item.dataSource"
                  v-bind="opt"
                  :value="opt.label"
                  :key="index"
                >{{opt.name}}</el-option>
              </el-select>
              <el-input-number
                v-if="colItem.item.type == 'number'"
                v-model="formValues[`${colItem.item.prop}`]"
              ></el-input-number>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import SearchBtn from "./SearchBtn";
import Input from "./item/Input";
import DatePicker from "./item/DatePicker";

const PLUGINS = {
  text: Input,
  date: DatePicker
};

const DEFAULT_COL_PROPS = {
  span: 8
};

export default {
  name: "FormFilter",
  props: {
    // 是否开启高级查询
    advance: {
      type: Boolean,
      default: true
    },
    formItems: {
      type: Array
    }
  },
  components: {
    SearchBtn
  },
  data() {
    return {
      labelPosition: "right",
      formValues: {},
      openMore: false
    };
  },
  created() {
    console.log("PLUGINS", PLUGINS);
  },
  computed: {
    inputItemProps(itemProps) {
      const props = { ...itemProps };
      return {};
    },

    vformItems() {
      const items = this.formItems;
      if (!items) {
        return [];
      }
      const openMore = this.openMore;

      const layoutFormItems = []; // {itemProps:{},item:{},col:{}}
      let oneRowColSpanSum = 0;
      let oneRowCols = [];
      (this.advance && openMore ? items.filter(i => i.advance != true) : items)
        .filter(i => !i.hide)
        .forEach((item, index, arr) => {
          const { col = {}, itemProps, type, ...other } = item;
          const colProps = Object.assign({}, DEFAULT_COL_PROPS, col);
          if (oneRowColSpanSum + colProps.span <= 24) {
            oneRowColSpanSum += colProps.span;

            const formItemProps = Object.assign({}, itemProps, {
              label: other.label
            });
            const inputProps = Object.assign({}, other);

            this.$set(inputProps, "component", PLUGINS[type] || PLUGINS.text);
            this.$set(inputProps, "type", type);
            // console.log('inputProps', inputProps)
            oneRowCols.push({
              itemProps: formItemProps,
              item: inputProps,
              col: colProps
            });

            if (arr.length == index + 1) {
              oneRowColSpanSum = 0;
              layoutFormItems.push(oneRowCols);
              oneRowCols = new Array();
            }
          } else {
            oneRowColSpanSum = 0;
            layoutFormItems.push(oneRowCols);
            oneRowCols = new Array();
          }
        });

      const lastArr = layoutFormItems[layoutFormItems.length - 1];
      // 计算还能填充一行么
      const totalSpan = lastArr.reduce((pv, cv, cIndex) => {
        return pv + cv.col.span;
      }, 0);

      // 内容不够 按钮来凑
      if (totalSpan + DEFAULT_COL_PROPS.span <= 24) {
        lastArr.push({
          isBtn: true,
          itemProps: {},
          item: {},
          col: Object.assign(
            { offset: 24 - (totalSpan + DEFAULT_COL_PROPS.span) },
            DEFAULT_COL_PROPS
          )
        });
      } else {
        layoutFormItems.push([
          {
            isBtn: true,
            itemProps: {},
            item: {},
            col: Object.assign(
              { offset: 24 - DEFAULT_COL_PROPS.span },
              DEFAULT_COL_PROPS
            )
          }
        ]);
      }

      return layoutFormItems;
    }
  },
  methods: {
    // 处理 FormItem 属性
    getFormItemProps(formItem) {
      return formItem;
    },
    // 处理 Input的属性
    getFormInputItemProps(formItem) {
      return { prop: formItem.prop };
    },
    // 高级查询
    openClick() {
      this.openMore = !this.openMore;
    },
    // 查询按钮
    searchClick() {
      console.log("formValues", this.formValues);
      this.$emit("on-submit", this.formValues);
    },
    // 重置按钮
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
  margin: 4px 0;
  padding: 6px 0 0px 0;
  & > .form-search {
    padding: 0 14px;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 10px;
  }
}
.btn-item-right {
  text-align: right;
}
.el-form-item__content{
  .el-select,
  .el-input-number,
  .el-input{
    width:100%;
  }
}
</style>
