<template>
<div>
  <el-button v-for="btn in col.cptProperties" :key="btn.value"
  :type="btn.type" :size="btn.size" :icon="btn.icon"
  @click="btn.eventClick(index, row)">{{ btn.type != 'text' ? btn.label : row[col.prop]}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'tableButton',
  props: ['row', 'col', 'index'],
  mounted () {
  },
  methods: {
    todo () {
      this.$set(this.row, '_edit', !this.row._edit)
    }
  }
}
</script>
