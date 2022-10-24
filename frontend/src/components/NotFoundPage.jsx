import Image from 'react-bootstrap/Image';
import imageNotFound from '../assets/404-page.svg';

const NotFoundPage = () => (
  <div className="text-center">
    <Image alt="Страница не найдена" className="img-fluid h-25" src={imageNotFound} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href="/"> на главную страницу</a>
    </p>
  </div>
);

export default NotFoundPage;
