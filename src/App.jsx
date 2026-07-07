// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SalesOrder from "./pages/SalesOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Create new sales order */}
        <Route path="/sales-order" element={<SalesOrder />} />

        {/* Edit sales order */}
        <Route path="/sales-order/:id" element={<SalesOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;