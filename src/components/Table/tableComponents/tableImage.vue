<!--qiu.bl-->
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <template v-for="(item, key) in row.files">
      <img class="thumbnail" :src="newPrefix + item.fileData" :key="key">
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableImage',
  components: {},
  props: {
    row: Object,
    col: Object,
    data: Array
  },
  data() {
    return {
      newPrefix: process.env.FILE_URL
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>
