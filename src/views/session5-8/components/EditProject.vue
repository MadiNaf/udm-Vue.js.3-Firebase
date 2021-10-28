<template>
  <div id="editproject">
    <h3 class="title">Edit project</h3>
    <form @submit.prevent="handleSubmit">
      <label>Title</label>
      <input type="text" v-model="title" required>
      <label>Details</label>
      <textarea v-model="details" required></textarea>
      <button>Update Project</button>
  </form>
  </div>
</template>

<script>
import { firestoreService } from '../../../firebase/config'

export default {
  props: ['id'],
  data() {
    return {
      title: '',
      details: '',
    }
  },
  mounted() {
    firestoreService.collection('projects')
      .doc(this.id)
      .get()
      .then( res => {
         if (!res.exists) {
              throw Error('That post does not exists')
            }
            this.title = res.data().title
            this.details = res.data().details
      })
  },
  methods: {
    handleSubmit() {
      firestoreService.collection('projects')
      .doc(this.id)
      .update({ title: this.title, details: this.details })
      this.$router.push({name: 'ProjectPlanner'})
    }
  }
}
</script>

<style scoped>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0
  }
  input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
  }
  form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }
</style>