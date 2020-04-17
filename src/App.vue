<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import userInfo from './mixins/userInfo'
export default {
  name: 'App',
  mixins: [userInfo],
  provide() {
    return {
      app: this
    }
  },
  mounted() {
    // console.log('mixins', this.userInfo)
  },
  data() {
    return {
      shine: 'github'
    }
  }
}
</script>
