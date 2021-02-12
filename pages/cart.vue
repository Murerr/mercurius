<template>
	<v-container v-if="cart.length > 0">
    <v-card class="d-flex flex-column mt-4 mb-4" width="100%" v-for="(product, productIndex) in cart" :key="productIndex">
      <v-row class="fill-height" align="start" justify="start">
        <v-col justify="center" md="2">
          <v-img :src="product.images['0']" max-width="250px" />
        </v-col>
        <v-col md="5">
          <p class="text-h6 ma-0">{{product.name}}</p><br>
          <p class="text-body-1">{{product.description}}</p>
          <v-row class="ma-0" align="center" justify="center">
            <v-btn raised @click="decrementQuantity(productIndex)" color="secondary">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field @change="updateQuantity($event, productIndex, product.quantity)" :value="product.quantity" text color="secondary"  class="mt-2 pl-1 pr-1"  min="1" type="number" pattern="[0-9.]+" label="Quantity"/>
            <v-btn raised @click="incrementQuantity(productIndex)" color="secondary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>

        </v-col>
        <v-spacer/>
        <v-col class="fill-height" align="center" justify="end" md="2">
          <v-btn bottom text @click="removeProductFromCart(productIndex)" color="secondary" text>
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn>
          <p class="text-h6 red--text text--darken-1">
            {{ Math.round((product.quantity * product.price) * 100) / 100 }}€
          </p>
        </v-col>
      </v-row>
    </v-card>
	</v-container>
	<v-container v-else>
		Your cart is empty
	</v-container>

</template>
<script>
export default {
	computed: {
    cart() {
      return this.$store.state.cart.list;
    },
	},
	data () {
		return {

		}
	},
  methods: {
    incrementQuantity(product){
      this.$store.commit('cart/incrementQuantity', product);
      this.$forceUpdate();
    },
    decrementQuantity(index){
      this.$store.commit('cart/decrementQuantity', index);
      this.$forceUpdate();
    },
    updateQuantity(amount, index, textfield){
      if (!amount || amount <= 0 || isNaN(amount) ){
        amount = '1';
      }
      this.$store.commit('cart/updateQuantity', {amount: parseInt(amount), index: index});
      textfield = amount
      this.$forceUpdate();
    },
    removeProductFromCart(index){
      this.$store.commit('cart/removeProductFromCart', index);
      /*this.$forceUpdate();*/
    },

  },
	created() {
		/*console.log(this.$store.state.cart.list);*/
	},
}
</script>
