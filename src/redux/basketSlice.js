import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket: (state, action) => {
      const product = action.payload
      const existingProduct = state.products.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += product.quantity
      } else {
        state.products.push(product)
      }
    },
    deleteBasket: (state, action) => {
      const productId = action.payload.id
      state.products = state.products.filter((product) => product.id !== productId)
    },
    plusBtn: (state, action) => {
      const product = action.payload
      const existingProduct = state.products.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      }
    },
    minusBtn: (state, action) => {
      const product = action.payload
      const existingProduct = state.products.find((item) => item.id === product.id)
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1
      }
    },
  },
})

export const { addBasket, deleteBasket, plusBtn, minusBtn } = basketSlice.actions
export default basketSlice.reducer
