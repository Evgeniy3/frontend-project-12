import { Navigate } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Дом</h1>
    <p><Navigate to="/login" /></p>
  </div>
);

export default HomePage;
