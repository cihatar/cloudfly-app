import customAxios from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// user interface
export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    maxStorage?: number;
    profileImage?: string;
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

// logout
export const logout = createAsyncThunk(
    "user/logout",
    async (_, thunkAPI) => {
        try {
            const resp = await customAxios.post("/api/auth/logout");
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

// update name
export const updateName = createAsyncThunk(
    "user/updateName",
    async (data: { firstName: string, lastName: string }, thunkAPI) => {
        try {
            const resp = await customAxios.put("/api/user/update-name", data);
            return resp.data; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// change password
export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (data: { oldPassword: string, password: string, password_confirmation: string }, thunkAPI) => {
        try {
            const resp = await customAxios.put("/api/user/change-password", data);
            return resp.data; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// delete user
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_, thunkAPI) => {
        try {
            const resp = await customAxios.delete("/api/user/delete");
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
            .addCase(loginUser.pending, (state) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            // register
            .addCase(registerUser.pending, (state) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("user");
                state.user = null;
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false;
            })
            // forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            // reset password
            .addCase(resetPassword.pending, (state) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            // verify token
            .addCase(verifyToken.pending, (state) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = action.payload as User;
                state.isLoading = false;
            })
            .addCase(verifyToken.rejected, (state) => {
                localStorage.removeItem("user");
                state.user = null;
                state.isLoading = false;
            })
            // update name
            .addCase(updateName.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateName.fulfilled, (state, action) => {
                const user = getUser();
                user.firstName = action.payload.firstName;
                user.lastName = action.payload.lastName;
                state.user = user;
                localStorage.setItem("user", JSON.stringify(state.user));
                state.isLoading = false;
            })
            .addCase(updateName.rejected, (state) => {
                state.isLoading = false;
            })
            // update password
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state) => {
                state.isLoading = false;
            })
             // delete user
             .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                localStorage.removeItem("user");
                state.user = null;
                state.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export default userSlice.reducer;
