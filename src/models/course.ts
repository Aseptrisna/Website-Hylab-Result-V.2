export interface Course {
  _id: number;
  data: CourseData;
}

export interface CourseData {
  course: number;
  courseName: string;
  isSelected: boolean;
}
