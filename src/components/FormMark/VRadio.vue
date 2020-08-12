<template>
  <el-radio-group v-bind="groupProps" @change="valChange" v-model="val">
    <template v-for="(item, index) in dsItems">
      <el-radio-button v-if="type == 'button'" v-bind="item" :key="index">{{item.name}}</el-radio-button>
      <el-radio v-else :key="index" v-bind="item">{{item.name}}</el-radio>
    </template>
  </el-radio-group>
</template>

<script>
/**
 * 单选框
 * - type:  button || radio
 * - change
 * - value
 * - dataSource:[] 数据字典
 */
export default {
  name: "VRadio",
  props: {
    type: {
      type: String,
      default: "radio"
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
        label: item.value,
        name: item.name
        // value: item.value
        // ...item
      }));
    },
    groupProps() {
      const { dataSource, type, value, change, ...other } = this.$attrs;
      return other;
    }
  },
  methods: {
    valChange(label) {
      this.$emit(
        "change",
        label,
        this.dataSource.filter(i => i.value == label)
      );
      console.log(
        "change",
        label,
        this.dataSource.filter(i => i.value == label)
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
