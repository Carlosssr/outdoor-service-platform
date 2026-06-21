import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './hooks/useAppState';
import ClientSite from './pages/ClientSite';
import OpsPortal from './pages/OpsPortal';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<ClientSite />} />
          <Route path="/portal" element={<OpsPortal />} />
          <Route path="/portal/*" element={<OpsPortal />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
