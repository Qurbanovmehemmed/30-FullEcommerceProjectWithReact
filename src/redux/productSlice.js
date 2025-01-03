import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addproduct",
  async (product) => {
    const { data } = await axios.post(baseUrl, product);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async (product) => {
    const { data } = await axios.put(`${baseUrl}/${product.id}`, product);
    return data;
  }
);

const initialState = {
  products: [],
  allProducts: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.products = state.allProducts.filter((product) =>
        product.title
          .toLowerCase()
          .includes(action.payload.trim().toLowerCase())
      );
    },
    sortAzProduct: (state) => {
      state.products = state.products.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    },
    sortZaProduct: (state) => {
      state.products = state.products.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    },
    sortLowProduct: (state) => {
      state.products = state.products.sort((a, b) => a.price - b.price);
    },
    sortHighProduct: (state) => {
      state.products = state.products.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
      state.allProducts = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });
    });
  },
});
export default productSlice.reducer;
export const {
  extraReducers,
  searchProduct,
  sortAzProduct,
  sortZaProduct,
  sortLowProduct,
  sortHighProduct,
} = productSlice.actions;
