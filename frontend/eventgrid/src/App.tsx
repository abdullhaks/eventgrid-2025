import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/userRoutes";
import AdminRoutes from "./routes/admin/adminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
