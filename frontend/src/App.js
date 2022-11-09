import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import filter from 'leo-profanity';
import AppInit from './components/initApp';
import store from './slices/store';
import resources from './locales/index';
import { AddMessage } from './slices/messageSlice';
import { AddChannel, removeChannel, renameChannel } from './slices/channelsSlice';

const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const App = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

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

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AppInit socket={socket} />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default App;
