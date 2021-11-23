<template>
  <div id="multi-upload">
    <form class="" >
      <input type="file" @change="handleFile1">
      <input type="file" @change="handleFile2">
      <input type="file" @change="handleFile3">

      <button type="button" @click="handleClick()">upload</button>
    </form>

    <div class="">
      <ul>
        <li v-for="file in files" :key="file.url">{{file.url}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'

export default {
  setup() {
    const { url, uploadImage } = useStorage()

    const file1 = ref(null)
    const file2 = ref(null)
    const file3 = ref(null)

    const files = ref([])

    const handleFile1 = (e) => {
      console.log('file1')
      const seleted = e.target.files[0]
      file1.value = seleted
    }

    const handleFile2 = (e) => {
      console.log('file2')
      const seleted = e.target.files[0]
      file2.value = seleted
    }

    const handleFile3 = (e) => {
      console.log('file3')
      const seleted = e.target.files[0]
      file3.value = seleted
    }

    const upload = async (file) => {
      await uploadImage(file)
      files.value.push({url: url.value})
    }

    const handleClick = async () => {
      console.log('submit')
      if (file1.value && file2.value && file3.value) {
        console.log('can_upload')
        await upload(file1.value)
        await upload(file2.value)
        await upload(file3.value)
      }
      console.log('files :: ', files.value)
    }

    return { handleFile1, handleFile2, handleFile3, handleClick, files}
  }
}
</script>

<style scoped>
  button {
    cursor: pointer;
  }
</style>
