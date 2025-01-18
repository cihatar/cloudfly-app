import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import sidebarReducer from "./sidebar/sidebarReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

