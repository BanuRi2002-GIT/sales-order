// import { createSlice } from "@reduxjs/toolkit";

// const ordersSlice = createSlice({
//   name: "orders",
//   initialState: {
//     currentOrder: null,
//     saveStatus: "idle",
//   },
//   reducers: {
//     setOrder: (state, action) => {
//       state.currentOrder = action.payload;
//     },
//     setSaveStatus: (state, action) => {
//       state.saveStatus = action.payload;
//     },
//     clearCurrentOrder: (state) => {
//       state.currentOrder = null;
//     },
//   },
// });

// export const {
//   setOrder,
//   setSaveStatus,
//   clearCurrentOrder,
// } = ordersSlice.actions;

// export default ordersSlice.reducer;

// /* MOCK THUNKS */
// export const loadOrderById = (id) => async (dispatch) => {
//   dispatch(
//     setOrder({
//       customerId: "1",
//       customerName: "John Doe",
//       address1: "No 10",
//       address2: "",
//       address3: "",
//       city: "Galle",
//       state: "Southern",
//       postCode: "80000",
//       invoiceNo: "INV-202601-123",
//       invoiceDate: "2026-01-01",
//       referenceNo: "",
//       lines: [],
//     })
//   );
// };

// export const saveNewOrder = () => async (dispatch) => {
//   dispatch(setSaveStatus("saving"));
//   setTimeout(() => dispatch(setSaveStatus("idle")), 1000);
// };

// export const saveExistingOrder = () => async (dispatch) => {
//   dispatch(setSaveStatus("saving"));
//   setTimeout(() => dispatch(setSaveStatus("idle")), 1000);
// };


// import { createSlice } from "@reduxjs/toolkit";

// const ordersSlice = createSlice({
//   name: "orders",
//   initialState: {
//     currentOrder: null,
//     saveStatus: "idle",
//   },
//   reducers: {
//     setOrder: (state, action) => {
//       state.currentOrder = action.payload;
//     },
//     setSaveStatus: (state, action) => {
//       state.saveStatus = action.payload;
//     },
//     clearCurrentOrder: (state) => {
//       state.currentOrder = null;
//     },
//   },
// });

// export const { setOrder, setSaveStatus, clearCurrentOrder } =
//   ordersSlice.actions;

// export default ordersSlice.reducer;

// /* MOCK API */
// export const loadOrderById = () => async (dispatch) => {
//   dispatch(
//     setOrder({
//       customerId: "1",
//       customerName: "Test Customer",
//       address1: "No 1",
//       city: "Galle",
//       state: "South",
//       postCode: "80000",
//       invoiceNo: "INV-001",
//       invoiceDate: "2026-01-01",
//       referenceNo: "",
//       lines: [],
//     })
//   );
// };

// export const saveNewOrder = () => async (dispatch) => {
//   dispatch(setSaveStatus("saving"));
//   setTimeout(() => dispatch(setSaveStatus("idle")), 800);
// };

// export const saveExistingOrder = () => async (dispatch) => {
//   dispatch(setSaveStatus("saving"));
//   setTimeout(() => dispatch(setSaveStatus("idle")), 800);
// };

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;

// Temporary placeholder actions
export const loadOrderById = (id) => async () => {};
export const saveNewOrder = (data) => async () => {};
export const saveExistingOrder = (id, data) => async () => {};

export default ordersSlice.reducer;