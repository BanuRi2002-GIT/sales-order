import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    list: [],
  },
  reducers: {
    setClients: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setClients } = clientsSlice.actions;
export default clientsSlice.reducer;

/* MOCK THUNK */
export const loadClients = () => async (dispatch) => {
  dispatch(
    setClients([
      { id: "1", name: "John Doe" },
      { id: "2", name: "ABC Company" },
    ])
  );
};

export const loadClientDetails = (id) => async () => {
  return {
    address1: "No 10",
    address2: "Main Street",
    address3: "",
    city: "Galle",
    state: "Southern",
    postCode: "80000",
  };
};