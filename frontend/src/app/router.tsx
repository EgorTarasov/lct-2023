import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages";

export default () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
