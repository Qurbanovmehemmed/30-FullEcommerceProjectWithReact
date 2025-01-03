import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import basketSlice from "./basketSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, basketSlice);

const store = configureStore({
  reducer: {
    todos: todosReducer,
    products: productSlice,
    wishlist: wishlistSlice,
    basket: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
});

export const persistor = persistStore(store);
export default store;

