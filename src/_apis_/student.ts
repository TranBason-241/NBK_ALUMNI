import axios from 'axios';

export class StudentManager {
  // get list student
  getListStudent = () =>
    axios
      .get(`/api/v1/students`)
      .then((res) => res)
      .catch((err) => err);
}
export const manageStudent = new StudentManager();
