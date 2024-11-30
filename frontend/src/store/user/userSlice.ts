import customAxios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// user interface
interface User {
    firstName: String;
    lastName: String;
    email: String;
    maxStorage: Number;
}

// user state interface
interface UserState {
    user: User | null;
    isLoading: Boolean;
    success: String | null;
    error: String | null;
}

// async actions
// login
export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { email: String; password: String }, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/login", data);
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// register
export const registerUser = createAsyncThunk(
    "user/register",
    async (
        data: {
            firstName: String;
            lastName: String;
            email: String;
            password: String;
        },
        thunkAPI
    ) => {
        try {
            const resp = await customAxios.post("/api/auth/register", data);
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// forgot password
export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (data: { email: String }, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/forgot-password", data);
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// reset password
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data: { token: String; password: String; password_confirmation: String }, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/reset-password", data);
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

const initialState: UserState = {
    user: null,
    isLoading: false,
    success: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // login
            .addCase(loginUser.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload as User;
                state.isLoading = false;
                state.success = null;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as String;
            })
            // register
            .addCase(registerUser.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = action.payload.message as String;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as String;
            })
            // forgot password
            .addCase(forgotPassword.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = action.payload.message as String;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as String;
            })
            // reset password
            .addCase(resetPassword.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = action.payload.message as String;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as String;
            })
    },
});

export default userSlice.reducer;
