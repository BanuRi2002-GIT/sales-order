export default function TopBar({ left, right }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}