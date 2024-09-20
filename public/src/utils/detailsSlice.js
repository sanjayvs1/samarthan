import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "details",
  initialState: {
    response: {},
  },
  reducers: {
    loadDetails: (state, action) => {
      state.response = action.payload;
    },
  },
});

export const { loadDetails } = detailSlice.actions;
export default detailSlice.reducer;
