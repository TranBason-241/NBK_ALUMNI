import axios from 'axios';

export class NewManager {
  // get list new
  getListNew = (catetoryId = '') =>
    axios
      .get(`api/v1/news/`, {
        params: {
          // page_size: p_size,
          // page_number: p_number
          SchoolId: 1,
          CategoryId: catetoryId
        }
      })
      .then((res) => res)
      .catch((err) => err);
  // get new by id

  getNewById = (newID: string) =>
    axios
      .get(`/api/v1/news/${newID}`)
      .then((res) => res)
      .catch((err) => err);
}
export const manageNew = new NewManager();
