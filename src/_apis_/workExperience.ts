import axios from 'axios';

export class WorkExperienceManager {
  // get list work experience
  getListWorkExperience = (studentId: string, p_size: number, p_number: number) =>
    axios
      .get(`/api/v1/work-experiences`, {
        params: {
          StudentId: studentId,
          page_size: p_size,
          page_number: p_number
        }
      })
      .then((res) => res)
      .catch((err) => err);

  // Update Work experience
  updateWorkExperience = (value: any) => {
    return axios
      .put('api/v1/work-experiences', value)
      .then((response) => response)
      .catch((err) => err);
  };

  // Create Work experience
  createWorkExperience = (value: any) => {
    return axios
      .post('/api/v1/work-experiences', value)
      .then((response) => response)
      .catch((err) => err);
  };
}
export const manageWorkExperience = new WorkExperienceManager();
