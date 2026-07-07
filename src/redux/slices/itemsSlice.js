import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;

export const loadItems = () => async (dispatch) => {
  dispatch(
    setItems([
      { id: "1", name: "Rice", price: 200 },
      { id: "2", name: "Sugar", price: 150 },
    ])
  );
};