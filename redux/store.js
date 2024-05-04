import { configureStore } from "@reduxjs/toolkit";
import { AdminQueryApi } from "./query/AdminQuery";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [AdminQueryApi.reducerPath]: AdminQueryApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AdminQueryApi.middleware)
})

setupListeners(store.dispatch);