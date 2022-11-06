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
}
export const manageTeacher = new TeacherManager();
