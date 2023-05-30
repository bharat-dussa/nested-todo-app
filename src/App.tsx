import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router.route";
import { AuthProvider } from "./store/app-store";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppRouter />
          <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
