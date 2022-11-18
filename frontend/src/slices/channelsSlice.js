/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const getData = createAsyncThunk('channels/getData', async (payload) => {
  const res = await axios.get(routes.usersPath(), { headers: payload });
  return res.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannelID: (state, { payload }) => { state.currentChannel = payload; },
    AddChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannel === payload.id) {
        state.currentChannel = 1;
      }
      channelsAdapter.removeOne(state, payload.id);
      // eslint-disable-next-line no-debugger
      // debugger;
    },
    renameChannel: (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id,
      changes: { name: payload.name },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannel = currentChannelId;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);
export const getActiveChannel = (state) => state.channels.currentChannel;

export const {
  AddChannel, removeChannel, renameChannel, changeChannelID,
} = channelsSlice.actions;
export default channelsSlice.reducer;
