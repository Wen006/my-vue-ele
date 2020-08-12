<template>
  <div>
    <look-up-table
      ref="lookUpTable"
      :title="title"
      :formItems="formItems"
      :columns="columns"
      :disabled="disabled"
      :selection="selection"
      @on-ok="onOk"
      @on-cancel="onCancel"
      :fetchData="fetchData"
    ></look-up-table>
    <el-input
      @mouseup.native="clickInput"
      v-show="true"
      :readonly="true"
      :disabled="disabled"
      :placeholder="disabled?'不可修改':'点击选择'"
      v-model="inputValue"
      class="input-with-select"
    >
      <i
        @mouseenter="iconHoverable = true"
        @mouseleave="iconHoverable = false"
        class="el-icon-search el-input__icon"
        :class="'el-icon-'+(showClearIcon?'close':'search')+' el-input__icon lookup-input-icon'"
        slot="suffix"
        @click="handleIconClick"
      ></i>
    </el-input>
  </div>
</template>

<script>
import LookUpTable from "./LookUpTable";
import Btn from "@/components/Btn";

export default {
  name: "InputLookUp",
  components: {
    LookUpTable,
    Btn
  },
  props: {
    selection: {
      type: String, //['selection'|'single']
      default: "selection"
    },
    title: {
      type: String,
      default: "请选择"
    },
    formItems: {
      type: Array
    },
    columns: {
      type: Array
    },
    fetchData: {
      type: Function
    },
    value: {
      type: String
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: "",
      iconHoverable: false
    };
  },
  created() {
    this.inputValue = this.value;
  },
  methods: {
    show() {
      this.$refs.lookUpTable.show();
    },
    hide() {
      this.$refs.lookUpTable.hide();
    },
    onOk(rows) {
      this.$emit("on-ok", rows);
      this.$refs.lookUpTable.hide();
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    clickInput(e) {
      if (this.iconHoverable && this.inputValue != "") {
        this.setInputValue("");
      } else {
        this.show();
      }
    },
    setInputValue(value) {
      this.inputValue = value;
      this.$emit("input", value);
    },
    handleIconClick() {
      this.iconHoverable = !this.iconHoverable;
    }
  },
  computed: {
    showClearIcon() {
      if (this.iconHoverable) {
        if (!this.inputValue || this.inputValue == "") {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    value(a, b) {
      if (a != b) {
        this.inputValue = a;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.lookup-input-icon,
.input-with-select {
  cursor: pointer;
}
</style>
