import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import { APP_ROUTE } from "./utils/route.constant";
import DashboardPage from "./pages/dashboard/dashboard.page";
import { useAuth } from "./store/app-store";
import NotFoundPage from "./pages/not-found/not-found.page";
import { useEffect } from "react";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTE.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <Routes>
        <Route
          caseSensitive
          path={APP_ROUTE.DASHBOARD}
          element={<DashboardPage />}
        />
        <Route caseSensitive path={APP_ROUTE.HOME} element={<LoginPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route caseSensitive path={APP_ROUTE.HOME} element={<LoginPage />} />
      <Route caseSensitive path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
