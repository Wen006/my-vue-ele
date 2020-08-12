<template>
    <div>
        hello
        <btn name="save"></btn>
        <btn name="edit"></btn>
        <btn name="new"></btn>
        <btn name="upload"></btn>
        <btn name="delete"></btn>
        <btn >ddd</btn>
    </div>
</template>

<script>
import Btn from '@/components/Btn'

export default {
    name:"ButtonDemo",
    components:{
        Btn
    },
    data(){
        return {

        }
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>

</style>
