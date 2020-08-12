<template>
    <span>
        <btn name="search" @click="searchClick" />
        <btn name="reset" @click="resetClick" />
        <i
            v-if="showMoreBtn"
            @click="openClick"
            :class="'el-icon-arrow-'+(openMore?'down':'up')+' is-open-icon'"
        >{{openMore?'展开':'收起'}}</i>
    </span>
</template>
<script>
import Btn from '../Btn'

export default {
  name: "SearchBtn",
  components:{
    Btn
  },
  props: {
    showMoreBtn: {
      type: Boolean,
      default: false
    },
    openMore: {
      type: Boolean,
      default: false
    },
    openClick: {
      type: Function,
      default: () => {}
    },
    searchClick: {
      type: Function,
      default: () => {}
    },
    resetClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.is-open-icon {
  font-size: 12px;
  padding: 4px;
  color: #52c41a;
  cursor: pointer;
}
</style>
