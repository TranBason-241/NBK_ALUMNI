import axios from 'axios';

export class StudentManager {
  // get list student
  getListStudent = () =>
    axios
      .get(`/api/v1/students`)
      .then((res) => res)
      .catch((err) => err);

  // get list student
  getListStudentByClassId = (classId: string, p_size: number, p_number: number) =>
    axios
      .get(`api/v1/teachers`, {
        params: {
          classId,
          page_size: p_size,
          page_number: p_number
        }
      })
      .then((res) => res)
      .catch((err) => err);
}
export const manageStudent = new StudentManager();
