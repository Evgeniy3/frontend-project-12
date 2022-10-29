/* eslint-disable no-undef */
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../slices/modalSlice';
import {
  toggleCurrentChannel, selectEntitiesChannels,
  selectIdCurrentChannel, selectIdsChannels,
} from '../../slices/channelsSlice';

const Channels = () => {
  const channels = useSelector(selectEntitiesChannels);
  const ids = useSelector(selectIdsChannels);
  const idCurrentChanndel = useSelector(selectIdCurrentChannel);
  const dispatch = useDispatch();

  const selectChannel = (id) => (e) => {
    dispatch(toggleCurrentChannel(id));
    e.target.blur();
  };
  const handleOpenModal = () => {
    dispatch(openModal({ type: 'add' }));
  };

  const items = ids.map((id) => {
    const { name: channelName, removable } = channels[id];
    const isSelected = id === idCurrentChanndel;
    const channelClass = cn('btn w-100 rounded-0 text-start text-truncate', { 'btn-secondary': isSelected });
    return (
      <li className="nav-item w-100" key={id}>
        { removable
          ? (
            <Dropdown as={ButtonGroup} className="d-flex">
              <button type="button" className={channelClass} onClick={selectChannel(id)}>
                <span className="me-1">#</span>
                {channelName}
              </button>
              <Dropdown.Toggle split variant={isSelected ? 'secondary' : 'btn-secondary'}>
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Remove', idChannel: id }))}>
                  Удалить
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Rename', idChannel: id }))}>
                  Переименовать
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : (
            <button type="button" className={channelClass} onClick={selectChannel(id)}>
              <span>{`# ${channelName}`}</span>
            </button>
          )}
      </li>
    );
  });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button onClick={handleOpenModal} type="button" variant="light" className="btn-plus p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        { items }
      </ul>
    </div>
  );
};

export default Channels;
