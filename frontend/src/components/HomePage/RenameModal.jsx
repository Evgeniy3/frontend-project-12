import {
  React, useState,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/SocketContext';

const RenameModal = () => {
  const dispatch = useDispatch();
  const soc = useSocket();
  const { item } = useSelector((store) => store.modal);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const currentChannel = allChannels.find((it) => it.id === item);
  const { id, name } = currentChannel;
  const [formValid, setFormValid] = useState(true);
  const validateRename = yup.object().shape({
    renameChannel: yup
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
        renameChannel: name,
      }
  }
      validationSchema={validateRename}
      onSubmit={(values) => {
      // eslint-disable-next-line no-empty
        try {
          const { renameChannel } = values;
          soc.fnRenameChannel({ id, name: renameChannel });
          setFormValid(true);
          dispatch(closeModal());
        } catch (err) {
          setFormValid(false);
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
              <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className={formValid ? 'form-control mb-2' : 'form-control is-invalid mb-2'}
                type="renameChannel"
                name="renameChannel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.renameChannel}
                placeholder="Имя канала"
              />
              {errors.renameChannel && touched.renameChannel && errors.renameChannel}
              <div className="d-flex justify-content-end">
                <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary" disabled={isSubmitting}>
                  Отменить
                </Button>
                <Button onClick={handleSubmit} type="submit" variant="primary" disabled={isSubmitting}>
                  Переименовать
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default RenameModal;
