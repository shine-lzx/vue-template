<template>
  <div>
    <button @click="handelClick">click</button>
    <componentB />
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
import componentB from './components/componentA'
export default {
  name: 'ComponentA',
  components: {
    componentB
  },
  mixins: [Emitter],
  data() {
    return {}
  },
  methods: {
    handelClick() {
      this.broadcast('componentB', 'on-message', 'Hello Vue.js')
    }
  }
}
</script>

<style>
</style>