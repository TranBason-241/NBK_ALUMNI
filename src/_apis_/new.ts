import axios from 'axios';

export class NewManager {
  // get list new
  getListNew = () =>
    axios
      .get('api/v1/news?SchoolId=1')
      .then((res) => res)
      .catch((err) => err);
  // get new by id

  getNewById = (newID: string) =>
    axios
      .get(`/api/v1/admin/gardens/${newID}`)
      .then((res) => res)
      .catch((err) => err);
}
export const manageNew = new NewManager();
