// // import { useEffect, useMemo, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { ArrowLeft, Save, User, FileText, Calculator, Printer } from "lucide-react";

// // import TopBar from "../components/TopBar";
// // import FormField, { inputClasses } from "../components/FormField";
// // import LineItemsTable, { makeEmptyLine } from "../components/LineItemsTable";

// // import { loadClients, loadClientDetails } from "../redux/slices/clientsSlice";
// // import { loadItems } from "../redux/slices/itemsSlice";
// // import {
// //   loadOrderById,
// //   saveNewOrder,
// //   saveExistingOrder,
// //   clearCurrentOrder,
// // } from "../redux/slices/ordersSlice";

// // import { calcOrderTotals, formatCurrency } from "../utils/calculations";

// // /* ---------------- EMPTY FORM ---------------- */
// // const emptyForm = {
// //   customerId: "",
// //   customerName: "",
// //   address1: "",
// //   address2: "",
// //   address3: "",
// //   city: "",
// //   state: "",
// //   postCode: "",
// //   invoiceNo: "",
// //   invoiceDate: new Date().toISOString().slice(0, 10),
// //   referenceNo: "",
// //   lines: [makeEmptyLine()],
// // };

// // /* ---------------- INVOICE NO ---------------- */
// // const generateInvoiceNo = () => {
// //   const now = new Date();
// //   const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
// //   const rand = String(Math.floor(100 + Math.random() * 900));
// //   return `INV-${yyyymm}-${rand}`;
// // };

// // /* ---------------- COMPONENT ---------------- */
// // export default function SalesOrder() {
// //   const { id } = useParams();
// //   const isEditMode = Boolean(id);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const clients = useSelector((state) => state.clients.list);
// //   const items = useSelector((state) => state.items.list);
// //   const currentOrder = useSelector((state) => state.orders.currentOrder);
// //   const saveStatus = useSelector((state) => state.orders.saveStatus);

// //   const [form, setForm] = useState({
// //     ...emptyForm,
// //     invoiceNo: generateInvoiceNo(),
// //   });

// //   /* ---------------- LOAD DATA ---------------- */
// //   useEffect(() => {
// //     dispatch(loadClients());
// //     dispatch(loadItems());

// //     if (isEditMode) dispatch(loadOrderById(id));

// //     return () => dispatch(clearCurrentOrder());
// //   }, [dispatch, id, isEditMode]);

// //   /* ---------------- LOAD EDIT DATA ---------------- */
// //   useEffect(() => {
// //     if (isEditMode && currentOrder) {
// //       setForm({
// //         ...currentOrder,
// //         lines: currentOrder.lines.map((l) => ({
// //           ...makeEmptyLine(),
// //           ...l,
// //         })),
// //       });
// //     }
// //   }, [isEditMode, currentOrder]);

// //   /* ---------------- TOTALS ---------------- */
// //   const totals = useMemo(() => calcOrderTotals(form.lines), [form.lines]);

// //   /* ---------------- CUSTOMER CHANGE ---------------- */
// //   const handleCustomerChange = async (customerId) => {
// //     const client = clients.find((c) => c.id === customerId);

// //     setForm((f) => ({
// //       ...f,
// //       customerId,
// //       customerName: client?.name || "",
// //     }));

// //     if (!customerId) return;

// //     const data = await dispatch(loadClientDetails(customerId)).unwrap();

// //     setForm((f) => ({
// //       ...f,
// //       ...data,
// //     }));
// //   };

// //   /* ---------------- FIELD UPDATE ---------------- */
// //   const updateField = (field, value) => {
// //     setForm((f) => ({ ...f, [field]: value }));
// //   };

// //   /* ---------------- SAVE ---------------- */
// //   const handleSave = async () => {
// //     const payload = { ...form, ...totals };

// //     if (isEditMode) {
// //       await dispatch(saveExistingOrder({ id, order: payload }));
// //     } else {
// //       await dispatch(saveNewOrder(payload));
// //     }

// //     navigate("/");
// //   };

