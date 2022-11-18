import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { manaClass } from '_apis_/class';
import { dispatch } from '../store';
// utils

import { Class } from '../../@types/class';

// ----------------------------------------------------------------------

type NewState = {
  isLoading: boolean;
  error: boolean;
  classList: Class[];
  classListOption: Class[];
  class: Class;
};

const initialState: NewState = {
  isLoading: false,
  error: false,
  classList: [],
  classListOption: [],
  class: {
    id: '',
    name: '',
    classGroupId: 'String',
    grade: '',
    year: '',
    positionName: '',
    teacherName: '',
    quantity: 0
  }
};

const slice = createSlice({
  name: 'class',
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

    // GET LIST CLASS

    getListClass(state, action) {
      state.isLoading = false;
      state.classList = action.payload;
    },

    // GET LIST Option

    getListClassByYear(state, action) {
      state.isLoading = false;
      state.classListOption = action.payload;
    },

    // GET ClASS BY ID

    getClassById(state, action) {
      state.isLoading = false;
      state.class = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list new
export function getListClass(studentId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manaClass.getListClass(studentId).then((response) => {
        if (response.status == 200) {
          dispatch(slice.actions.getListClass(response.data.items));
          console.log(response.data.items);
        } else {
          dispatch(slice.actions.getListClass([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getListClassByYear(year: string, grade: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manaClass.getListClassByYear(year, grade).then((response) => {
        if (response.status == 200) {
          dispatch(slice.actions.getListClassByYear(response.data.items));
          console.log(response.data.items);
        } else {
          dispatch(slice.actions.getListClassByYear([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.getListClassByYear([]));
      dispatch(slice.actions.hasError(error));
    }
  };
}

// get list new
export function getClassDetail(classId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manaClass.getClassById(classId).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getClassById(response.data));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
