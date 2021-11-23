<template>
  <div v-if="showBlock" class="block" @click="stopTimer">
    click me
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: ['delay'],
  data() {
    return  {
      showBlock: false,
      timer: null,
      reactionTime: 0
    }
  },
  mounted() {
    setTimeout( () => {
      this.showBlock = true
      this.startTimer()
    }, this.delay)
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10
      }, 10)
    },
    stopTimer() {
      this.showBlock = false
      clearInterval(this.timer)
      this.$emit('score', this.reactionTime)
    }
  }
}
</script>

<style scoped>
  .block {
    width: 400px;
    border-radius: 20px;
    background: #09a746;
    color: #FFF;
    font-size: 25px;
    text-align: center;
    padding: 100px 0;
    margin: 40px auto;
  }
</style>