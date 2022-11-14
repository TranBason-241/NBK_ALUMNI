import { LearningExperience } from './learningExperiencce';
import { WorkExperience } from './workExperience';

export type Student = {
  id: string;
  name: string;
  dateOfBirth: string;
  cityId: string;
  imageUrl: string;
  email: string;
  phone: string;
  startTime: string;
  endTime: string;
  // thêm
  isAlive: string;
  classId: string;
  positionId: string;
  cityName: string;
  learningExperiences: LearningExperience[];
  workExperiences: WorkExperience[];
};
