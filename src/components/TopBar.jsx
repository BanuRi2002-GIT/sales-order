// export default function TopBar({ left, right }) {
//   return (
//     <div className="flex justify-between items-center p-4 border-b">
//       <div>{left}</div>
//       <div>{right}</div>
//     </div>
//   );
// }

export default function TopBar({ left, right }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/95 px-8 py-4 backdrop-blur">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

