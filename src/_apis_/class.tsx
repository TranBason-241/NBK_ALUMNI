import axios from 'axios';

export class ClassManger {
  // get list class
  getListClass = (studentId = '') =>
    axios
      .get(`api/v1/classes/get-class-students?`, {
        params: {
          // page_size: p_size,
          // page_number: p_number
          StudentId: studentId
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
export const manaClass = new ClassManger();
