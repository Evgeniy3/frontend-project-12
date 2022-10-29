import { Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext.jsx';

// eslint-disable-next-line react-hooks/rules-of-hooks
const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Navbar className="shadow-sm navbar navbar-light">
        <Container className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  </div>
);

export default App;
