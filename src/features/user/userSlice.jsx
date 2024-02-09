import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const initialState = {
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      const { name, email, photo } = action.payload;
      state.name = name;
      state.email = email;
      state.photo = photo;
    },

    setSignOutState: (state) => {
      state.name = "";
      state.email = "";
      state.photo = "";
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

// Move the useSelector inside a functional component or a custom hook


export default userSlice.reducer;
