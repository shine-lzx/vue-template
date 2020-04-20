<template>
  <div>componentsA</div>
</template>

<script>
export default {
  name: 'ComponentB',
  data() {
    return {}
  },
  created() {
    this.$on('on-message', this.showMessage)
  },
  methods: {
    showMessage(text) {
      console.log('=========>', text)
    }
  }
}
</script>

<style>
</style>