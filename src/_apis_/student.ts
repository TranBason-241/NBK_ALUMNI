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
      .get(`/api/v1/students/get-student-class`, {
        params: {
          classId,
          page_size: p_size,
          page_number: p_number
        }
      })
      .then((res) => res)
      .catch((err) => err);

  // get list student
  getStudentById = (studentId: string) =>
    axios
      .get(`/api/v1/students/${studentId}`)
      .then((res) => res)
      .catch((err) => err);

  // update Student
  updateStudent = (value: any) => {
    const data = {
      id: value.id,
      name: value.Name,
      dateOfBirth: value.DateOfBirth,
      imageUrl: value.ImageUrl,
      email: value.Email,
      phone: value.Phone,
      classId: value.ClassId,
      positionId: value.PositionId,
      cityName: value.CityName,
      learningExperiences: value.LearningExperiences,
      workExperiences: value.WorkExperiences
    };
    console.log(value.Name);
    return axios
      .put('/api/v1/students', value)
      .then((response) => response)
      .catch((err) => err);
  };
}
export const manageStudent = new StudentManager();
