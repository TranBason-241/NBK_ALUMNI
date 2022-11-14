import { createSlice } from '@reduxjs/toolkit';

import { manageWorkExperience } from '_apis_/workExperience';

import { dispatch } from '../store';
// utils

import { WorkExperience } from '../../@types/workExperience';

// ----------------------------------------------------------------------

type WorkExperienceState = {
  isLoading: boolean;
  error: boolean;
  workExperienceList: WorkExperience[];
  totalCount: number;
};

const initialState: WorkExperienceState = {
  isLoading: false,
  error: false,
  workExperienceList: [],
  totalCount: 0
};

const slice = createSlice({
  name: 'workExperience',
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

    // GET LIST work experience

    getWorkExperience(state, action) {
      state.isLoading = false;
      state.workExperienceList = action.payload;
    },

    // GET TOTAL COUNT
    getTotalCount(state, action) {
      state.isLoading = false;
      state.totalCount = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list work experience
export function getWorkExperience(studentId: string, p_size: number, p_number: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageWorkExperience.getListWorkExperience(studentId, p_size, p_number).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getWorkExperience(response.data.items));
          dispatch(slice.actions.getTotalCount(response.data.metaData.totalCount));
        } else {
          dispatch(slice.actions.getWorkExperience([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.getWorkExperience([]));
      dispatch(slice.actions.hasError(error));
    }
  };
}
