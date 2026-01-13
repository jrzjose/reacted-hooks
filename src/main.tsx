import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.tsx';
import Provider from './context/AppContext.tsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout";
import StockImages from './components/StockImages';
import Single from "./components/Single"
import NotFound from "./components/NotFound"
import Profile from "./components/Profile"
import AuthProvider, { useAuthContext } from './context/AuthContext';

const AppRoutes = () => {
  const { currentUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/images/:id" element={<Single />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="*" element={<NotFound />}/>
      {currentUser && <Route path="/stockimages" element={<StockImages/>} />}
    </Routes>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
            <Layout>
              <AppRoutes>
                <App />
              </AppRoutes>
          </Layout>
        </Router>
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
