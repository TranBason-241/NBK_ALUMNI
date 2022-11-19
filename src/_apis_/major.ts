import axios from 'axios';

export class MajorManager {
  // get list major
  getListMajor = (p_size: number, p_number: number) =>
    axios
      .get(`/api/v1/majors`, {
        params: {
          page_size: p_size,
          page_number: p_number + 1
        }
      })
      .then((res) => res)
      .catch((err) => err);
}
export const manageMajor = new MajorManager();
