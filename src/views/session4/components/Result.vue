<template>
  <div class="Result">
    <p>Reaction time : {{ score }} ms</p>
    <p class="rank"> {{rank }}</p>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['score'],
  data() {
    return {
      rank: null
    }
  },
  mounted() {
    if (this.score < 250) {
      this.rank = 'Ninja fingers'
    } else if (this.score < 400) {
      this.rank = 'Rapid reflexes'
    } else {
      this.rank = 'Snail peace...'
    }
  }
}
</script>

<style scoped>
  .rank {
    font-size: 18px;
    font-weight: 700;
    color: #909090;
  }
</style>