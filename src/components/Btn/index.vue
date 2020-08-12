
<template>
  <el-button v-bind="btnProps" :title="title" v-on="$listeners">
    {{label}}
    <slot></slot>
  </el-button>
</template>

<script>
import { getBtnInfo } from "./config";
import { getIntl } from "../util";
import { close } from 'fs';

/**
 * 通用按钮
 * 统一管理
 */
export default {
  name: "Button",
  data() {
    return {
      label: "",
      title: ""
    };
  },
  props: {
    name: {
      type: String,
      default: "default"
    }, 
  },
  computed: {
    btnProps() {
      const btnProps = {};
      const configBtn = getBtnInfo(this.name);
      Object.assign(btnProps, configBtn, this.$attrs);

      // 进行国际化
      btnProps.localeName = getIntl({
        id: configBtn.locale,
        defaultMessage: configBtn.label
      });

      this.label = btnProps.label || btnProps.localeName || btnProps.name;
      this.title = btnProps.title || this.label;
      if (btnProps.name) {
        delete btnProps.name;
      }
      return btnProps;
    }
  },
  methods:{ 
  }
};
</script>

<style lang="scss" scoped>
</style>
