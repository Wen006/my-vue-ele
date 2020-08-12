<template>
  <div>
    <el-dialog
      :append-to-body="true"
      width="80%"
      :fullscreen="fullscreen"
      :visible.sync="dialogTableVisible"
      @opened="opened"
      v-dialogDrag
    >
      <template slot="title" class="el-dialog__header">
        <span class="el-dialog__title">{{title}}</span>
        <svg class="svg-icon svg-icon-full" @click="switchFull">
          <use v-show="fullscreen" xlink:href="#icon-exit-fullscreen"></use>
          <use v-show="!fullscreen" xlink:href="#icon-fullscreen"></use>
        </svg>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </template>
      <form-filter :advance="false" :formItems="formItems" @on-submit="submit"></form-filter>
      <data-table
        :offset="fullscreen?86:160"
        :columnType="selection=='single'?'index':'selection'"
        ref="demoTable"
        :columns="columns"
        :fetchData="fetchData"
        @row-dblclick="dblClickRow"
        @selectionChange="selectionChange"
      ></data-table>
      
      <div slot="footer">
        <btn name="sure" :disabled="selectRows.length <= 0" @click="onClickOk"></btn>
        <btn name="cancel" @click="onClickCancel"></btn>
      </div>
    </el-dialog>
    
    <span @click="show">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import DataTable from "@/components/Table/DataTable";
import FormFilter from "@/components/FormFilter";
import Btn from "@/components/Btn";

export default {
  name: "LookUpTable",
  components: {
    DataTable,
    FormFilter,
    Btn
  },
  props: {
    selection: {
      type: String, //['selection'|'single']
      default: "selection",
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
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    "on-ok": {
      type: Function,
      default: () => {}
    },
    "on-cancel": {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      selectRows:[],
      fullscreen: false, //    全屏
      dialogTableVisible: false // 是否展示dialog
    };
  },
  methods: {
    // 切换全屏
    switchFull() {
      this.fullscreen = !this.fullscreen;
    },
    // 提交查询
    submit(formVal) {
      this.$refs.demoTable.submit(formVal);
    },
    // 显示
    show() {
      if (!this.disabled) {
        this.dialogTableVisible = true;
      }
    },
    // 隐藏
    hide() {
      this.dialogTableVisible = false;
      this.$refs.demoTable.clearSelect();
      this.selectRows = []
    },
    onClickOk() {
      this.selectRows = this.$refs.demoTable.getSelectRow();
      this.$emit("on-ok", this.selectRows);
    },
    onClickCancel() {
      this.$emit("on-cancel");
      this.hide();
    },
    selectionChange(selectRows){
      this.selectRows = selectRows||[];
    },
    dblClickRow(row, column, event) {
      this.selectRows = [row];
      this.$emit("on-ok", [row]);
      this.hide();
    },
    opened() {
      if (!this.disabled) {
        this.$refs.demoTable.submit();
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style lang="scss">
.el-dialog__header,
.el-dialog__footer {
  padding: 10px;
  padding-bottom: 10px;
}

.el-dialog__body {
  padding: 0px 10px;
  .el-form-item {
    margin-bottom: 5px;
  }
}
.svg-icon-full {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 24px;
  right: 40px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
