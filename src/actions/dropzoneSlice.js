import { createSlice } from '@reduxjs/toolkit';

const dropzoneSlice = createSlice({
  name: 'dropzone',
  initialState: {
    selectedFile: null
  },
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    }
  }
});

export const { setSelectedFile } = dropzoneSlice.actions;
export const selectedFileSelector = (state) => state.dropzone.selectedFile;
export default dropzoneSlice.reducer;