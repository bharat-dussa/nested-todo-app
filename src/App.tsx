import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router.route";
import { AuthProvider } from "./store/app-store";
import { Toaster } from 'react-hot-toast';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
        

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
