/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';

const Messages = () => {
  const textSchema = yup.object().shape({
    text: yup.string(),
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">2 сообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <div className="text-break mb-2">
            <b>qwe</b>
            :
            vsdfsdfsdf
          </div>
          <div className="text-break mb-2">
            <b>qwe</b>
            :
            dfgdfg
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={
      {
        text: '',
      }
  }
            validationSchema={textSchema}
            onSubmit={async () => {
            // eslint-disable-next-line no-empty
              try {
              } catch (err) {
                console.log(err);
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
              <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <input
                    className="border-0 p-0 ps-2 form-control"
                    type="text"
                    name="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                    placeholder="Введите сообщение..."
                  />
                  {errors.text && touched.text && errors.text}
                  <Button variant="light" type="submit" className="btn btn-group-vertical" disabled={isSubmitting}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
