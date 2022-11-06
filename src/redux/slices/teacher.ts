import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { manageNew } from '_apis_/new';
import { manageTeacher } from '_apis_/teacher';
import { New } from '../../@types/new';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { Teacher } from '../../@types/teacher';

// ----------------------------------------------------------------------

type TeacherState = {
  isLoading: boolean;
  error: boolean;
  teacherList: Teacher[];
  headMasterList: Teacher[];
};

const initialState: TeacherState = {
  isLoading: false,
  error: false,
  teacherList: [],
  headMasterList: []
};

const slice = createSlice({
  name: 'teacher',
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

    // GET LIST Teacher

    getListTeacher(state, action) {
      state.isLoading = false;
      state.teacherList = action.payload;
    },

    // GET LIST HeadMaster

    getListHeadMaster(state, action) {
      state.isLoading = false;
      state.headMasterList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list new
export function getListTeacher() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageTeacher.getListTeacher().then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getListTeacher(response.data.items));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getListHeadMaster() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageTeacher.getListHeadMaster().then((response) => {
        if (response.status == 200) {
          dispatch(slice.actions.getListHeadMaster(response.data.items));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
