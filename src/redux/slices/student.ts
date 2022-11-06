import { createSlice } from '@reduxjs/toolkit';

import { manageStudent } from '_apis_/student';

import { dispatch } from '../store';
// utils

import { Student } from '../../@types/student';

// ----------------------------------------------------------------------

type StudentState = {
  isLoading: boolean;
  error: boolean;
  studentList: Student[];
};

const initialState: StudentState = {
  isLoading: false,
  error: false,
  studentList: []
};

const slice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LIST student

    getListStudent(state, action) {
      state.isLoading = false;
      state.studentList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list student
export function getListStudent() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageStudent.getListStudent().then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getListStudent(response.data.items));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