// //   /* ---------------- PRINT ---------------- */
// //   const handlePrint = () => window.print();

// //   /* ---------------- UI ---------------- */
// //   return (
// //     <div className="min-h-screen bg-paper">
// //       <TopBar
// //         left={
// //           <button
// //             onClick={() => navigate("/")}
// //             className="flex items-center gap-2 text-sm text-ink/60 hover:text-ink"
// //           >
// //             <ArrowLeft size={16} /> Back
// //           </button>
// //         }
// //         right={
// //           <div className="flex gap-2">
// //             {isEditMode && (
// //               <button
// //                 onClick={handlePrint}
// //                 className="flex items-center gap-2 border px-4 py-2 text-sm"
// //               >
// //                 <Printer size={16} /> Print
// //               </button>
// //             )}

// //             <button
// //               onClick={handleSave}
// //               disabled={saveStatus === "saving"}
// //               className="flex items-center gap-2 bg-ledger px-4 py-2 text-sm text-white"
// //             >
// //               <Save size={16} />
// //               {saveStatus === "saving" ? "Saving..." : "Save"}
// //             </button>
// //           </div>
// //         }
// //       />

// //       <main className="mx-auto max-w-5xl space-y-6 p-6">
// //         {/* CUSTOMER */}
// //         <section>
// //           <h2 className="flex items-center gap-2 text-lg">
// //             <User size={18} /> Customer
// //           </h2>

// //           <FormField label="Customer">
// //             <select
// //               value={form.customerId}
// //               onChange={(e) => handleCustomerChange(e.target.value)}
// //               className={inputClasses}
// //             >
// //               <option value="">Select</option>
// //               {clients.map((c) => (
// //                 <option key={c.id} value={c.id}>
// //                   {c.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </FormField>
// //         </section>

// //         {/* INVOICE */}
// //         <section>
// //           <h2 className="flex items-center gap-2 text-lg">
// //             <FileText size={18} /> Invoice
// //           </h2>

// //           <div className="grid gap-4 md:grid-cols-3">
// //             <FormField label="Invoice No">
// //               <input
// //                 value={form.invoiceNo}
// //                 onChange={(e) => updateField("invoiceNo", e.target.value)}
// //                 className={inputClasses}
// //               />
// //             </FormField>

// //             <FormField label="Date">
// //               <input
// //                 type="date"
// //                 value={form.invoiceDate}
// //                 onChange={(e) => updateField("invoiceDate", e.target.value)}
// //                 className={inputClasses}
// //               />
// //             </FormField>

// //             <FormField label="Reference">
// //               <input
// //                 value={form.referenceNo}
// //                 onChange={(e) => updateField("referenceNo", e.target.value)}
// //                 className={inputClasses}
// //               />
// //             </FormField>
// //           </div>
// //         </section>

// //         {/* ITEMS */}
// //         <LineItemsTable
// //           lines={form.lines}
// //           items={items}
// //           onChange={(lines) => setForm((f) => ({ ...f, lines }))}
// //         />

// //         {/* TOTALS */}
// //         <section>
// //           <h2 className="flex items-center gap-2 text-lg">
// //             <Calculator size={18} /> Totals
// //           </h2>

// //           <div className="max-w-sm space-y-2">
// //             <div className="flex justify-between">
// //               <span>Total</span>
// //               <span>{formatCurrency(totals.totalIncl)}</span>
// //             </div>
// //           </div>
// //         </section>

// //         {/* SAVE BUTTON */}
// //         <div className="flex justify-end">
// //           <button
// //             onClick={handleSave}
// //             disabled={saveStatus === "saving"}
// //             className="bg-ledger px-5 py-2 text-white"
// //           >
// //             Save Order
// //           </button>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Save, User, FileText, Calculator, Printer } from "lucide-react";
// import TopBar from "../components/TopBar";
// import FormField, { inputClasses } from "../components/FormField";
// import LineItemsTable, { makeEmptyLine } from "../components/LineItemsTable";
// import { loadClients, loadClientDetails } from "../redux/slices/clientsSlice";
// import { loadItems } from "../redux/slices/itemsSlice";
// import {
//   loadOrderById,
//   saveNewOrder,
//   saveExistingOrder,
//   clearCurrentOrder,
// } from "../redux/slices/ordersSlice";
// import { calcOrderTotals, formatCurrency } from "../utils/calculations";

