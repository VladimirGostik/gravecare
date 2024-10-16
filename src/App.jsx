import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HlavnaStranka from './Pages/HlavnaStranka';
import UserDashboard from './Pages/UserDashboard';
import ConfirmOrders from './Pages/ConfirmOrders';
import PendingOrders from './Pages/PendingOrders';
import CompletedOrders from './Pages/CompletedOrders';
import EditProfile from './Pages/EditProfile';
import PortfolioSettings from './Pages/PortfolioSettings';
import ManageAppointments from './Pages/ManageAppointments';
import ManageServices from './Pages/ManageServices';
import Settings from './Pages/Settings';
import ProtectedRoute from './Components/ProtectedRoute';
import EntrepreneurDetailPage from './Pages/EntrepreneurDetailPage'; // Import novej stránky
import UserSettings from './Pages/UserSettings';
import WaitingOrders from './Pages/WaitingOrders';
import { AuthProvider } from './Context/AuthContext';
import { OrderProvider } from './Context/OrderContext'; // Import OrderProvider
import { ServiceProvider } from './Context/ServiceContext';
import { SettingsProvider } from './Context/SettingsContext'; // Importujte váš SettingsContext
import { EntrepreneurProvider } from './Context/EntrepreneurContext';
import OrdersCustomer from './Pages/OrdersCustomer';

function App() {
  return (
    <AuthProvider>
      <OrderProvider> {/* Obalíme celú aplikáciu OrderProviderom */}
        <SettingsProvider>
          <ServiceProvider>
            <EntrepreneurProvider>
              <Router>
                <Routes>
                  {/* Verejná stránka */}
                  <Route path="/" element={<HlavnaStranka />} />

                  {/* Login stránka */}
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <OrdersCustomer />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <UserSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/entrepreneur/:id"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <EntrepreneurDetailPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Obalenie stránok s objednávkami do OrderProvider */}
                  <Route
                    path="/business/orders/*"
                    element={
                      <ProtectedRoute requiredRole="business">
                        <Routes>
                          <Route path="confirm" element={<ConfirmOrders />} />
                          <Route path="pending" element={<PendingOrders />} />
                          <Route path="completed" element={<CompletedOrders />} />
                          <Route path="waiting" element={<WaitingOrders />} />
                        </Routes>
                      </ProtectedRoute>
                    }
                  />

                  {/* Ostatné chránené stránky */}
                  <Route
                    path="/business/profile/*"
                    element={
                      <ProtectedRoute requiredRole="business">
                        <Routes>
                          <Route path='portfolio' element={<PortfolioSettings />} />
                          <Route path='services' element={<ManageServices />} />
                        </Routes>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/business/profile/edit"
                    element={
                      <ProtectedRoute requiredRole="business">
                        <EditProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/business/profile/appointments"
                    element={
                      <ProtectedRoute requiredRole="business">
                        <ManageAppointments />
                      </ProtectedRoute>
                    }
                  />

                  {/* Settings Route */}
                  <Route
                    path="/business/settings"
                    element={
                      <ProtectedRoute requiredRole="business">
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </EntrepreneurProvider>
          </ServiceProvider>
        </SettingsProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
