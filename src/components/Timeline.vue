<template>
  <ul class="timeline">
    <li v-for="item of timeline">
      <time class="time"><span>{{ item.time }}</span></time>
      <div class="node" :class="$index === 0? 'first-node':''"></div>
      <div class="label" v-for="title of item.title">
        <h4>{{ title }}</h4>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    timeline: {
      type: Array,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .timeline
    max-width: 600px
    margin-left: auto
    margin-right: auto
  .node.first-node
    background: #fd5236
    box-shadow: 0 0 0 4px #fea99b
</style>