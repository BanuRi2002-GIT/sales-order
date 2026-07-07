// import { Plus, Trash2 } from "lucide-react";

// /* ---------------- EMPTY LINE ---------------- */
// export const makeEmptyLine = () => ({
//   itemId: "",
//   description: "",
//   quantity: 1,
//   price: 0,
//   taxRate: 0,
// });

// /* ---------------- TABLE COMPONENT ---------------- */
// export default function LineItemsTable({ lines, items, onChange }) {
//   /* ADD ROW */
//   const addRow = () => {
//     onChange([...lines, makeEmptyLine()]);
//   };

//   /* REMOVE ROW */
//   const removeRow = (index) => {
//     const updated = lines.filter((_, i) => i !== index);
//     onChange(updated);
//   };

//   /* UPDATE ROW */
//   const updateRow = (index, field, value) => {
//     const updated = [...lines];
//     updated[index][field] = value;
//     onChange(updated);
//   };

//   /* SELECT ITEM */
//   const handleItemChange = (index, itemId) => {
//     const item = items.find((i) => i.id === itemId);

//     const updated = [...lines];
//     updated[index] = {
//       ...updated[index],
//       itemId,
//       description: item ? item.name : "",
//       price: item ? item.price : 0,
//     };

//     onChange(updated);
//   };

//   return (
//     <section className="rounded-lg border border-line bg-surface p-5">
//       <div className="mb-3 flex items-center justify-between">
//         <h2 className="text-lg font-semibold">Line Items</h2>

//         <button
//           onClick={addRow}
//           className="flex items-center gap-1 rounded bg-ledger px-3 py-1 text-white"
//         >
//           <Plus size={16} /> Add Item
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 text-left">Item</th>
//               <th className="p-2 text-left">Description</th>
//               <th className="p-2">Qty</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Tax %</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {lines.map((line, index) => (
//               <tr key={index} className="border-t">
//                 {/* ITEM SELECT */}
//                 <td className="p-2">
//                   <select
//                     value={line.itemId}
//                     onChange={(e) => handleItemChange(index, e.target.value)}
//                     className="w-full border px-2 py-1"
//                   >
//                     <option value="">Select item</option>
//                     {items.map((item) => (
//                       <option key={item.id} value={item.id}>
//                         {item.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 {/* DESCRIPTION */}
//                 <td className="p-2">
//                   <input
//                     value={line.description}
//                     onChange={(e) =>
//                       updateRow(index, "description", e.target.value)
//                     }
//                     className="w-full border px-2 py-1"
//                   />
//                 </td>

//                 {/* QUANTITY */}
//                 <td className="p-2">
//                   <input
//                     type="number"
//                     value={line.quantity}
//                     onChange={(e) =>
//                       updateRow(index, "quantity", Number(e.target.value))
//                     }
//                     className="w-20 border px-2 py-1 text-center"
//                   />
//                 </td>

//                 {/* PRICE */}
//                 <td className="p-2">
//                   <input
//                     type="number"
//                     value={line.price}
//                     onChange={(e) =>
//                       updateRow(index, "price", Number(e.target.value))
//                     }
//                     className="w-24 border px-2 py-1 text-right"
//                   />
//                 </td>

//                 {/* TAX */}
//                 <td className="p-2">
//                   <input
//                     type="number"
//                     value={line.taxRate}
//                     onChange={(e) =>
//                       updateRow(index, "taxRate", Number(e.target.value))
//                     }
//                     className="w-20 border px-2 py-1 text-center"
//                   />
//                 </td>

//                 {/* DELETE */}
//                 <td className="p-2 text-center">
//                   <button
//                     onClick={() => removeRow(index)}
//                     className="text-red-500"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }

import { Plus, Trash2 } from "lucide-react";
import { calcLineAmounts, formatCurrency } from "../utils/calculations";

let nextRowId = 1;
export function makeEmptyLine() {
  return {
    rowId: `row-${nextRowId++}`,
    itemCode: "",
    description: "",
    note: "",
    quantity: 1,
    price: 0,
    taxRate: 10,
  };
}

