<template>
  <section>
    <resList :title="title" :tableId="tableId"></resList>
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
        this.tableId = this.$route.meta.tableId;
        this.title = this.$route.name
      }
    }
  };
</script>
