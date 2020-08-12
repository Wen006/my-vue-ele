<template>
  <div>
    <radio v-model="value" :dataSource="dataSource" @change="valChange"></radio>
    <radio type="button" v-model="value" :dataSource="dataSource" @change="valChange"></radio>
    <br>
    父组件：{{value}}
    <hr>
    <check-box v-model="boxVal" :dataSource="dataSource"></check-box>
    <check-box v-model="boxVal" :dataSource="dataSource" type="button"></check-box>
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
import Radio from "@/components/FormMark/Radio";
import CheckBox from "@/components/FormMark/CheckBox";
import VSelect from "@/components/FormMark/Select";


export default {
  name: "FormDemo",
  components: {
    Radio,
    CheckBox,
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
    valChange(value, row) {
      console.log("value,row", value, row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
