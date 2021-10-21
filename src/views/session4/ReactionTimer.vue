<template>
  <div id="reaction-timer">
    <section>
      <h3 class="title">Reaction Timer (Lifecycle Hoocks & Custom events)</h3>

      <button class="btn"
              :class="{disabled: isPlaying}"
              @click="start"
              :disabled="isPlaying">Play</button>

      <Result v-if="showResult" :score="score"/>

      <Block v-if="isPlaying" :delay="delay" @score="endGame"/>
    </section>
  </div>
</template>

<script>
import Block from './components/Block.vue'
import Result from './components/Result.vue'

export default {
  name: 'ReactionTimer',
    components: {
    Block,
    Result
  },
  data() {
    return {
      isPlaying: false,
      showResult: false,
      delay: null,
      score: null
    }
  },
  methods: {
    start() {
      this.showResult = false
      this.delay = 2000 + Math.random() * 5000
      this.isPlaying = true
      console.log(this.delay)
    },
    endGame(score) {
      this.score = score,
      this.isPlaying = false
      this.showResult = true
    }
  }
}
</script>

<style scoped>
  #reaction-timer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
  color: #FFF;
  background-color: #09a746;
  font-size: 18px;
  width: 100px;
  height: 75;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn[disabled] {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>