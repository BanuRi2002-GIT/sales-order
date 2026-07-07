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

// 

// src/pages/Home.jsx

import { Receipt } from "lucide-react";

export default function Home() {
  const list = [];
  const status = "idle";

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sales Orders</h1>
          <p className="text-gray-500">
            Manage and track all sales orders
          </p>
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add New Order
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Invoice Date</th>
              <th className="p-3 text-left">Reference</th>
              <th className="p-3 text-center">Items</th>
            </tr>
          </thead>

          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="5" className="p-5 text-center">
                  Loading orders...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center">
                  <Receipt size={30} className="mx-auto mb-2" />
                  <p>No sales orders found.</p>
                </td>
              </tr>
            ) : (
              list.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{order.invoiceNo}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.invoiceDate}</td>
                  <td className="p-3">{order.referenceNo || "-"}</td>
                  <td className="p-3 text-center">
                    {order.lines?.length || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}