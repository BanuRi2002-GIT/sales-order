// import { createSlice } from "@reduxjs/toolkit";

// const clientsSlice = createSlice({
//   name: "clients",
//   initialState: {
//     list: [],
//   },
//   reducers: {
//     setClients: (state, action) => {
//       state.list = action.payload;
//     },
//   },
// });

// export const { setClients } = clientsSlice.actions;
// export default clientsSlice.reducer;

// /* MOCK THUNK */
// export const loadClients = () => async (dispatch) => {
//   dispatch(
//     setClients([
//       { id: "1", name: "John Doe" },
//       { id: "2", name: "ABC Company" },
//     ])
//   );
// };

// export const loadClientDetails = (id) => async () => {
//   return {
//     address1: "No 10",
//     address2: "Main Street",
//     address3: "",
//     city: "Galle",
//     state: "Southern",
//     postCode: "80000",
//   };
// };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchClients, fetchClientById } from "../../services/clientsService";
import { fetchClients, fetchClientById } from "../Services/clientsService";
export const loadClients = createAsyncThunk("clients/loadClients", async () => {
  return await fetchClients();
});

export const loadClientDetails = createAsyncThunk(
  "clients/loadClientDetails",
  async (clientId) => {
    return await fetchClientById(clientId);
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    list: [], // [{ id, name }]
    detailsById: {}, // cache of full address details keyed by id
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(loadClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadClientDetails.fulfilled, (state, action) => {
        state.detailsById[action.payload.id] = action.payload;
      });
  },
});

export default clientsSlice.reducer;
