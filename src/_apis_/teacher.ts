import axios from 'axios';

export class TeacherManager {
  // get list teacher
  getListTeacher = () =>
    axios
      .get(`api/v1/teachers?SchoolId=1`)
      .then((res) => res)
      .catch((err) => err);

  // get list head master
  getListHeadMaster = () =>
    axios
      .get(`api/v1/teachers/get-teachers-in-school-by-position?SchoolId=1&PositionId=1`)
      .then((res) => res)
      .catch((err) => err);

  // get list of all teacher
  getListTeacherAll = (p_size: number, p_number: number) =>
    axios
      .get(`api/v1/teachers`, {
        params: {
          SchoolId: 1,
          page_size: p_size,
          page_number: p_number
        }
      })
      .then((res) => res)
      .catch((err) => err);
}
export const manageTeacher = new TeacherManager();
