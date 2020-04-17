<template>
  <div>
    <h4>6666</h4>
    <componentA />
  </div>
</template>

<script>
import componentA from './components/componentA'
export default {
  provide() {
    return {
      name: this.age
    }
  },
  
  components: {
    componentA
  },

  mounted() {},

  data() {
    return {
      age: 18
    }
  }
}
</script>

<style lang="scss" scoped>
</style>