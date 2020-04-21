<template>
  <div>
    <button @click="successTip">successTip</button>
    <button @click="failTip">failTip</button>
  </div>
</template>

<script>
import {
  FakeStarFactory,
  newFakeStarFactory
} from "@/designMode/factoryPattern";

import { singleton } from "@/designMode/singletonPattern";
import { Test, Father } from "@/designMode/decoratorPattern";
import { proxyAddAll } from "@/designMode/proxyPattern";
import { askPrice } from "@/designMode/strategyPattern";
import { Example, Derive } from "@/designMode/tset";
export default {
  data() {
    return {};
  },
  created() {
    let a = proxyAddAll(1, 2, 3, 99999);
    console.log(a);
    // this.fun2();
    let b = new Father();
    console.log(b.msg());
    // console.log(b);
    this.dispose();

    console.log(askPrice("fresh", 100));

    new Example("shine", 18)
    new Derive().reads()

  },

  methods: {
    fun() {
      try {
        // 这是我的手机
        const myPhone = new FakeStarFactory();
        // 让它拥有操作系统
        const myOS = myPhone.createOS();
        // 让它拥有硬件
        const myHardWare = myPhone.createHardWare();
        // 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
        myOS.controlHardWare();
        // 唤醒硬件(输出‘我会用高通的方式去运转’)
        myHardWare.operateByOrder();
      } catch (error) {
        console.error(error);
      }
    },
    newFun() {
      try {
        // 这是我的手机
        const myPhone = new newFakeStarFactory();
        // 让它拥有操作系统
        const myOS = myPhone.createOS();
        // 让它拥有硬件
        const myHardWare = myPhone.createHardWare();
        myOS.controlHardWare();
        myHardWare.operateByOrder();
      } catch (error) {
        console.error(error);
      }
    },

    fun2() {
      const s1 = singleton.getInstance(9999999);
      const s2 = singleton.getInstance();
      console.log(s1 === s2);
    },

    successTip() {
      if (this.throttle()) {
        try {
          return new Test().successTip().promptMessage();
        } catch (error) {
          console.error(error);
        }
      }
    },

    failTip() {
      return new Test().failTip().promptMessage();
    },

    throttle() {
      const a = Test.getInstance();
      const b = Test.getInstance();
      if (a === b) {
        return true;
      }
    },

    dispose() {}
  }
};
</script>

<style></style>
