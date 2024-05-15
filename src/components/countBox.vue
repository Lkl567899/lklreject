<template>
  <div class="">
    <button class="del" @click="del">-</button> <input @change="onChange" type="text" name="" id="" class="ipt"
      :value="value"> <button class="add" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add() {
      this.$emit('input', this.value + 1)
    },
    del() {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    onChange(e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.ipt {
  border: none;
  outline: none;
  width: 40px;
  height: 30px;
  text-align: center;
  margin: 5px 0;
  background-color: #efefef;
}

.add,
.del {
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
}
</style>
