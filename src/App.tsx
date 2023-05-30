import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router.route";
import { AuthProvider } from "./store/app-store";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5468ff"
          }
        }}
      >
        <AuthProvider>
          <AppRouter />
          <Toaster position="top-center" />
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
