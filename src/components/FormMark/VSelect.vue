<template>
  <el-select v-model="val" v-bind="selectProps" @change="valChange" >
    <el-option v-for="item in dsItems" v-bind="item" :key="item.value" ></el-option>
  </el-select>
</template>

<script>
/**
 * 下拉选择
 * - change
 * - value
 * - dataSource:[] 数据字典
 */
export default {
  name: "VSelect",
  props: {
    change: {
      type: Function,
      default: () => {}
    },
    dataSource: {
      type: Array,
      default: []
    },
    value: {
      type: String | Number | Boolean
    }
  },
  data() {
    return {
      val: ""
    };
  },
  created() {
    this.val = this.value;
  },
  computed: {
    dsItems() {
      return this.dataSource.map(item => ({
        label: item.name,
        name: item.value,
        value: item.value
        // ...item
      }));
    },
    selectProps() {
      const { dataSource, type, value, change, ...other } = this.$attrs;
      return other;
    }
  },
  methods: {
    valChange(label) {
      const values = Array.isArray(label)?label:[label];
      this.$emit(
        "change",
        label,
        this.dataSource.filter(i =>values.some(v=>v==i.value))
      );
      console.log(
        "change",
        label,
        this.dataSource.filter(i =>values.some(v=>v==i.value))
      );
      this.$emit("input", label);
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
