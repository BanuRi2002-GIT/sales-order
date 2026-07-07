export const inputClasses =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm";

export default function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}