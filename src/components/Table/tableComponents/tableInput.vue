<template>
  <el-input v-model="row[col.prop]">
    <!-- input -->
  </el-input>
</template>

<script>
export default {
  props: {
    row: Object,
    col: Object,
    data: Array
  },
  computed: {
    text() {
      return this.row[this.col.prop]
    },
    focusStatus() {
      if (this.row._edit) {
        return this.col.isFocus
      }
      return false
    }
  },
  mounted() {
    console.log(123)
  },
  directives: {
    focus: {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
          el.select() // 文字全选
        }
      }
    }
  },
  methods: {
    KeyDownEvent(ev) {
      if (this.col.eventKey) {
        if (this.col.eventKey(ev, this.row)) {
          if (ev.code === 'Enter' || ev.code === 'NumpadEnter') {
            const idx = this.data.indexOf(this.row)
            if (idx !== this.data.length - 1) {
              this.$set(this.data[idx], '_edit', false)
              this.$set(this.data[idx + 1], '_edit', true)
            } else {
              this.$set(this.data[idx], '_edit', false)
            }
          }
        }
      } else {
        if (ev.code === 'Enter' || ev.code === 'NumpadEnter') {
          const idx = this.data.indexOf(this.row)
          if (idx !== this.data.length - 1) {
            this.$set(this.data[idx], '_edit', false)
            this.$set(this.data[idx + 1], '_edit', true)
          } else {
            this.$set(this.data[idx], '_edit', false)
          }
        }
      }
    }
  }
}
</script>
<style>
@import './tableInput.css';
</style>
