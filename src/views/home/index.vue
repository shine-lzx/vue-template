<template>
  <div class="dashboard-container">
    <div class="verificationCode">
      <div class="codeBackground"></div>
      <img class="codeImage" :src="imageData" alt="verificationCode">
      <input v-model="codeInput" type="text">
      <div>{{ validInput }}</div>
    </div>
  </div>
</template>

<script>
import generateCode from '@/utils/code.js'
export default {
  name: 'Home',
  data() {
    return {
      codeInput: '',
      imageData: '',
      codeText: ''
    }
  },
  computed: {
    validInput() {
      return this.codeText === this.codeInput ? 'correct' : 'not correct'
    }
  },
  mounted() {
    const { code, data } = generateCode(120, 48)
    console.log('code', code)
    console.log('data', data)
    this.imageData = data
    this.codeText = code
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
