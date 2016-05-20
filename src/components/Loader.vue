<template>
  <div class="has-text-centered">
    <span class="loader"></span>
    <p class="text">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'MyKita'
    }
  }
}
</script>

<style scoped lang="sass">
  @keyframes change-color
    0%
      border-color: #1fc8db
    35%
      border-color: #42afe3
    50%
      border-color: #53a1eb
    65%
      border-color: #42afe3
    100%
      border-color: #1fc8db
  @keyframes change-text
    0%
      letter-spacing: 5px
      text-indent: 5px
      opacity: 1
    50%
      letter-spacing: 20px
      text-indent: 20px
      opacity: .3
    100%
      letter-spacing: 5px
      text-indent: 5px
      opacity: 1
  div
    width: 200px
    margin: 0 auto
    .loader
      margin: 0 auto
      width: 100px
      height: 100px
      animation: change-color 1500ms infinite linear
      border: 4px solid #1fc8db
      opacity: .8
    .text
      font-size: 18px
      font-weight: bold
      animation: change-text 3000ms infinite linear
</style>