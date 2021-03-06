import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const tokenFromLocalStorage = localStorage.getItem("token");

const initialState = {
  user: { token: tokenFromLocalStorage, firstName: "", lastName: "" },
  status: STATUSES.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = STATUSES.IDLE;
      state.user = {};
      localStorage.removeItem("token");
      toast('Logged out successfully!')
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
        console.log(action.payload.message);
        toast(action.payload.message);
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
        console.log(action.payload.message);
        toast(action.payload.message);
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const { email, password } = data;
      const res = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);
