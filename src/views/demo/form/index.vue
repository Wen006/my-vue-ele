<template>
  <div>
    <v-radio v-model="value" :dataSource="dataSource" @change="valChange"></v-radio>
    <v-radio type="button" v-model="value" :dataSource="dataSource" @change="valChange"></v-radio>
    <br>
    父组件：{{value}}
    <hr>
    <v-check-box v-model="boxVal" :dataSource="dataSource"></v-check-box>
    <v-check-box v-model="boxVal" :dataSource="dataSource" type="button"></v-check-box>
    <br>
    父组件：{{boxVal}}
    <hr>
    <v-select v-model="selectVal" :dataSource="dataSource"></v-select>
    <v-select multiple v-model="selectVals" :dataSource="dataSource"></v-select>
    <br>
    父组件：{{selectVal}}
    父组件：{{selectVals}}
    <hr>
  </div>
</template>


<script>
import VRadio from "@/components/FormMark/VRadio";
import VCheckBox from "@/components/FormMark/VCheckBox";
import VSelect from "@/components/FormMark/VSelect";


export default {
  name: "FormDemo",
  components: {
    VRadio,
    VCheckBox,
    VSelect
  },
  props: {},
  data() {
    return {
      value: "1",
      boxVal: ["1"],
      selectVal: "",
      selectVals: [],
      dataSource: [
        { name: "篮球", value: "1" },
        { name: "足球", value: "2" },
        { name: "羽毛球", value: "3" }
      ]
    };
  },
  computed: {},
  methods: {
    /**回调 */
    valChange(values, rows) {
      console.log("values,rows", values, rows);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