export default function LineItemsTable({ lines, items, onChange }) {
  function updateLine(index, patch) {
    const updated = lines.map((line, i) => (i === index ? { ...line, ...patch } : line));
    onChange(updated);
  }

  function handleItemSelect(index, itemCode) {
    const item = items.find((i) => i.itemCode === itemCode);
    updateLine(index, {
      itemCode,
      description: item ? item.description : "",
      price: item ? item.price : 0,
    });
  }

  function handleDescriptionSelect(index, description) {
    const item = items.find((i) => i.description === description);
    updateLine(index, {
      description,
      itemCode: item ? item.itemCode : "",
      price: item ? item.price : 0,
    });
  }

  function addLine() {
    onChange([...lines, makeEmptyLine()]);
  }

  function removeLine(index) {
    onChange(lines.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="font-display text-lg text-ink">Line Items</h2>
        <button
          type="button"
          onClick={addLine}
          className="inline-flex items-center gap-1.5 rounded-md border border-ledger px-3 py-1.5 text-sm font-medium text-ledger transition hover:bg-ledger hover:text-white"
        >
          <Plus size={16} /> Add Line
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink/50">
              <th className="w-10 px-4 py-2">#</th>
              <th className="px-2 py-2">Item Code</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">Note</th>
              <th className="w-20 px-2 py-2 text-right">Qty</th>
              <th className="w-24 px-2 py-2 text-right">Price</th>
              <th className="w-20 px-2 py-2 text-right">Tax %</th>
              <th className="w-28 px-2 py-2 text-right">Excl</th>
              <th className="w-28 px-2 py-2 text-right">Tax</th>
              <th className="w-28 px-4 py-2 text-right">Incl</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => {
              const { exclAmount, taxAmount, inclAmount } = calcLineAmounts(line);
              return (
                <tr key={line.rowId} className="border-t border-line/70">
                  <td className="px-4 py-2 font-mono-tab text-ink/40">{index + 1}</td>
                  <td className="px-2 py-2">
                    <select
                      value={line.itemCode}
                      onChange={(e) => handleItemSelect(index, e.target.value)}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm focus:border-ledger focus:outline-none"
                    >
                      <option value="">-- Select --</option>
                      {items.map((item) => (
                        <option key={item.itemCode} value={item.itemCode}>
                          {item.itemCode}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-2">
                    <select
                      value={line.description}
                      onChange={(e) => handleDescriptionSelect(index, e.target.value)}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm focus:border-ledger focus:outline-none"
                    >
                      <option value="">-- Select --</option>
                      {items.map((item) => (
                        <option key={item.itemCode} value={item.description}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      placeholder="Optional"
                      value={line.note}
                      onChange={(e) => updateLine(index, { note: e.target.value })}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm placeholder:text-ink/30 focus:border-ledger focus:outline-none"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={line.quantity}
                      onChange={(e) => updateLine(index, { quantity: e.target.value })}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-right font-mono-tab text-sm focus:border-ledger focus:outline-none"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.price}
                      onChange={(e) => updateLine(index, { price: e.target.value })}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-right font-mono-tab text-sm focus:border-ledger focus:outline-none"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={line.taxRate}
                      onChange={(e) => updateLine(index, { taxRate: e.target.value })}
                      className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-right font-mono-tab text-sm focus:border-ledger focus:outline-none"
                    />
                  </td>
                  <td className="px-2 py-2 text-right font-mono-tab text-ink/70">
                    {formatCurrency(exclAmount)}
                  </td>
                  <td className="px-2 py-2 text-right font-mono-tab text-ink/70">
                    {formatCurrency(taxAmount)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono-tab font-semibold text-ink">
                    {formatCurrency(inclAmount)}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      disabled={lines.length === 1}
                      title="Remove line"
                      className="text-ink/30 transition hover:text-danger disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
