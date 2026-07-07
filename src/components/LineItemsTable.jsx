import { Plus, Trash2 } from "lucide-react";

/* ---------------- EMPTY LINE ---------------- */
export const makeEmptyLine = () => ({
  itemId: "",
  description: "",
  quantity: 1,
  price: 0,
  taxRate: 0,
});

/* ---------------- TABLE COMPONENT ---------------- */
export default function LineItemsTable({ lines, items, onChange }) {
  /* ADD ROW */
  const addRow = () => {
    onChange([...lines, makeEmptyLine()]);
  };

  /* REMOVE ROW */
  const removeRow = (index) => {
    const updated = lines.filter((_, i) => i !== index);
    onChange(updated);
  };

  /* UPDATE ROW */
  const updateRow = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = value;
    onChange(updated);
  };

  /* SELECT ITEM */
  const handleItemChange = (index, itemId) => {
    const item = items.find((i) => i.id === itemId);

    const updated = [...lines];
    updated[index] = {
      ...updated[index],
      itemId,
      description: item ? item.name : "",
      price: item ? item.price : 0,
    };

    onChange(updated);
  };

  return (
    <section className="rounded-lg border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Line Items</h2>

        <button
          onClick={addRow}
          className="flex items-center gap-1 rounded bg-ledger px-3 py-1 text-white"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Tax %</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="border-t">
                {/* ITEM SELECT */}
                <td className="p-2">
                  <select
                    value={line.itemId}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="w-full border px-2 py-1"
                  >
                    <option value="">Select item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* DESCRIPTION */}
                <td className="p-2">
                  <input
                    value={line.description}
                    onChange={(e) =>
                      updateRow(index, "description", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>

                {/* QUANTITY */}
                <td className="p-2">
                  <input
                    type="number"
                    value={line.quantity}
                    onChange={(e) =>
                      updateRow(index, "quantity", Number(e.target.value))
                    }
                    className="w-20 border px-2 py-1 text-center"
                  />
                </td>

                {/* PRICE */}
                <td className="p-2">
                  <input
                    type="number"
                    value={line.price}
                    onChange={(e) =>
                      updateRow(index, "price", Number(e.target.value))
                    }
                    className="w-24 border px-2 py-1 text-right"
                  />
                </td>

                {/* TAX */}
                <td className="p-2">
                  <input
                    type="number"
                    value={line.taxRate}
                    onChange={(e) =>
                      updateRow(index, "taxRate", Number(e.target.value))
                    }
                    className="w-20 border px-2 py-1 text-center"
                  />
                </td>

                {/* DELETE */}
                <td className="p-2 text-center">
                  <button
                    onClick={() => removeRow(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}