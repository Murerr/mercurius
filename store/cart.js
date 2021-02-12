export const state = () => ({
  list: []
})

export const mutations = {
  add(state, product) {
    let index = state.list.indexOf(product);
    console.log(index);
    console.log(product);
    if (index !== -1){
      state.list[index].quantity++;
    } else {
      product["quantity"] = 1;
      state.list.push(product);
    }
    localStorage.setItem( 'cart', JSON.stringify( state ) );
  },
  incrementQuantity(state, index){
    state.list[index].quantity++;
  },
  decrementQuantity(state, index){
    if (state.list[index].quantity > 1){
      state.list[index].quantity--;
    }
  },
  updateQuantity(state, {amount, index}){
    state.list[index].quantity = amount;
  },
  removeProductFromCart(state, index) {
    state.list.splice(index, 1)
  }
}
export const getters = {
  getProductById: (state) => (index) => {
    return state.list[index]
  },
  getProductPriceById: (state) => (index) => {
    return state.list[index].price;
  },
  getProductQuantityById: (state) => (index) => {
    return state.list[index].quantity;
  },
  getProductPriceTotalById: (state) => (index) => {
    console.log(index);
    let product = state.list[index];
    console.log(product);
    let result = product.quantity * product.price;
    return result;
  },
}
