import {
  Routes, Route,
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx';
import Nav from './Nav';

// const ChatRoute = ({ children }) => {
//   const auth = useAuth();
//   const location = useLocation();
//   return (
//     auth.loggedIn ? children : <Navigate to="login" state={{ from: location }} />
//   );
// };

// const LoggedInRouter = () => {
//   const auth = useAuth();
//   return auth.loggedIn ? <Navigate to="/" /> : <Outlet />;
// };

// eslint-disable-next-line react-hooks/rules-of-hooks
const App = ({ socket }) => (
  <div className="d-flex flex-column h-100">
    <SocketProvider value={{ socket }}>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </SocketProvider>
  </div>
);

export default App;
