import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { manageNew } from '_apis_/new';
import { New } from '../../@types/new';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type NewState = {
  isLoading: boolean;
  error: boolean;
  newList: New[];
  newDetail: New;
};

const initialState: NewState = {
  isLoading: false,
  error: false,
  newList: [],
  newDetail: {
    id: '',
    title: '',
    body: '',
    orderView: '',
    newsCategoryId: '',
    writingDate: '',
    thumbnail: ''
  }
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
    },

    // GET LIST NEW Detail

    getNewDetail(state, action) {
      state.isLoading = false;
      state.newDetail = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list new
export function getListNew(categoryId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      manageNew.getListNew(categoryId).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getListNew(response.data.items));
          console.log(response.data.items);
        } else {
          dispatch(slice.actions.getListNew([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}

// get list new
export function getNewDetail(newId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageNew.getNewById(newId).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getNewDetail(response.data));
          console.log(response.data);
        }
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}
