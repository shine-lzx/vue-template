<template>
  <div>componentsA</div>
</template>

<script>
export default {
  name: 'componentB',
  created() {
    this.$on('on-message', this.showMessage)
  },
  data() {
    return {}
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