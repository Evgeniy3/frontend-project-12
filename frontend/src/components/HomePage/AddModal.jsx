/* eslint-disable no-undef */
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';

const AddModal = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const soc = useSocket();
  const [formValid, setFormValid] = useState(true);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const ChannelValidate = yup.object().shape({
    nameChannel: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(namesChannels, 'Уникальное имя'),
  });
  return (
    <Formik
      initialValues={
      {
        nameChannel: '',
      }
  }
      validationSchema={ChannelValidate}
      onSubmit={async (values) => {
      // eslint-disable-next-line no-empty
        try {
          await setFormValid(true);
          const newChannel = {
            id: _.uniqueId(), name: values.nameChannel, author: auth.getUserName(), removable: true,
          };
          soc.addNewChannel(newChannel);
          dispatch(closeModal());
        } catch (err) {
          setFormValid(false);
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
          <Modal centered show onHide={() => dispatch(closeModal())}>
            <Modal.Header closeButton>
              <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className={formValid ? 'form-control mb-2' : 'form-control is-invalid mb-2'}
                type="nameChannel"
                name="nameChannel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameChannel}
                placeholder="Имя канала"
              />
              {errors.nameChannel && touched.nameChannel && errors.nameChannel}
              <div className="d-flex justify-content-end">
                <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary" disabled={isSubmitting}>
                  Отменить
                </Button>
                <Button onClick={handleSubmit} type="submit" variant="primary" disabled={isSubmitting}>
                  Отправить
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default AddModal;