// const emptyForm = {
//   customerId: "",
//   customerName: "",
//   address1: "",
//   address2: "",
//   address3: "",
//   city: "",
//   state: "",
//   postCode: "",
//   invoiceNo: "",
//   invoiceDate: new Date().toISOString().slice(0, 10),
//   referenceNo: "",
//   lines: [makeEmptyLine()],
// };

// function generateInvoiceNo() {
//   const now = new Date();
//   const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
//   const suffix = String(Math.floor(100 + Math.random() * 900));
//   return `INV-${yyyymm}-${suffix}`;
// }

// export default function SalesOrder() {
//   const { id } = useParams();
//   const isEditMode = Boolean(id);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const clients = useSelector((state) => state.clients.list);
//   const items = useSelector((state) => state.items.list);
//   const currentOrder = useSelector((state) => state.orders.currentOrder);
//   const saveStatus = useSelector((state) => state.orders.saveStatus);

//   const [form, setForm] = useState({ ...emptyForm, invoiceNo: generateInvoiceNo() });

//   useEffect(() => {
//     dispatch(loadClients());
//     dispatch(loadItems());
//     if (isEditMode) {
//       dispatch(loadOrderById(id));
//     }
//     return () => dispatch(clearCurrentOrder());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (isEditMode && currentOrder) {
//       setForm({
//         customerId: currentOrder.customerId,
//         customerName: currentOrder.customerName,
//         address1: currentOrder.address1,
//         address2: currentOrder.address2,
//         address3: currentOrder.address3,
//         city: currentOrder.city,
//         state: currentOrder.state,
//         postCode: currentOrder.postCode,
//         invoiceNo: currentOrder.invoiceNo,
//         invoiceDate: currentOrder.invoiceDate,
//         referenceNo: currentOrder.referenceNo,
//         lines: currentOrder.lines.map((l) => ({ ...makeEmptyLine(), ...l })),
//       });
//     }
//   }, [isEditMode, currentOrder]);

//   const totals = useMemo(() => calcOrderTotals(form.lines), [form.lines]);

//   async function handleCustomerChange(customerId) {
//     const client = clients.find((c) => c.id === customerId);
//     setForm((f) => ({ ...f, customerId, customerName: client ? client.name : "" }));
//     if (customerId) {
//       const result = await dispatch(loadClientDetails(customerId)).unwrap();
//       setForm((f) => ({
//         ...f,
//         address1: result.address1,
//         address2: result.address2,
//         address3: result.address3,
//         city: result.city,
//         state: result.state,
//         postCode: result.postCode,
//       }));
//     }
//   }

//   function updateField(field, value) {
//     setForm((f) => ({ ...f, [field]: value }));
//   }

//   async function handleSave() {
//     const payload = { ...form, ...totals };
//     if (isEditMode) {
//       await dispatch(saveExistingOrder({ id, order: payload }));
//     } else {
//       await dispatch(saveNewOrder(payload));
//     }
//     navigate("/");
//   }

//   function handlePrint() {
//     window.print();
//   }

//   return (
//     <div className="min-h-screen bg-paper">
//       <TopBar
//         left={
//           <button
//             onClick={() => navigate("/")}
//             className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
//           >
//             <ArrowLeft size={16} /> Back
//           </button>
//         }
//         right={
//           <div className="flex items-center gap-2">
//             {isEditMode && (
//               <button
//                 onClick={handlePrint}
//                 className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-paper"
//               >
//                 <Printer size={16} /> Print
//               </button>
//             )}
//             <button
//               onClick={handleSave}
//               disabled={saveStatus === "saving"}
//               className="inline-flex items-center gap-2 rounded-md bg-ledger px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ledger-dark disabled:opacity-60"
//             >
//               <Save size={16} /> {saveStatus === "saving" ? "Saving..." : "Save Order"}
//             </button>
//           </div>
//         }
//       />

