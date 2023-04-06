import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://svp.hypen.blog";

export const adminLogin = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("adminToken", data.token);

      return data;
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "/auth/signup",
  async (
    { firstname, role, lastname, email, password },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${url}/auth/signup`,
        { firstname, role, lastname, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
