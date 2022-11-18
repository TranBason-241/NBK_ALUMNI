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

  // get list class by year and grade
  getListClassByYear = (year = '', grade = '') =>
    axios
      .get(`/api/v1/classes/`, {
        params: {
          Year: year,
          Grade: grade
        }
      })
      .then((res) => res)
      .catch((err) => err);

  // get class by id

  getClassById = (classId: string) =>
    axios
      .get(`/api/v1/classes/${classId}`)
      .then((res) => res)
      .catch((err) => err);

  // update class for student
  updateClassOfStudent = (data: any) =>
    axios
      .put(`/api/v1/student-classes`, data)
      .then((res) => res)
      .catch((err) => err);

  // add class for student
  addClassOfStudent = (data: any) =>
    axios
      .post(`/api/v1/student-classes`, data)
      .then((res) => res)
      .catch((err) => err);
}
export const manaClass = new ClassManger();
