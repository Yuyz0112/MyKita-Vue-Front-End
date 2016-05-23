<template>
  <div class="has-text-centered">
    <span class="loader"></span>
  </div>
</template>

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
</style>