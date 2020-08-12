<template>
    <div>
        <el-dialog
            :append-to-body="true"
            height="90%"
            width="80%"
            :fullscreen="fullscreen"
            :visible.sync="dialogTableVisible"
            @opened="opened"
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
            <v-table
                :columnType="selection=='single'?'index':'selection'"
                ref="demoTable"
                :columns="columns"
                :fetchData="fetchData"
                @row-dblclick="dblClickRow"
            ></v-table>
            <div slot="footer">
                <btn name="sure" @click="onOk"></btn>
                <btn name="cancel" @click="onCancel"></btn>
            </div>
        </el-dialog>
        <!-- <el-button @click="show">弹出来</el-button> -->
        <span @click="show">
            <el-button>alert</el-button>
        </span>
        <el-input
            @mouseup.native="clickInput"
            v-show="true"
            placeholder="请输入内容"
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
        <i
            @mouseenter="iconHoverable = true"
            @mouseleave="iconHoverable = false"
        >hello,{{iconHoverable}}</i>
    </div>
</template>

<script>
import VTable from "@/components/Table/VTable";
import FormFilter from "@/components/FormFilter";
import Btn from "@/components/Btn";

export default {
  name: "LookUp",
  components: {
    VTable,
    FormFilter,
    Btn
  },
  data() {
    return {
      selection: "selection",
      fullscreen: false,
      dialogTableVisible: false,
      title: "选择",
      inputValue: "",
      iconHoverable: false,
      formItems: [
        {
          label: "名称",
          prop: "name",
          type: "text",
          itemProps: {}
        },
        {
          label: "名称",
          prop: "name",
          type: "text",
          itemProps: {}
        }
      ],
      columns: [
        {
          columnsProps: {
            label: "名称",
            prop: "name"
          }
        },
        {
          columnsProps: {
            label: "邮件",
            prop: "email"
          }
        },
        {
          columnsProps: {
            label: "城市",
            prop: "city"
          }
        }
      ]
    };
  },
  methods: {
    switchFull() {
      this.fullscreen = !this.fullscreen;
    },
    submit(formVal) {
      this.$refs.demoTable.submit(formVal);
    },
    show() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    hide() {
      this.dialogTableVisible = false;
      this.$refs.demoTable.clearSelect();
    },
    onOk() {
      const selectRows = this.$refs.demoTable.getSelectRow();
      console.log("selectRows", selectRows);
      this.inputValue = selectRows.map(i => i.name).join(",");
    },
    onCancel() {
      this.hide();
    },
    dblClickRow(row, column, event) {
      console.log("selectRows", [row]);
      this.hide();
    },
    opened() {
      this.$refs.demoTable.submit();
    },
    clickInput(e) { 
      if (this.iconHoverable && this.inputValue != "") {
        this.inputValue = "";
      } else {
        this.show();
      }
    },
    handleIconClick() {
      console.log("clickIcon");
      this.iconHoverable = !this.iconHoverable;
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
  mounted() {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     console.log("this.$refs.demoTable", this.$refs.demoTable);
    //     this.$refs.demoTable.submit();
    //   });
    // });
  }
};
</script>
<style lang="scss">
.el-dialog__header,
.el-dialog__footer {
  padding: 10px;
  padding-bottom: 10px;
}
// .el-dialog:not(.is-fullscreen) {
//   margin-top: 0vh !important;
// }
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
.lookup-input-icon,
input-with-select {
  cursor: pointer;
}
</style>