//       <div className="border-b border-line bg-surface px-8 py-3">
//         <h1 className="font-display text-2xl font-semibold text-ink">
//           {isEditMode ? "Edit Sales Order" : "New Sales Order"}
//         </h1>
//       </div>

//       <main className="mx-auto max-w-6xl space-y-6 px-8 py-8">
//         {/* Customer Details */}
//         <section className="rounded-lg border border-line bg-surface p-5">
//           <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
//             <User size={18} className="text-ledger" /> Customer Details
//           </h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormField label="Customer">
//               <select
//                 value={form.customerId}
//                 onChange={(e) => handleCustomerChange(e.target.value)}
//                 className={inputClasses}
//               >
//                 <option value="">-- Select a customer --</option>
//                 {clients.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </FormField>
//             <div />
//             <FormField label="Address Line 1">
//               <input
//                 type="text"
//                 value={form.address1}
//                 onChange={(e) => updateField("address1", e.target.value)}
//                 className={inputClasses}
//               />
//             </FormField>
//             <FormField label="Address Line 2">
//               <input
//                 type="text"
//                 value={form.address2}
//                 onChange={(e) => updateField("address2", e.target.value)}
//                 className={inputClasses}
//               />
//             </FormField>
//             <FormField label="Address Line 3">
//               <input
//                 type="text"
//                 value={form.address3}
//                 onChange={(e) => updateField("address3", e.target.value)}
//                 className={inputClasses}
//               />
//             </FormField>
//             <div className="grid grid-cols-3 gap-4">
//               <FormField label="City / Suburb">
//                 <input
//                   type="text"
//                   value={form.city}
//                   onChange={(e) => updateField("city", e.target.value)}
//                   className={inputClasses}
//                 />
//               </FormField>
//               <FormField label="State">
//                 <input
//                   type="text"
//                   value={form.state}
//                   onChange={(e) => updateField("state", e.target.value)}
//                   className={inputClasses}
//                 />
//               </FormField>
//               <FormField label="Post Code">
//                 <input
//                   type="text"
//                   value={form.postCode}
//                   onChange={(e) => updateField("postCode", e.target.value)}
//                   className={inputClasses}
//                 />
//               </FormField>
//             </div>
//           </div>
//         </section>

//         {/* Invoice Details */}
//         <section className="rounded-lg border border-line bg-surface p-5">
//           <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
//             <FileText size={18} className="text-ledger" /> Invoice Details
//           </h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <FormField label="Invoice No">
//               <input
//                 type="text"
//                 value={form.invoiceNo}
//                 onChange={(e) => updateField("invoiceNo", e.target.value)}
//                 className={`${inputClasses} font-mono-tab`}
//               />
//             </FormField>
//             <FormField label="Invoice Date">
//               <input
//                 type="date"
//                 value={form.invoiceDate}
//                 onChange={(e) => updateField("invoiceDate", e.target.value)}
//                 className={inputClasses}
//               />
//             </FormField>
//             <FormField label="Reference No">
//               <input
//                 type="text"
//                 placeholder="e.g. PO-1234"
//                 value={form.referenceNo}
//                 onChange={(e) => updateField("referenceNo", e.target.value)}
//                 className={inputClasses}
//               />
//             </FormField>
//           </div>
//         </section>

//         {/* Line Items */}
//         <LineItemsTable
//           lines={form.lines}
//           items={items}
//           onChange={(lines) => setForm((f) => ({ ...f, lines }))}
//         />

