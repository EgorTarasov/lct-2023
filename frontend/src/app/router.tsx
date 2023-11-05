import { Navigate, Route, Routes } from "react-router-dom";
import { Login, MainPage } from "../pages";
import PrivateRoute from "@/hoc/PrivateRoute.tsx";

export default () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      }
    />
    <Route path="/tasks">
      <Route index element={<h1>v</h1>} />
      <Route path="program" element={<h1>d</h1>} />
    </Route>
    <Route path="/events" element={<MainPage />} />
    <Route path="/me" element={<MainPage />} />
    <Route path="/shop" element={<MainPage />} />
    <Route path="/contacts" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
