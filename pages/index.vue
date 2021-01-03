<template>
  <v-container fluid>
  <v-row justify="center">
    <!--Does not hide at 750 px ?-->
    <v-col cols="2" class="pl-0 pt-0 hidden-sm-and-down">
      <v-sheet>
        <v-list color="transparent">
          <v-list-item
            v-for="n in 5"
            :key="n"
            link
          >
            <v-list-item-content>
              <v-list-item-title>
                List Item {{ n }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
            link
            color="grey lighten-4"
          >
            <v-list-item-content>
              <v-list-item-title>
                Refresh
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
    <v-col cols="10">
      <template v-for="(category,n) in categories">
        <strong>{{ category.name }}</strong>
        <v-container>
          <v-row justify="start">
            <v-col v-for="(product, n) in categoryProducts(category.name.toLowerCase())" key="n" md="3">
              <v-card width="344px">
                <v-img :src="product.images['0']" height="250px"></v-img>
                <v-card-title class="h6" >
                  {{product.name}}
                </v-card-title>

                <v-card-subtitle class="body-1" color="secondary">
                  {{product.price}} €
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="accent" text>
                    Add to cart
                  </v-btn>
                  <v-spacer/>
                  <v-btn color="accent" icon>
                    <v-icon>mdi-share-variant</v-icon>
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
