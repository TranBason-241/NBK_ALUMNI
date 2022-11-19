import { createSlice } from '@reduxjs/toolkit';

import { manageMajor } from '_apis_/major';

import { dispatch } from '../store';
// utils
import { major } from '../../@types/major';

// ----------------------------------------------------------------------

type CountryState = {
  isLoading: boolean;
  error: boolean;
  majorList: major[];
};

const initialState: CountryState = {
  isLoading: false,
  error: false,
  majorList: []
};

const slice = createSlice({
  name: 'major',
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

    // GET LIST major

    getMajorList(state, action) {
      state.isLoading = false;
      state.majorList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list country
export function getMajorList(p_size: number, p_number: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageMajor.getListMajor(p_size, p_number).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getMajorList(response.data.items));
        } else {
          dispatch(slice.actions.getMajorList([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.getMajorList([]));
      dispatch(slice.actions.hasError(error));
    }
  };
}
