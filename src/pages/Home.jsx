// // src/pages/Home.jsx

// import { Receipt } from "lucide-react";

// export default function Home() {
//   const list = [];
//   const status = "idle";

//   return (
//     <div className="min-h-screen p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Sales Orders</h1>
//           <p className="text-gray-500">
//             Manage and track all sales orders
//           </p>
//         </div>

//         <button
//           className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Add New Order
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden border rounded-lg">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Invoice No</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Invoice Date</th>
//               <th className="p-3 text-left">Reference</th>
//               <th className="p-3 text-center">Items</th>
//             </tr>
//           </thead>

//           <tbody>
//             {status === "loading" ? (
//               <tr>
//                 <td colSpan="5" className="p-5 text-center">
//                   Loading orders...
//                 </td>
//               </tr>
//             ) : list.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-10 text-center">
//                   <Receipt size={30} className="mx-auto mb-2" />
//                   <p>No sales orders found.</p>
//                 </td>
//               </tr>
//             ) : (
//               list.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   <td className="p-3">{order.invoiceNo}</td>
//                   <td className="p-3">{order.customerName}</td>
//                   <td className="p-3">{order.invoiceDate}</td>
//                   <td className="p-3">{order.referenceNo || "-"}</td>
//                   <td className="p-3 text-center">
//                     {order.lines?.length || 0}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Receipt } from "lucide-react";
import TopBar from "../components/TopBar";
import { loadOrders } from "../redux/slices/ordersSlice";
import { formatCurrency, formatDisplayDate } from "../utils/calculations";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const totalValue = list.reduce((sum, o) => sum + calcOrderIncl(o), 0);

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        left={
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Sales Orders</h1>
            <p className="text-sm text-ink/50">Manage and track all sales orders</p>
          </div>
        }
        right={
          <button
            onClick={() => navigate("/sales-order")}
            className="inline-flex items-center gap-2 rounded-md bg-ledger px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ledger-dark"
          >
            <Plus size={18} /> Add New Order
          </button>
        }
      />

      <main className="mx-auto max-w-6xl px-8 py-8">
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink/50">
                <th className="px-6 py-3.5">Invoice No</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Invoice Date</th>
                <th className="px-6 py-3.5">Reference</th>
                <th className="px-6 py-3.5 text-right">Total Excl</th>
                <th className="px-6 py-3.5 text-right">Total Incl</th>
                <th className="px-6 py-3.5 text-center">Items</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && list.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-ink/40">
                    Loading orders...
                  </td>
                </tr>
              )}

              {status !== "loading" && list.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center">
                    <Receipt className="mx-auto mb-3 text-ink/20" size={32} />
                    <p className="text-ink/60">No sales orders yet.</p>
                    <p className="text-sm text-ink/40">
                      Click "Add New Order" to create your first one.
                    </p>
                  </td>
                </tr>
              )}

              {list.map((order) => (
                <tr
                  key={order.id}
                  onDoubleClick={() => navigate(`/sales-order/${order.id}`)}
                  className="cursor-pointer border-b border-line/70 last:border-b-0 hover:bg-paper"
                  title="Double-click to edit"
                >
                  <td className="px-6 py-4 font-mono-tab font-medium text-ledger-dark">
                    {order.invoiceNo}
                  </td>
                  <td className="px-6 py-4 text-ink">{order.customerName}</td>
                  <td className="px-6 py-4 text-ink/70">
                    {formatDisplayDate(order.invoiceDate)}
                  </td>
                  <td className="px-6 py-4 font-mono-tab text-ink/60">
                    {order.referenceNo || "—"}
                  </td>
                  <td className="px-6 py-4 text-right font-mono-tab text-ink/70">
                    {formatCurrency(calcOrderExcl(order))}
                  </td>
                  <td className="px-6 py-4 text-right font-mono-tab font-semibold text-ink">
                    {formatCurrency(calcOrderIncl(order))}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper text-xs font-medium text-ink/60">
                      {order.lines.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {list.length > 0 && (
          <p className="mt-4 text-sm text-ink/50">
            <span className="font-medium text-ink">{list.length}</span> orders
            <span className="mx-2 text-ink/20">|</span>
            Total value:{" "}
            <span className="font-mono-tab font-semibold text-ink">
              {formatCurrency(totalValue)}
            </span>
            <span className="mx-2 text-ink/20">|</span>
            Double-click a row to edit
          </p>
        )}
      </main>
    </div>
  );
}

function calcOrderExcl(order) {
  return order.lines.reduce((sum, l) => sum + (Number(l.quantity) || 0) * (Number(l.price) || 0), 0);
}

function calcOrderIncl(order) {
  return order.lines.reduce((sum, l) => {
    const excl = (Number(l.quantity) || 0) * (Number(l.price) || 0);
    const tax = (excl * (Number(l.taxRate) || 0)) / 100;
    return sum + excl + tax;
  }, 0);
}
