import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Ecommerce from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import Tables from "./pages/Tables";
import OrderDetails from "./components/order";

export default function App() {
  return (
    <>
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Ecommerce />} />
          {/* Tables */}
          <Route path="/refunds" element={<Tables />} />
          {/* Order Details */}
          <Route path="/refunds/:id" element={<OrderDetails />} />
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
