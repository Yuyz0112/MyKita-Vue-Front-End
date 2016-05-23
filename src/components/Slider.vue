<template>
  <div class="slider">
    <img :src="images[i]">
    <div class="columns thumbs is-mobile">
      <div v-for="image of images" class="column">
        <img :src="image" :class="$index === i? 'active':''" @click="i = $index">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      i: 0
    }
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .thumbs
    max-width: 600px
    margin: 0 auto
    img
      transition: .5s ease
      cursor: pointer
      opacity: .5
      &.active
        opacity: 1
      &:hover
        opacity: .8
</style>