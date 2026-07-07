// import { createSlice } from "@reduxjs/toolkit";

// const itemsSlice = createSlice({
//   name: "items",
//   initialState: {
//     list: [],
//   },
//   reducers: {
//     setItems: (state, action) => {
//       state.list = action.payload;
//     },
//   },
// });

// export const { setItems } = itemsSlice.actions;
// export default itemsSlice.reducer;

// export const loadItems = () => async (dispatch) => {
//   dispatch(
//     setItems([
//       { id: "1", name: "Rice", price: 200 },
//       { id: "2", name: "Sugar", price: 150 },
//     ])
//   );
// };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchItems } from "../../services/itemsService";
import { fetchItems } from "../../Services/itemsService";

export const loadItems = createAsyncThunk("items/loadItems", async () => {
  return await fetchItems();
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [], // [{ itemCode, description, price }]
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
