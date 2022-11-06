/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToastify } from '../../contexts/ToastifyContext';

const AddModal = () => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const soc = useSocket();
  const [formValid, setFormValid] = useState(true);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const ChannelValidate = yup.object().shape({
    nameChannel: yup
      .string()
      .required(t('modal.required'))
      .min(3, t('modal.nameLenght'))
      .max(20, t('modal.nameLenght'))
      .notOneOf(namesChannels, t('modal.duplicate')),
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
          successToast(t('addChannelToast'));
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
              <Modal.Title>{t('modal.addChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className={formValid ? 'form-control mb-2' : 'form-control is-invalid mb-2'}
                type="nameChannel"
                name="nameChannel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameChannel}
                placeholder={t('modal.name')}
              />
              {errors.nameChannel && touched.nameChannel && errors.nameChannel}
              <div className="d-flex justify-content-end">
                <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary" disabled={isSubmitting}>
                  {t('modal.cancelButton')}
                </Button>
                <Button onClick={handleSubmit} type="submit" variant="primary" disabled={isSubmitting}>
                  {t('modal.addButton')}
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
