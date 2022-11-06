/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToastify } from '../../contexts/ToastifyContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const { errorToast } = useToastify();
  const SignupSchema = yup.object().shape({
    username: yup.string().required(t('loginPage.required')),
    password: yup.string().required(t('loginPage.required')),
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
            console.log('ошибка 401');
          } else if (err.message === 'Network Error') {
            errorToast(t('errorNetwork'));
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
          <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder={t('loginPage.username')}
            />
            <label htmlFor="username">{t('loginPage.username')}</label>
            {errors.username && touched.username && errors.username}
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              autoComplete="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder={t('loginPage.password')}
            />
            <label className="form-label" htmlFor="password">{t('loginPage.password')}</label>
            {errors.password && touched.password && errors.password}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
            {t('loginPage.enter')}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
