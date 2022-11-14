import axios from 'axios';

export class MajorManager {
  // get list major
  getListMajor = () =>
    axios
      .get(`/api/v1/majors`)
      .then((res) => res)
      .catch((err) => err);
}
export const manageMajor = new MajorManager();
