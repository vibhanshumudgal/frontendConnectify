import { createSlice } from "@reduxjs/toolkit";

const InvitationSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const remove_id = action.payload;
      return state.filter((r) => r._id !== remove_id); // Return the new state
    },
    removeRequestFull: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest,removeRequestFull } = InvitationSlice.actions;
export default InvitationSlice.reducer;
