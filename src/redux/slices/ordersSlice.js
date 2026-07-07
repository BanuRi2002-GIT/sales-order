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

// 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchOrders,
//   fetchOrderById,
//   createOrder,
//   updateOrder,
// } from "../../services/ordersService";
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  updateOrder,
} from "../../Services/orderService";


export const loadOrders = createAsyncThunk("orders/loadOrders", async () => {
  return await fetchOrders();
});

export const loadOrderById = createAsyncThunk("orders/loadOrderById", async (id) => {
  return await fetchOrderById(id);
});

export const saveNewOrder = createAsyncThunk("orders/saveNewOrder", async (order) => {
  return await createOrder(order);
});

export const saveExistingOrder = createAsyncThunk(
  "orders/saveExistingOrder",
  async ({ id, order }) => {
    return await updateOrder(id, order);
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    currentOrder: null,
    status: "idle",
    saveStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.saveStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadOrderById.pending, (state) => {
        state.status = "loading";
        state.currentOrder = null;
      })
      .addCase(loadOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(saveNewOrder.pending, (state) => {
        state.saveStatus = "saving";
      })
      .addCase(saveNewOrder.fulfilled, (state, action) => {
        state.saveStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(saveNewOrder.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(saveExistingOrder.pending, (state) => {
        state.saveStatus = "saving";
      })
      .addCase(saveExistingOrder.fulfilled, (state, action) => {
        state.saveStatus = "succeeded";
        state.list = state.list.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
      })
      .addCase(saveExistingOrder.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
