/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  React,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext.jsx';

const LoginPage = () => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
  });
  const navigate = useNavigate();
  const authUser = useAuth();
  return (
    <Formik
      initialValues={
    {
      username: '',
      password: '',
    }
}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        // eslint-disable-next-line no-empty
        try {
          const res = await axios.post(routes.loginPath(), values);
          authUser.logIn(res.data);
          console.log(res.data);
          navigate('/');
        } catch (err) {
          if (err.response.status === 401) {
            console.log(err);
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="Ваш ник"
            />
            <label htmlFor="username">Ваш ник</label>
            {errors.username && touched.username && errors.username}
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              autoComplete="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Пароль"
            />
            <label className="form-label" htmlFor="password">Пароль</label>
            {errors.password && touched.password && errors.password}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
            Войти
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;
