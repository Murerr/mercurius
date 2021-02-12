<template>
  <!--<div class="page-container">
    <div v-show="$store.state.cart.products.length">
      <h1>Your Shopping Cart</h1>
      <div class="products">
        <div class="paper surface" :key="index" v-for="(product, index) in $store.state.cart.products">
          <div class="product">
            <div class="image-and-name">
              <n-link :to="product_url(product)">
                <img :src="product.image_base + '/180/' + product.image" alt="">
              </n-link>
              <div>
                <n-link :to="product_url(product)">{{ product.name }}</n-link>
                <div v-if="product.size_id > 1">
                  <span class="faded">Size:</span> {{ product.size.size }}
                </div>
              </div>
            </div>
            <div class="align-right remove_button">
              <button class="outlined-button" @click="remove_product( product.id )" title="Remove Product"><img src="~assets/icons/trash-bin.svg" alt="Remove Product"></button>
            </div>
            <div class="modifiers">
              <div class="quantity-changer">
                <button class="outlined-button" @click="change_quantity_by_amount( index, -1 )" :disabled="product.quantity <= product.minimum_quantity" title="Decrease"><i class="icon icon-minus"></i></button>
                <input type="number" :value="product.quantity" @change="change_quantity($event, index)">
                <button class="outlined-button" @click="change_quantity_by_amount( index, 1 )" title="Increase"><i class="icon icon-plus"></i></button>
                <span class="stock-level" v-if="!product.unlimited_stock && product.stock"> &nbsp; of {{ product.stock }} units</span>
              </div>
            </div>
            <div class="align-right product-price">
              <div>
                <div class="price product-total">
                  <Currency :value="product.price * product.quantity" type="total"/>
                </div>
                <div class="faded">per unit <Currency :value="product.price"/></div>
              </div>
            </div>
          </div>
          <div class="error-message" v-show="!product.unlimited_stock && product.quantity > product.stock">
            Note that because your desired quantity is higher than the current stock level there may be delays in the shipment of your order.
          </div>
          <div class="product-actions">
            <n-link class="button outlined-button" :to="'/branding/' + product.id" v-if="product.prints.length > 0">Modify Branding</n-link>
            <n-link class="button" :to="'/branding/' + product.id" v-else>Add Branding</n-link>
          </div>


          <div v-show="product.prints.length > 0">
            <div class="print" v-for="(print, index) in product.prints" :key="index">
              <div>
                Branding on <span class="location">{{ print.location }}</span>
              </div>
              <div>
								<span class="faded">
									{{ print.print_method }}
									<template v-if="print.origination_per_colour">
										- {{ print.image_colours }} Colour<span v-if="print.image_colours > 1">s</span>
									</template>
								</span>
                <Currency :value="print.unit_price"/> x {{ product.quantity }} = <Currency :value="print.unit_price * product.quantity"/>
              </div>
              <div>
                Setup charge: <Currency :value="print.origination"/>
                <span v-if="print.origination_per_colour">
									x {{ print.image_colours }} Colour<span v-if="print.image_colours > 1">s</span> = <Currency :value="print.origination + ( (print.image_colours - 1) * print.origination_repeat )"/>
								</span>
              </div>
              <fieldset class="image-to-print" v-if="print.image.thumbnail">
                <legend>Image to print</legend>
                <img :src="print.image.thumbnail" alt="Thumbnail of image to print for this location on the product">
              </fieldset>
              <fieldset v-if="print.comment">
                <legend>Comment</legend>
                <pre>{{ print.comment }}</pre>
              </fieldset>
              <button class="clear-icon" @click="remove_print( product.id, print.location_id )" title="Remove Branding"><img src="~assets/icons/clear.svg" alt="Remove Branding"></button>
            </div>
            <div class="summary product-summary">
              <label class="faded">Product Total</label>
              <div class="price"><Currency :value="product_total( product )" type="total"/></div>
            </div>
          </div>
        </div>
      </div>

      <div class="paper surface">
        <div class="summary subtotal">
          <label class="faded">
            Subtotal ({{$store.state.cart.products.length}} item<span v-show="$store.state.cart.products.length > 1">s</span>)
          </label>
          <div class="price">
            <Currency :value="$store.state.cart.product_subtotal"/>
          </div>
        </div>
        <div class="primary-actions">
          <n-link class="button text-button" to="/search">Continue Shopping</n-link>
          <n-link class="button" to="/delivery-details">
            <span class="desktop">Delivery and Payment</span>
            <span class="mobile">Checkout</span>
          </n-link>
        </div>
      </div>
    </div>
    <div class="split-pair empty-cart" v-show="$store.state.cart.products.length == 0">
      <div>
        <h1>Your shopping cart is empty.</h1>
        <p>Add items to the cart and buy them quickly and conveniently.</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="small empty metal shopping cart">
      </div>
    </div>
  </div>-->
