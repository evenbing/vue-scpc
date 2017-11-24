<template>
  <section>
    <resList-grid :title="title" :tableId="tableId"></resList-grid>
  </section>
</template>

<script>

  export default{
    data(){
      return{
        tableId:this.$route.meta.tableId,
        title:this.$route.name
      }
    },
    methods:{
    },
    mounted() {

    },
    watch:{
      '$route' (to, from) {
        console.log("==="+this.tableId);
        this.tableId = this.$route.meta.tableId;
        this.title = this.$route.name
      }
    }
  };
</script>
