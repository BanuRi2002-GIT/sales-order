// export const inputClasses =
//   "w-full rounded border border-gray-300 px-3 py-2 text-sm";

// export default function FormField({ label, children }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium">{label}</label>
//       {children}
//     </div>
//   );
// }

export default function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20 disabled:bg-paper disabled:text-ink/50";
