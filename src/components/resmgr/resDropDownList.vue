<template>
  <el-select placeholder="请选择">
    <el-option  v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    props:{
      id,
      label,
      sql
    }
  }
</script>
