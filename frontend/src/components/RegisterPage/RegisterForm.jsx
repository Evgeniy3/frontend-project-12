/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext.jsx';

const RegisterFrom = () => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
    password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string().required('Обязательное поле').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  });
  const navigate = useNavigate();
  const authUser = useAuth();
  return (
    <Formik
      initialValues={
    {
      username: '',
      password: '',
      confirmPassword: '',
    }
}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        // eslint-disable-next-line no-empty
        try {
          const res = await axios.post(routes.signupPath(), values);
          authUser.logIn(res.data);
          console.log(res.data);
          navigate('/');
        } catch (err) {
          if (err.response.status === 409) {
            console.log(err);
          }
          throw err;
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
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="Имя пользователя"
            />
            <label htmlFor="username">Имя пользователя</label>
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
          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="confirmPassword"
              name="confirmPassword"
              autoComplete="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              placeholder="Подтвердите пароль"
            />
            <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
            Зарегистрироваться
          </button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterFrom;