//         {/* Totals */}
//         <section className="rounded-lg border border-line bg-surface p-5">
//           <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
//             <Calculator size={18} className="text-ledger" /> Order Totals
//           </h2>
//           <div className="ml-auto max-w-sm space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-ink/50">Total Excl. Tax</span>
//               <span className="font-mono-tab text-ink/80">
//                 {formatCurrency(totals.totalExcl)}
//               </span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-ink/50">Total Tax</span>
//               <span className="font-mono-tab text-ink/80">
//                 {formatCurrency(totals.totalTax)}
//               </span>
//             </div>
//             <div className="ledger-double-rule flex justify-between pb-2 pt-2 text-base">
//               <span className="font-semibold text-ink">Total Incl. Tax</span>
//               <span className="font-mono-tab text-lg font-bold text-ledger-dark">
//                 {formatCurrency(totals.totalIncl)}
//               </span>
//             </div>
//           </div>
//         </section>

//         <div className="flex justify-end pb-4">
//           <button
//             onClick={handleSave}
//             disabled={saveStatus === "saving"}
//             className="inline-flex items-center gap-2 rounded-md bg-ledger px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ledger-dark disabled:opacity-60"
//           >
//             <Save size={16} /> {saveStatus === "saving" ? "Saving..." : "Save Order"}
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, User, FileText, Calculator, Printer } from "lucide-react";
import TopBar from "../components/TopBar";
import FormField, { inputClasses } from "../components/FormField";
import LineItemsTable, { makeEmptyLine } from "../components/LineItemsTable";
import { loadClients, loadClientDetails } from "../redux/slices/clientsSlice";
import { loadItems } from "../redux/slices/itemsSlice";
import {
  loadOrderById,
  saveNewOrder,
  saveExistingOrder,
  clearCurrentOrder,
} from "../redux/slices/ordersSlice";
import { calcOrderTotals, formatCurrency } from "../utils/calculations";

const emptyForm = {
  customerId: "",
  customerName: "",
  address1: "",
  address2: "",
  address3: "",
  city: "",
  state: "",
  postCode: "",
  invoiceNo: "",
  invoiceDate: new Date().toISOString().slice(0, 10),
  referenceNo: "",
  lines: [makeEmptyLine()],
};

function generateInvoiceNo() {
  const now = new Date();
  const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const suffix = String(Math.floor(100 + Math.random() * 900));
  return `INV-${yyyymm}-${suffix}`;
}

