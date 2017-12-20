<template>
  <section>
    <resList :title="title" :tableId="tableId"></resList>
  </section>
</template>

<script>

  export default{
    data(){
      return{
        tableId:this.$route.params.tableId,
        title:this.$route.name
      }
    },
    methods:{
    },
    mounted() {

    },
    watch:{
      '$route' (to, from) {
        console.log(to)
        this.tableId = to.params.tableId;
      }
    }
  };
</script>
