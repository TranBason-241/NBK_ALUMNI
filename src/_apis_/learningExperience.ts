import axios from 'axios';

export class LearningExperienceManager {
  // get list learning experience
  getListLearningExperience = (studentId: string) =>
    axios
      .get(`/api/v1/learning-experiences`, {
        params: {
          StudentId: studentId
        }
      })
      .then((res) => res)
      .catch((err) => err);

  // Update learning experience
  updateLearningExperience = (value: any) => {
    const data = {
      Id: parseInt(value?.id, 10),
      StudentId: parseInt(value?.studentId, 10),
      CountryId: value?.countryId,
      Degree: value?.degree,
      NameOfUniversity: value?.nameOfUniversity,
      FromTime: value?.fromTime,
      ToTime: value?.toTime
    };

    return axios
      .put('api/v1/learning-experiences', data)
      .then((response) => response)
      .catch((err) => err);
  };

  // Create learning experience
  createLearningExperience = (value: any) => {
    const data = {
      StudentId: parseInt(value?.studentId, 10),
      CountryId: value?.countryId,
      Degree: value?.degree,
      NameOfUniversity: value?.nameOfUniversity,
      FromTime: value?.fromTime,
      ToTime: value?.toTime
    };

    return axios
      .post('api/v1/learning-experiences', data)
      .then((response) => response)
      .catch((err) => err);
  };
}
export const manageLearningExperience = new LearningExperienceManager();
