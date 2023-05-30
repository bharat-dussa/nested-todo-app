import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import { APP_ROUTE } from "./utils/route.constant";
import DashboardPage from "./pages/dashboard/dashboard.page";

const AppRouter = () => {
  return (
    <Routes>
      <Route caseSensitive path={APP_ROUTE.LOGIN} element={<LoginPage />} />
      <Route
        caseSensitive
        path={APP_ROUTE.DASHBOARD}
        element={<DashboardPage />}
      />
    </Routes>
  );
};

export default AppRouter;
