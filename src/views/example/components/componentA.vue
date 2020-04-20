<template>
  <div>componentA</div>
</template>

<script>
export default {
  inject: ["name"],
  data() {
    return {
      variable: this.name
    };
  },
  watch: {
    variable: {
      handler(newVal, oldVal) {
        console.log("newVal", newVal);
        console.log("oldVal", oldVal);
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    console.log(this.variable);
  }
};
</script>

<style></style>
