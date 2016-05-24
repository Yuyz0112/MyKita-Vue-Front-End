<template>
  <div class="slider">
    <img :src="images[i]" id="show">
    <div class="columns thumbs is-mobile">
      <div v-for="image of images" class="column" v-if="$index < 5">
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
  #show
    max-height: 300px
  .thumbs
    max-width: 600px
    margin: 0 auto
    .column
    img
      max-height: 75px
      transition: .5s ease
      cursor: pointer
      opacity: .5
      &.active
        opacity: 1
      &:hover
        opacity: .8
</style>