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
};

const initialState: NewState = {
  isLoading: false,
  error: false,
  classList: []
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

// // get list new
// export function getNewDetail(newId: string) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       manageNew.getNewById(newId).then((response) => {
//         // console.log(response);
//         if (response.status == 200) {
//           dispatch(slice.actions.getNewDetail(response.data));
//           console.log(response.data);
//         }
//       });
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       console.log(error);
//     }
//   };
// }
