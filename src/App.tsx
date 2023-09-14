import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
const App = () => {
  return (
    // Route Path
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
      <Route path="admin/*" element={<AdminLayout />} />      
    </Routes>
  );
};

export default App;
