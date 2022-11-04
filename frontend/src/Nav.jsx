import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';

const Nav = () => {
  const auth = useAuth;
  const { loggedIn, logOut } = auth;
  return (
    <Navbar className="shadow-sm navbar navbar-light">
      <Container className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {loggedIn ? <Button onClick={() => logOut()} className="btn-primary">Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
