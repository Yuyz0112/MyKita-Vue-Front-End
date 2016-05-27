<template>
  <div class="hello">
    <h1 @mouseover="hovered = true"
        @mouseout="hovered = false">{{ hovered }}</h1>
    <ul>
      <template v-for="_obj in myObj">
        <li>{{ $key }}</li>
        <ul>
          <template v-for="__obj in _obj">
            <li>{{ $key }}</li>
            <ul>
              <template v-for="value in __obj">
                <li>{{ $key }}</li>
                <ul>
                  <li>{{ value }}</li>
                </ul>
              </template>
            </ul>
          </template>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hovered: false,
      myObj: {
        a1: {
          a2: {
            a3: 'value A'
          }
        },
        b1: {
          b2: {
            b3: 'value B'
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
ul {
  list-style: disc;
  padding-left: 10px;
}
</style>
