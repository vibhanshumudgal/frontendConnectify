import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSilce.js';
import ConnectionSlice from './Connections.js';
import InvitationSlice from './InvitationSlice.js'
const appstore = configureStore({
  reducer: {
    conn_data : ConnectionSlice,
    user: userSlice,
    request : InvitationSlice
  },
});

export default appstore;
