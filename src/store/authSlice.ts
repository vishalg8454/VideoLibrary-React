import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//PayloadAction is a TS
import axios from "axios";
// import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const tokenFromLocalStorage = localStorage.getItem("token");

interface AuthState {
  user: { token: string | null; firstName: string; lastName: string };
  status: string;
}

const initialState: AuthState = {
  user: { token: tokenFromLocalStorage, firstName: "", lastName: "" },
  status: STATUSES.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = STATUSES.IDLE;
      state.user = { token: null, firstName: "", lastName: "" };
      localStorage.removeItem("token");
      toast("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = {
          token: action.payload.encodedToken,
          firstName: action.payload.foundUser.firstName,
          lastName: action.payload.foundUser.lastName,
        };
        localStorage.setItem("token", action.payload.encodedToken);
        toast(`Welcome ${state.user.firstName + state.user.lastName}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        if (action && action.payload) {
          console.log(action.payload.message);
          toast(action.payload.message);
        }
      })
      .addCase(signupUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = STATUSES.IDLE;
        state.user = {
          token: action.payload.encodedToken,
          firstName: action.payload.createdUser.firstName,
          lastName: action.payload.createdUser.lastName,
        };
        localStorage.setItem("token", action.payload.encodedToken);
        toast(`Welcome ${state.user.firstName + state.user.lastName}`);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        if (action && action.payload) {
          console.log(action.payload.message);
          toast(action.payload.message);
        }
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  any,
  UserAttributes,
  { rejectValue: Error }
>("auth/login", async (data, thunkAPI) => {
  try {
    const { email, password } = data;
    const res = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as Error);
  }
});

export const signupUser = createAsyncThunk<
  any,
  UserAttributes,
  { rejectValue: Error }
>("auth/signup", async (data, thunkAPI) => {
  try {
    const { firstName, lastName, email, password } = data;
    const res = await axios.post("/api/auth/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as Error);
  }
});
