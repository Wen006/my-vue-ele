<template> 
    <el-checkbox-group v-bind="groupProps" @change="valChange" v-model="val" >
      <template v-for="(item, index) in dsItems">
        <el-checkbox-button v-if="type == 'button'" v-bind="item" :key="index">{{item.name}}</el-checkbox-button>
        <el-checkbox v-else :key="index" v-bind="item">{{item.name}}</el-checkbox>
      </template>
    </el-checkbox-group> 
</template>

<script>
/**
 * 多选
 * - type:  button || box
 * - change
 * - value: array
 * - dataSource:[] 数据字典
 */
export default {
  name: "CheckBox",
  props: {
    type: {
      type: String,
      default: "box"
    },
    change: {
      type: Function,
      default: () => {}
    },
    dataSource: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
    }
  },
  data() {
    return {
      val: []
    };
  },
  created() {
    this.val = this.value;
  },
  computed: {
    dsItems() {
      return this.dataSource.map(item => ({
        label: item.value,
        name: item.name
        // value: item.value
        // ...item
      }));
    },
    groupProps(){
      const {dataSource,type,value,change,...other} = this.$attrs;
      return other;
    }
  },
  methods: {
    valChange(arr) {
      this.$emit(
        "change",
        arr,
        this.dataSource.filter(i => arr.some(a=>a==i.value))
      );
      console.log(
        "change",
        arr,
        this.dataSource.filter(i => arr.some(a=>a==i.value))
      );
      this.$emit("input", arr);
    }
  },
  watch: {
    value(a, b) {
      if (a != b) {
        this.val = a;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
