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
  ClassStudentList: Student[];
  totalCount: number;
};

const initialState: StudentState = {
  isLoading: false,
  error: false,
  studentList: [],
  ClassStudentList: [],
  totalCount: 0
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
    },

    // GET TOTAL COUNT OF LIST ALL S
    getTotalCount(state, action) {
      state.isLoading = false;
      state.totalCount = action.payload;
    },

    // GET LIST Teacher all

    getListStudentByClassId(state, action) {
      state.isLoading = false;
      state.ClassStudentList = action.payload;
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

// get list student of class
export function getListStudentByClassId(classId: string, p_size: number, p_number: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageStudent.getListStudentByClassId(classId, p_size, p_number).then((response) => {
        if (response.status == 200) {
          dispatch(slice.actions.getListStudentByClassId(response.data.items));
          dispatch(slice.actions.getTotalCount(response.data.metaData.totalCount));
        } else {
          dispatch(slice.actions.getListStudentByClassId([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.getListStudentByClassId([]));
    }
  };
}
