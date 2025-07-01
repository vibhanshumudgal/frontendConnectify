import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "conn_data",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
       
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
