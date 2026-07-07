// export const calcOrderTotals = (lines = []) => {
//   let totalExcl = 0;
//   let totalTax = 0;

//   lines.forEach((l) => {
//     const qty = Number(l.quantity || 0);
//     const price = Number(l.price || 0);
//     const taxRate = Number(l.taxRate || 0);

//     const lineTotal = qty * price;
//     const tax = (lineTotal * taxRate) / 100;

//     totalExcl += lineTotal;
//     totalTax += tax;
//   });

//   return {
//     totalExcl,
//     totalTax,
//     totalIncl: totalExcl + totalTax,
//   };
// };

// export const formatCurrency = (value = 0) => {
//   return new Intl.NumberFormat("en-LK", {
//     style: "currency",
//     currency: "LKR",
//   }).format(value);
// };

export function calcLineAmounts({ quantity, price, taxRate }) {
  const qty = Number(quantity) || 0;
  const p = Number(price) || 0;
  const rate = Number(taxRate) || 0;

  const exclAmount = qty * p;
  const taxAmount = (exclAmount * rate) / 100;
  const inclAmount = exclAmount + taxAmount;

  return {
    exclAmount: round2(exclAmount),
    taxAmount: round2(taxAmount),
    inclAmount: round2(inclAmount),
  };
}

export function calcOrderTotals(lines) {
  return lines.reduce(
    (totals, line) => {
      const { exclAmount, taxAmount, inclAmount } = calcLineAmounts(line);
      return {
        totalExcl: round2(totals.totalExcl + exclAmount),
        totalTax: round2(totals.totalTax + taxAmount),
        totalIncl: round2(totals.totalIncl + inclAmount),
      };
    },
    { totalExcl: 0, totalTax: 0, totalIncl: 0 }
  );
}

export function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(value) {
  return `$${round2(value).toFixed(2)}`;
}

export function formatDisplayDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}
