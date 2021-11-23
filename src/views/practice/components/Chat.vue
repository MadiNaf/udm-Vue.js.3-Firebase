<template>
  <div id="chat-container">
    <section class="chat-window">
      <div class="title">modal</div>
      <div class="messages">text</div>
    </section>

    <section class="chat-input">
      <div class="textarea-container">
        <textarea name="name" rows="8"></textarea>
      </div>
      <div class="btn-container">
        <button type="button" class="btn-send">button</button>
      </div>
    </section>
  </div>
</template>

<script>
export default { }
</script>

<style scoped>
  #chat-container {
    background: #F2F2F2;
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
  }

  .messages {
    width: 100%;
    height: 40px;
    background: #F5F5F5;
  }

  .chat-input {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }

  .textarea-container {
    width: 80%;
  }
  textarea {
    width: 100%;
  }

.btn-container {
  width: 20%;
}
  button {
    width: 100%;
  }
</style>
