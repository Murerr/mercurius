<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      hide-overlay
      app
      color="primary">
      <v-list color="primary" dark>
        <v-list-item
          v-for="(item, i) in drawerItems"
          :key="i"
          :to="item.to"
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" app dark>
      <v-app-bar-nav-icon v-show="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="d-none d-sm-block pa-0" style="width: 100%; max-width: 120px">
        <v-btn to="/" width="100%" plain nuxt>{{title}}</v-btn>
      </v-toolbar-title>
      <v-container fluid :class="$vuetify.breakpoint.xs ? 'px-0' :'' " >
        <v-autocomplete
          v-model="select"
          :loading="loadingSearchedItems"
          :items="searchedItems"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="What are you looking for?"
          solo-inverted
        ></v-autocomplete>
      </v-container>
      <v-spacer />
      <v-btn color="transparent" :icon="$vuetify.breakpoint.xs" depressed to="/login">
        <v-icon>mdi-account</v-icon>
        {{loginText}}
      </v-btn>
        <v-btn color="transparent" :icon="$vuetify.breakpoint.xs" depressed to="/cart" nuxt>
        <v-badge left color="accent" :content="cartBadge">
          <v-icon>mdi-cart</v-icon>
          {{cartText}}
        </v-badge>
        </v-btn>
    </v-app-bar>
    <v-main>
       <nuxt keep-alive/>
    </v-main>
    <v-footer  app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<style>
::-webkit-scrollbar {
  width: 0px;  /* Remove scrollbar space */
}

</style>
<script>
export default {
  computed:{
    loginText () {
      return this.$vuetify.breakpoint.xs ? '' : 'Log In'
    },
    cartText () {
      return this.$vuetify.breakpoint.xs ? '' : 'Cart'
    },
    cartBadge () {
      // TODO getstorageItemList
      return this.$store.state.cart.list.length > 0 ? this.$store.state.cart.list.length : '0'
    },
  },
  data () {
    return {
      drawer: false,
      drawerItems: [
        { icon: 'mdi-apps', title: 'Welcome', to: '/' },
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire'},
        { icon: 'mdi-account', title: 'Log In', to: '/login'},
        { icon: 'mdi-cart', title: 'Cart', to: '/cart'}
      ],
      title: 'Mercurius',
      select: null,
      search: null,
      searchedItems: [],
      loadingSearchedItems: false,
    }
  }
}
</script>
