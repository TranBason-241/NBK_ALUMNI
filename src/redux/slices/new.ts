import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { manageNew } from '_apis_/new';
import { New } from '../../@types/new';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type GardenState = {
  isLoading: boolean;
  error: boolean;
  newList: New[];
};

const initialState: GardenState = {
  isLoading: false,
  error: false,
  newList: []
};

const slice = createSlice({
  name: 'new',
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

    // GET LIST NEW

    getListNew(state, action) {
      state.isLoading = false;
      state.newList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get new
export function getListNew() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      manageNew.getListNew().then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getListNew(response.data.items));
          console.log(response.data.items);
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}
