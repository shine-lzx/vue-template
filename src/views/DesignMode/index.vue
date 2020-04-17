<template>
  <div>2</div>
</template>

<script>
import {
  FakeStarFactory,
  newFakeStarFactory
} from '@/designMode/factoryPattern'

import { singleton } from '@/designMode/singletonPattern'
export default {
  created() {
    this.fun2()
  },
  data() {
    return {}
  },

  methods: {
    fun() {
      try {
        // 这是我的手机
        const myPhone = new FakeStarFactory()
        // 让它拥有操作系统
        const myOS = myPhone.createOS()
        // 让它拥有硬件
        const myHardWare = myPhone.createHardWare()
        // 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
        myOS.controlHardWare()
        // 唤醒硬件(输出‘我会用高通的方式去运转’)
        myHardWare.operateByOrder()
      } catch (error) {
        console.error(error)
      }
    },
    newFun() {
      try {
        // 这是我的手机
        const myPhone = new newFakeStarFactory()
        // 让它拥有操作系统
        const myOS = myPhone.createOS()
        // 让它拥有硬件
        const myHardWare = myPhone.createHardWare()
        myOS.controlHardWare()
        myHardWare.operateByOrder()
      } catch (error) {
        console.error(error)
      }
    },

    fun2() {
      const s1 = singleton.getInstance()
      const s2 = singleton.getInstance()
      console.log(s1 === s2)
    }
  }
}
</script>

<style>
</style>