import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import App from './App';
import store from './slices/store';
import { AddMessage } from './slices/messageSlice';
import { AddChannel, removeChannel, renameChannel } from './slices/channelsSlice';

const initApp = (socket) => {
  socket.on('newMessage', (messageWithId) => {
    store.dispatch(AddMessage(messageWithId));
  });
  socket.on('newChannel', (channelWithId) => {
    store.dispatch(AddChannel(channelWithId));
  });
  socket.on('removeChannel', (channelWithId) => {
    store.dispatch(removeChannel(channelWithId));
  });
  socket.on('renameChannel', (channelWithId) => {
    store.dispatch(renameChannel(channelWithId));
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App socket={socket} />
      </BrowserRouter>
    </Provider>
  );
};

const init = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const project = await initApp(socket);
  root.render(<React.StrictMode>{project}</React.StrictMode>);
};

init();