export default function SalesOrder() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clients = useSelector((state) => state.clients.list);
  const items = useSelector((state) => state.items.list);
  const currentOrder = useSelector((state) => state.orders.currentOrder);
  const saveStatus = useSelector((state) => state.orders.saveStatus);

  const [form, setForm] = useState({ ...emptyForm, invoiceNo: generateInvoiceNo() });

  useEffect(() => {
    dispatch(loadClients());
    dispatch(loadItems());
    if (isEditMode) {
      dispatch(loadOrderById(id));
    }
    return () => dispatch(clearCurrentOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditMode && currentOrder) {
      setForm({
        customerId: currentOrder.customerId,
        customerName: currentOrder.customerName,
        address1: currentOrder.address1,
        address2: currentOrder.address2,
        address3: currentOrder.address3,
        city: currentOrder.city,
        state: currentOrder.state,
        postCode: currentOrder.postCode,
        invoiceNo: currentOrder.invoiceNo,
        invoiceDate: currentOrder.invoiceDate,
        referenceNo: currentOrder.referenceNo,
        lines: currentOrder.lines.map((l) => ({ ...makeEmptyLine(), ...l })),
      });
    }
  }, [isEditMode, currentOrder]);

  const totals = useMemo(() => calcOrderTotals(form.lines), [form.lines]);

  async function handleCustomerChange(customerId) {
    const client = clients.find((c) => c.id === customerId);
    setForm((f) => ({ ...f, customerId, customerName: client ? client.name : "" }));
    if (customerId) {
      const result = await dispatch(loadClientDetails(customerId)).unwrap();
      setForm((f) => ({
        ...f,
        address1: result.address1,
        address2: result.address2,
        address3: result.address3,
        city: result.city,
        state: result.state,
        postCode: result.postCode,
      }));
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    const payload = { ...form, ...totals };
    if (isEditMode) {
      await dispatch(saveExistingOrder({ id, order: payload }));
    } else {
      await dispatch(saveNewOrder(payload));
    }
    navigate("/");
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        left={
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
          >
            <ArrowLeft size={16} /> Back
          </button>
        }
        right={
          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-paper"
              >
                <Printer size={16} /> Print
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="inline-flex items-center gap-2 rounded-md bg-ledger px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ledger-dark disabled:opacity-60"
            >
              <Save size={16} /> {saveStatus === "saving" ? "Saving..." : "Save Order"}
            </button>
          </div>
        }
      />

      <div className="border-b border-line bg-surface px-8 py-3">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {isEditMode ? "Edit Sales Order" : "New Sales Order"}
        </h1>
      </div>

      <main className="mx-auto max-w-6xl space-y-6 px-8 py-8">
        {/* Customer Details */}
        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <User size={18} className="text-ledger" /> Customer Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Customer">
              <select
                value={form.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className={inputClasses}
              >
                <option value="">-- Select a customer --</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormField>
            <div />
            <FormField label="Address Line 1">
              <input
                type="text"
                value={form.address1}
                onChange={(e) => updateField("address1", e.target.value)}
                className={inputClasses}
              />
            </FormField>
            <FormField label="Address Line 2">
              <input
                type="text"
                value={form.address2}
                onChange={(e) => updateField("address2", e.target.value)}
                className={inputClasses}
              />
            </FormField>
            <FormField label="Address Line 3">
              <input
                type="text"
                value={form.address3}
                onChange={(e) => updateField("address3", e.target.value)}
                className={inputClasses}
              />
            </FormField>
            <div className="grid grid-cols-3 gap-4">
              <FormField label="City / Suburb">
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={inputClasses}
                />
              </FormField>
              <FormField label="State">
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Post Code">
                <input
                  type="text"
                  value={form.postCode}
                  onChange={(e) => updateField("postCode", e.target.value)}
                  className={inputClasses}
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Invoice Details */}
        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <FileText size={18} className="text-ledger" /> Invoice Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField label="Invoice No">
              <input
                type="text"
                value={form.invoiceNo}
                onChange={(e) => updateField("invoiceNo", e.target.value)}
                className={`${inputClasses} font-mono-tab`}
              />
            </FormField>
            <FormField label="Invoice Date">
              <input
                type="date"
                value={form.invoiceDate}
                onChange={(e) => updateField("invoiceDate", e.target.value)}
                className={inputClasses}
              />
            </FormField>
            <FormField label="Reference No">
              <input
                type="text"
                placeholder="e.g. PO-1234"
                value={form.referenceNo}
                onChange={(e) => updateField("referenceNo", e.target.value)}
                className={inputClasses}
              />
            </FormField>
          </div>
        </section>

        {/* Line Items */}
        <LineItemsTable
          lines={form.lines}
          items={items}
          onChange={(lines) => setForm((f) => ({ ...f, lines }))}
        />

        {/* Totals */}
        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Calculator size={18} className="text-ledger" /> Order Totals
          </h2>
          <div className="ml-auto max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink/50">Total Excl. Tax</span>
              <span className="font-mono-tab text-ink/80">
                {formatCurrency(totals.totalExcl)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink/50">Total Tax</span>
              <span className="font-mono-tab text-ink/80">
                {formatCurrency(totals.totalTax)}
              </span>
            </div>
            <div className="ledger-double-rule flex justify-between pb-2 pt-2 text-base">
              <span className="font-semibold text-ink">Total Incl. Tax</span>
              <span className="font-mono-tab text-lg font-bold text-ledger-dark">
                {formatCurrency(totals.totalIncl)}
              </span>
            </div>
          </div>
        </section>

        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 rounded-md bg-ledger px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ledger-dark disabled:opacity-60"
          >
            <Save size={16} /> {saveStatus === "saving" ? "Saving..." : "Save Order"}
          </button>
        </div>
      </main>
    </div>
  );
}
