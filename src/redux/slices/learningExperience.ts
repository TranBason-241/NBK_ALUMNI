import { createSlice } from '@reduxjs/toolkit';

import { manageLearningExperience } from '_apis_/learningExperience';

import { dispatch } from '../store';
// utils

import { LearningExperience } from '../../@types/learningExperiencce';

// ----------------------------------------------------------------------

type LearningExperienceState = {
  isLoading: boolean;
  error: boolean;
  LearningExperienceList: LearningExperience[];
  totalCount: number;
};

const initialState: LearningExperienceState = {
  isLoading: false,
  error: false,
  LearningExperienceList: [],
  totalCount: 0
};

const slice = createSlice({
  name: 'learningExperience',
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

    // GET LIST learning experience

    getLearningExperience(state, action) {
      state.isLoading = false;
      state.LearningExperienceList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteGarden, deleteGardenType, deleteSite } = slice.actions;

// ----------------------------------------------------------------------

// get list student
export function getLearningExperience(studentId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      manageLearningExperience.getListLearningExperience(studentId).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          dispatch(slice.actions.getLearningExperience(response.data.items));
        } else {
          dispatch(slice.actions.getLearningExperience([]));
        }
      });
    } catch (error) {
      dispatch(slice.actions.getLearningExperience([]));
      dispatch(slice.actions.hasError(error));
    }
  };
}
