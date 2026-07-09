import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './hooks/useAppState';
import ClientSite from './pages/ClientSite';
import OpsPortal from './pages/OpsPortal';
import PortalGate from './components/PortalGate';
import CapturePage from './pages/CapturePage';

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<ClientSite />} />
          <Route path="/portal" element={<PortalGate><OpsPortal /></PortalGate>} />
          <Route path="/portal/*" element={<PortalGate><OpsPortal /></PortalGate>} />
          <Route path="/capture" element={<PortalGate><CapturePage /></PortalGate>} />
        </Routes>
      </AppProvider>
    </HashRouter>
  );
}
