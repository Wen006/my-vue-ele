/**
 *  通用v-table
 */
<style rel="stylesheet/scss" lang="scss" scoped>
  .tab-div{
    display: block;
    width: 100%;
    background: #f3f3f3;
    overflow: hidden;
  }
  .footer {
    background: #eef1f6;
    width: 100%;
    height: 40px;
  }
  .pagination-footer .description{
    float:left;
    margin-left:20px;
    margin-top:12px;
  }
  .pagination-footer .el-pagination{
    float:right;
    margin-top:5px;
    margin-bottom:5px;
  }
</style>

<template>
  <div ref="tables" class="tab-div">
    <el-table
      ref="tableRef"
      :data="data"
      :height="tab_height"
      v-bind="tablePropertites"
      style="width: 100%;"
      @current-change="tableCurrentChange"
      v-on="$listeners"
    >
      <template v-for="(tp, key) in columnTypes">
        <el-table-column :type="tp" :key="key"/>
      </template>
      <template v-for="col in renderColumns">
        <el-table-column v-if="col.type !== 'text' " v-bind="getColBind(col)">
          <template slot-scope="scope">
            <!-- 动态绑定组建 -->
            <component
              :is="col.component"
              v-bind="getCptBind(scope, col)"
              v-on="col.listeners"
            />
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="getColBind(col)">
          <!-- hello world -->
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <div v-if="pagination" class="pagination-footer">
        <span class="description"/>
        <el-pagination
          :current-page="pageNo"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './tableComponents/tableButton'
import Text from './tableComponents/text'
import Image from './tableComponents/tableImage'
import Progress from './tableComponents/tableProgress'
import Input from './tableComponents/tableInput'
import Link from './tableComponents/tableLink'
import Dynamic from './tableComponents/dynamicButton'
const BOOLEAN_KEYS = [
  'fit',
  'stripe',
  'border',
  'show-header',
  'highlight-current-row',
  'default-expand-all',
  'show-summary',
  'select-on-indeterminate'
]

const TYPES = ['selection', 'index'] // 表格类型[selection：复选框；expand：展开表格；index：序号]

/* 默认列的 style */
const COLUMN_PROPS = {
  align: 'left',
  components: Text,
  type: 'text'
}

/* 默认列的 显示的对应字段 */
const COLUMN_KEY_MAP = {
  label: 'label',
  prop: 'prop'
}

/* 表格中对应的组件 */
const tableComponents = {
  'text': Text,
  'img': Image,
  'progress': Progress,
  'button': Button,
  'input': Input,
  'link': Link,
  'dynamic': Dynamic
}

export default {
  name: 'VTable',
  components: {},
  props: {
    offset:{
      type:Number,
      default: 60,
    },// 表格距离下边距
    data: {
      type: Array,
      default: []
    }, // 数据源
    columns: {
      type: Array,
      default: []
    }, // 列表头
    columnType: [String, Array], // 列类型[序号、复选框、展开]
    
    pageSizes: {
      type: Array,
      default: () => [50, 100, 500, 1000]
    }, // 分页显示范围
    pageSize: {
      type: Number,
      default: 50
    }, // 默认一页显示50条
    pageNo: {
      type: Number,
      default: 1
    }, // 当前页
    total: {
      type: Number,
      default: 0
    }, // 总数
    pagination: Boolean, // 分页开关
  },
  data() {
    return {
      tab_height: 0
    }
  },
  computed: {
    // 处理 $attrs 里面 Boolean 类型的 prop 和统一 prop 命名
    tablePropertites() {
      // 取得table标签下的属性
      const { $attrs } = this
      const properties = {}
      Object.keys($attrs).forEach(key => {
        const v = $attrs[key]
        // 正则表达式，将属性中大写字母替换为-字母，并全部转小写，如maxHeight,转换后得到max-heigth
        const uniformKey = key.replace(/([A-Z])/, '-$1').toLowerCase()
        // 如果属性没有值，并且该属性在boolean值属性列表中，那么给该属性赋值true，否则保持不变
        // ~按位取反运算符--二进制
        // 取反目的，只要结果不为0就是true,代表属性列表中有该属性
        properties[key] = ~BOOLEAN_KEYS.indexOf(uniformKey) && v === '' ? true : v
      })
      return properties
    },
    /* 列组装 */
    renderColumns() {
      const {
        columns // 列值
      } = this
      const map = Object.assign({}, COLUMN_KEY_MAP)
      /* 循环列，将列的各属性合并 */
      const renderColumns = columns.map(col => {
        const props = Object.assign({},COLUMN_PROPS,col);
        const componentType = !props.type ? 'text' : props.type
        this.$set(props, 'component', tableComponents[componentType])
        this.$set(props, 'type', componentType)
        
        const obj = Object.assign({}, COLUMN_PROPS, props, col)
        obj.label = obj[map.label]
        obj.prop = obj[map.prop]
        obj.num = obj[map.num]
        return obj
      })
      return renderColumns
    },
    // 列类型格式化方法
    columnTypes() { // 获取列类型
      const { columnType: type } = this
      if (!type) return [] // 如果没有设置返回空
      // 如果列类型是String类型，并且存在于列类型数组中，直接返回值
      if (typeof type === 'string' && ~TYPES.indexOf(type)) {
        return [type]
      }
      // 如果是数组类型，并且每个值都存在于列类型数组中，返回
      return Array.isArray(type) && type.filter(it => ~TYPES.indexOf(it)) || []
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.resize();
    })
  },
  watch:{
    offset(){
      this.resize();
    } 
  },
  methods: {
    resize(){
      var top = this.$refs.tables.getBoundingClientRect().top
      /* 当 top = 0 的时候 说明还是在隐藏阶段 取缓存数据 */
      if (Number(top) <= 0) {
        top = sessionStorage.getItem('dom-heigth')
      } else {
        sessionStorage.setItem('dom-heigth', top)
      }
      this.tab_height = document.body.offsetHeight - Number(Number(top) + this.offset)
    },
    /* 删除列属性中无效值 -- 打印表头 */
    getColBind(col) {
      const bind = Object.assign({}, col)
      delete bind.component
      delete bind.listeners
      delete bind.propsHandler
      return bind
    },
    /* bind 【行信息、列信息、数据源】到组件列中  */
    getCptBind(scope, col) {
      const { row, column } = scope
      const index = scope.$index
      const props = { row, col, column, index, 'data': this.data }
      return props
    },
    /* 分页范围改变事件 */
    handleSizeChange(val,row) {
      console.log(`每页 ${val} 条`)
      this.$emit("sizeChange",val);
      var scroll = document.getElementsByClassName('is-scrolling-none')[0]
      scroll.scrollTop = 0
    },
    /* 当前页改变事件 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)  
      this.$emit("currentChange",val);
      var scroll = document.getElementsByClassName('is-scrolling-none')[0]
      scroll.scrollTop = 0
    },
    /* 当前列表单选 */
    tableCurrentChange(newRecored,oldRecord){
      this.$emit("tableCurrentChange",newRecored,oldRecord);
    },
    clearSelection(){
      this.$refs.tableRef.clearSelection();
    }
  }
}
</script>
