<template>
  <div>componentA</div>
</template>

<script>
export default {
  inject: ['name'],
  mounted() {
    console.log(this.name)
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