</template>

<script>

export default {
  components: {
  },
  head: {
    title: 'Cart',
  },
  methods: {
    product_total( product ) {
      let total = parseFloat((product.quantity * product.price).toFixed(2));
      product.prints.forEach((print) => {
        total += parseFloat(product.quantity * print.unit_price);
        total += parseFloat(print.origination);
        total += parseFloat((print.image_colours - 1) * print.origination_repeat);
      });
      return total;
    },
    change_quantity( event, index ) {
      this.$store.commit('cart/change_quantity', { index, quantity: parseInt(event.srcElement.value, 10) });
    },
    change_quantity_by_amount( index, amount ) {
      const product = this.$store.state.cart.products[ index ];
      this.$store.commit('cart/change_quantity', { index, quantity: parseInt(product.quantity + amount, 10) });
    },
    remove_product( id ) {
      this.$store.commit('cart/remove_product', id );
    },
    remove_print( product_id, location_id ) {
      this.$store.commit('cart/remove_print', {product_id, location_id} );
    },
    product_url(product) {
      // https://dev.fastbrand.ie/product/6317?colour=Green&size=Not%20Applicable
      let url = '/product/' + product.product_id + '?colour=' + encodeURIComponent( product.colour.colour );
      // size_id 1 == 'Not Applicable'
      if ( product.size_id && product.size_id > 1 ) {
        url += '&size=' + product.size.size;
      }
      return url;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  margin: 0 16px 16px;
}
legend {
  font-size: 0.9em;
}
.surface, .empty-cart {
  padding: 16px;
}
.split-pair {
  align-items: center;
}
.split-pair > div {
  width: 50%;
}
.empty-cart {
  color: #84949f;
}
.empty-cart img {
  max-width: 100%;
  width: 100%;
  background: radial-gradient(#fff, #f3f3f3);
  padding: 30px;
}

.products > div, .product-actions {
  margin: 0 0 16px;
}

.product {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.image-and-name {
  order: -1;
  display: flex;
  align-items: center;
  padding-left: 16px;

  flex-basis: 91.66667%;
  max-width: 91.66667%;
  width: 91.66667%;
}
.image-and-name img {
  max-height: 64px;
  margin-right: 8px;
}
.remove_button {
  order: -1;
  display: flex;
  align-items: center;
  padding-left: 8px;

  flex-basis: 8.33333%;
  max-width: 8.33333%;
  width: 8.33333%;
}
.remove_button button {
  border: none;
  box-shadow: none;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
}
.remove_button button:hover {
  background: none;
}
.remove_button img {
  width: 32px;
  height: 32px;
}
.modifiers {
  padding-left: 16px;
}
.quantity-changer {
  margin-right: 8px;
}
.product-price {
  margin-left: auto;
}
.product-price > div {
  margin-left: auto;
}
.modifiers, .product-price {
  order: -1;
  flex-basis: 50%;
  max-width: 50%;
  width: 50%;
  display: inline-flex;
  align-items: center;
}

.price {
  font-size: 24px;
}
.faded {
  font-size: 0.7em;
}

.primary-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.primary-actions > * {
  width: 100%;
  margin: 5px;
}
.primary-actions > *:first-child {
  order: 1;
}
.price_inline {
  display: inline-block;
}
.print {
  border-top: 1px solid #aaa;
  padding: 16px 0;
  position: relative;
}
.location {
  text-transform: uppercase;
}
.price {
  margin: 0 0 0 16px;
}
.subtotal {
  margin-bottom: 16px;
}
.product-summary {
  border-top: 1px solid #aaa;
  padding: 16px 0 0;
}
.image-to-print {
  display: inline-flex;
  margin: 8px 0;
  padding: 24px;
  border-radius: 4px;
  border: 1px dashed #767676;
}
@media (min-width: 576px) {
  .primary-actions {
    flex-wrap: nowrap;
  }
  .primary-actions > * {
    width: 50%;
  }
  .primary-actions > *:first-child {
    order: -1;
  }
}
@media (min-width: 768px) {
  .remove_button {
    order: 0;
  }
  .image-and-name {
    flex-basis: 50%;
    max-width: 50%;
    width: 50%;
  }
  .remove_button, .modifiers, .product-price {
    flex-basis: unset;
    max-width: unset;
    width: unset;
  }
  .faded {
    font-size: 1em;
  }
}
</style>
