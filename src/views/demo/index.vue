<template>
    <div class="demo-main">
        <btn active v-for="(item, index) in btns" :key="index" @click="page=item.key" >{{item.name}}-演示</btn>
        <hr />
        <component
         :is="page"
        ></component>
    </div>
</template>

<script>
import ComList from "./list"; 
import ComButton from "./button";
import ComForm from "./form";
import LookUp from "./lookup";

import Btn from '@/components/Btn'


export default {
  name: "DemoMain",
  components: {
    ComList, 
    ComButton,
    ComForm,
    LookUp,
    Btn
  },
  data() {
    return {
      comps:[
        {ComList:"列表"},
        {ComButton:"按钮"},
        {ComForm:"表单"},
        {LookUp:"弹框选择"},
      ],
      page:"ComList"
    };
  },
  created() {
    console.log('this', this)
  },
  methods: {
    
  },
  computed: {
    btns(){
      
      return this.comps.map(it=>{
        const obj = {}
        for (const iKey in it) {
          if (it.hasOwnProperty(iKey)) {
            const iVal = it[iKey];
            obj.name = iVal;
            obj.key  = iKey;
          }
        }
        return obj;
      })

    }
  },
  mounted() {
   
  }
};
</script>


<style lang="scss"> 
.demo-main{
  padding: 20px 20px 0 ;
}

</style>

