import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";

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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default authSlice.reducer;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI, x) => {
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
