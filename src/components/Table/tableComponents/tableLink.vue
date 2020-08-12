<style rel="stylesheet/scss" lang="scss" scoped>
  .table-a{
    color: #337ab7;
  }
</style>
<template>
  <div>
    <a class="table-a" @click="col.cptProperties.eventClick(index, row)">{{ row[col.prop] }}</a>
  </div>
</template>

<script>
export default {
  name: 'TableLink',
  props: ['row', 'col', 'index'],
  mounted() {
  },
  methods: {
  }
}
</script>
