import customAxios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// user interface
interface User {
    firstName: string;
    lastName: string;
    email: string;
    maxStorage: number;
}

// user state interface
interface UserState {
    user: User | null;
    isLoading: boolean;
    success: string | null;
    error: string | null;
}

// async actions
// login
export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { email: string; password: string }, thunkAPI) => {
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
            firstName: string;
            lastName: string;
            email: string;
            password: string;
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
    async (data: { email: string }, thunkAPI) => {
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
    async (data: { token: string; password: string; password_confirmation: string }, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/reset-password", data);
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// verify token
export const verifyToken = createAsyncThunk(
    "user/verifyToken",
    async (_, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/verify-token");
            return resp.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// get user from storage
const getUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
}

const initialState: UserState = {
    user: getUser(),
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
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as string;
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
                state.success = action.payload.message as string;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as string;
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
                state.success = action.payload.message as string;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as string;
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
                state.success = action.payload.message as string;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as string;
            })
            // verify token
            .addCase(verifyToken.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
                state.success = null;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = action.payload as User;
                state.isLoading = false;
                state.success = null;
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                localStorage.removeItem("user");
                state.user = null;
                state.isLoading = false;
                state.success = null;
                state.error = action.payload as string;
            })
    },
});

export default userSlice.reducer;
