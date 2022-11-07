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

  // get class by id

  getClassById = (classId: string) =>
    axios
      .get(`/api/v1/news/${classId}`)
      .then((res) => res)
      .catch((err) => err);
}
export const manaClass = new ClassManger();
