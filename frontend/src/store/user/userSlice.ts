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
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            // register
            .addCase(registerUser.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            // forgot password
            .addCase(forgotPassword.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            // reset password
            .addCase(resetPassword.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
            })
            // verify token
            .addCase(verifyToken.pending, (state, action) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = action.payload as User;
                state.isLoading = false;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                localStorage.removeItem("user");
                state.user = null;
                state.isLoading = false;
            })
    },
});

export default userSlice.reducer;
