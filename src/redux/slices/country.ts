import { createSlice } from '@reduxjs/toolkit';

import { manageCountry } from '_apis_/country';

import { dispatch } from '../store';
// utils

import { Country } from '../../@types/country';

// ----------------------------------------------------------------------

type CountryState = {
  isLoading: boolean;
  error: boolean;
  countryList: Country[];
};

const initialState: CountryState = {
  isLoading: false,
  error: false,
  countryList: []
};

const slice = createSlice({
  name: 'country',
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

    // GET LIST country

    getCountryList(state, action) {
      state.isLoading = false;
      state.countryList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list country
export function getCountryList(p_size: number, p_number: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageCountry.getListCountry(p_size, p_number).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getCountryList(response.data.items));
          console.log(response.data.items);
        } else {
          dispatch(slice.actions.getCountryList([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.getCountryList([]));
      dispatch(slice.actions.hasError(error));
    }
  };
}
