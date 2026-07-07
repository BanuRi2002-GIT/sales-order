export const calcOrderTotals = (lines = []) => {
  let totalExcl = 0;
  let totalTax = 0;

  lines.forEach((l) => {
    const qty = Number(l.quantity || 0);
    const price = Number(l.price || 0);
    const taxRate = Number(l.taxRate || 0);

    const lineTotal = qty * price;
    const tax = (lineTotal * taxRate) / 100;

    totalExcl += lineTotal;
    totalTax += tax;
  });

  return {
    totalExcl,
    totalTax,
    totalIncl: totalExcl + totalTax,
  };
};

export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
  }).format(value);
};