
<template>
  <div class="table-panel">
    <el-alert
      :closable="false"
      class="table-el-alert"
      show-icon
      :type="selectRows.length==0?'info':'success'"
      v-show="columnType == 'selection'"
    >
      <span>已选择: {{selectRows.length}} 条</span>
      <el-tag
        class="clear-tag"
        @click="clearSelect"
        v-show="selectRows.length > 0"
        type="info"
        size="mini"
      >清除</el-tag>
    </el-alert>
    <base-table
      ref="baseTableRef"
      v-bind="baseTableProps"
      :data="list"
      v-loading="loading"
      :pageSize="pageSize"
      :pageNo="pageNo"
      :total="total"
      :highlight-current-row="columnType == 'index'"
      :pagination="!!fetchData"
      :fetchData="fetchRemoteData"
      @sizeChange="handleSizeChange"
      @selection-change="handleSelectionChange"
      @currentChange="currentChange"
      @tableCurrentChange="tableCurrentChange"
      v-on="$listeners"
    ></base-table>
  </div>
</template>

<script>
import BaseTable from "./Table";
import { isPromise, isFunction } from "../util";
import { isPrimitive } from "util";

export default {
  name: "DataTable",
  components: {
    BaseTable
  },
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      list: [],
      loading: false,
      selectRows: []
    };
  },
  props: {
    columns: {
      type: Array,
      default: []
    }, // 列表头
    columnType: [String, Array], // 列类型[序号、复选框、展开]
    // select: {
    //   type: Function,
    //   default: () => {}
    // }, // 单个 复选框 事件
    // selectAll: {
    //   type: Function,
    //   default: () => {}
    // }, // 全选 复选框 事件
    // sortChange: {
    //   type: Function,
    //   default: () => {}
    // }, // 服务端排序；当 sortable：custom
    pageSizes: {
      type: Array,
      default: () => [10, 40, 500, 1000]
    },
    pagination: Boolean, // 分页开关
    fetchData: Promise | Function, // 请求分页方法
    showSummary: Boolean, // 表尾合计行开关
    summaryMethod: Function // 表尾合计行方法
  },
  computed: {
    baseTableProps() {
      const props = Object.assign({}, this.$props, this.$attrs);
      return props;
    }
  },
  watch: {},
  created() {
    // this.submit();
  },
  mounted() {},
  methods: {
    async fetchRemoteData(pageParam) {
      const queryParam = { ...pageParam };
      this.loading = true;
      try {
        if (this.fetchData) {
          let result = {};
          if (isPromise(this.fetchData)) {
            result = await this.fetchData(queryParam);
          } else if (isFunction(this.fetchData)) {
            const callFunc = this.fetchData(queryParam);
            if (isPromise(callFunc)) {
              result = await callFunc;
            } else {
              result = await new Promise((resolve, reject) => {
                try {
                  this.callFunc(queryParam, resolve, reject);
                } catch (error) {
                  resolve({ total: 0, list: [] });
                }
              });
            }
          }
          this.total = result.total || 0;
          this.list = result.list || [];
        }
      } catch (error) {}

      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    /* 分页范围改变事件 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchRemoteData({ pageSize: this.pageSize, pageNo: this.pageNo });
    },
    /* 当前页改变事件 or 单选择 */
    currentChange(val) {
      if(typeof val == 'number'){ //当前页改变事件
        this.pageNo = val;
        this.fetchRemoteData({ pageSize: this.pageSize, pageNo: this.pageNo });
      }
    },
      /* 当前列表单选 */
    tableCurrentChange(newRecored,oldRecord){
      this.selectRows = [newRecored];
      this.$emit("selectionChange",this.selectRows);
    },
    // 
    handleSelectionChange(selects) {
      this.selectRows = selects;
      this.$emit("selectionChange",this.selectRows);
    },
    clearSelect() {
      this.selectRows = []
      this.$refs.baseTableRef.clearSelection();
    }, 
    // 
    getSelectRow(){
      return this.selectRows;
    },
    submit(queryParam = {}) {
      this.pageNo = 1;
      this.fetchRemoteData({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        ...queryParam
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-panel {
  .el-form-item{
    margin-bottom: 5px;
  }
  .table-el-alert {
    margin-bottom: 5px; 
    .clear-tag{
      cursor: pointer;
    }
  } 
  
} 
  
</style>
