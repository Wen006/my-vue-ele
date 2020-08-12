<template>
  <div>
    <template v-for="btn in col.cptProperties">
      <el-button
        v-if="row.status != btn.hidden"
        :key="btn.value"
        :type="btn.type"
        :size="btn.size"
        :icon="btn.icon"
        @click="btn.eventClick(index, row)">{{ btn.label }}</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DynamicButton',
  props: ['row', 'col', 'index'],
  mounted() {
  },
  methods: {
    todo() {
      this.$set(this.row, '_edit', !this.row._edit)
    }
  }
}
</script>
