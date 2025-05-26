export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  department: string;
  performanceRating: number;
  projects?: Project[];
  feedbacks?: Feedback[];
}

export interface Project {
  id: number;
  name: string;
  status: 'in-progress' | 'completed' | 'planned';
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Feedback {
  id: number;
  date: string;
  reviewer: string;
  rating: number;
  comment: string;
}

export interface DepartmentPerformance {
  department: string;
  averageRating: number;
  employeeCount: number;
}

export type Tab = 'overview' | 'projects' | 'feedback';