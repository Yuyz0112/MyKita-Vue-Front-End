<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }} - {{ p.inventory }}
      <br>
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { getAllProducts, addToCart } from '../vuex/actions'
export default {
  vuex: {
    getters: {
      products: ({ products }) => products.all
    },
    actions: {
      getAllProducts,
      addToCart
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>