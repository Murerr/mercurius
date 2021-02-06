<template>
  <v-container fluid>
  <v-row justify="center">
    <!--Does not hide at 750 px ?-->
    <v-col cols="2" class="pl-0 pt-0 hidden-sm-and-down">
      <v-sheet color="primary" dark>
        <v-list color="transparent">
          <v-list-item
            v-for="(category) in categories"
            :key="n"
            link
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ category.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-sheet>
    </v-col>
    <v-col cols="10">
      <template v-for="(category) in categories">
        <strong>{{ category.name }}</strong>
        <v-container fluid>
          <v-row justify="start">
            <v-col v-for="(product, col_index) in categoryProducts(category.name.toLowerCase())" key="col_index" md="3">
              <v-card height="100%" class="d-flex flex-column">
                <v-img :src="product.images['0']" width="100%"></v-img>
                <v-card-title class="h6" >
                  {{product.name}}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <p class="text-body-1 font-weight-bold red--text text--darken-1 pl-2 mb-0">{{product.price}}€</p>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" text>
                    Add to cart
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
    }
  },
  methods: {
    categoryProducts(category){
      return this.products.filter(product => product.category === category);
    }
  },
  async asyncData(context) {
    const categories = await context.$axios.$get(`https://us-central1-mercurius-7777.cloudfunctions.net/mercuriusApi/v1/categories`)
    const products = await context.$axios.$get(`https://us-central1-mercurius-7777.cloudfunctions.net/mercuriusApi/v1/products`)
    return {categories: categories, products:products}
  }
}
</script>
