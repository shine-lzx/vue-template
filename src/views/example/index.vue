<template>
  <div>
    <h4>6666</h4>
    <button @click="handleClick">click</button>
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
  
  data() {
    return {
      age: 18
    }
  },

  mounted() {},


  methods: {
    handleClick() {
      this.age = 10
    }
  }
}
</script>

<style lang="scss" scoped>
</style>