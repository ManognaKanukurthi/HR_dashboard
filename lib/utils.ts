import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, DepartmentPerformance } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
  'Design',
  'Customer Support',
];

export function getDepartmentForUser(userId: number): string {
  // Deterministic department assignment based on user ID
  return departments[userId % departments.length];
}

export function getRandomRating(userId: number): number {
  // Deterministic but seemingly random rating between 1-5
  const seed = userId * 13 % 100;
  return Math.max(1, Math.min(5, Math.floor(seed / 20) + 1));
}

export function generateMockProjects(userId: number): any[] {
  const numberOfProjects = 2 + (userId % 4); // 2 to 5 projects
  const projects = [];
  
  for (let i = 1; i <= numberOfProjects; i++) {
    const seed = (userId * i) % 100;
    const status = seed < 30 ? 'completed' : seed < 80 ? 'in-progress' : 'planned';
    
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (i * 2));
    
    const endDate = status === 'completed' 
      ? new Date(startDate.getTime() + (Math.floor(seed / 10) * 30 * 24 * 60 * 60 * 1000)) 
      : undefined;
    
    projects.push({
      id: userId * 100 + i,
      name: `Project ${String.fromCharCode(65 + (seed % 26))}${i}`,
      status,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      description: `A ${status === 'completed' ? 'successful' : 'critical'} project that ${
        status === 'completed' 
          ? 'improved team efficiency by 30%' 
          : status === 'in-progress' 
            ? 'aims to streamline our core processes' 
            : 'will begin next quarter to enhance our capabilities'
      }`
    });
  }
  
  return projects;
}

export function generateMockFeedback(userId: number): any[] {
  const numberOfFeedbacks = 1 + (userId % 5); // 1 to 5 feedback items
  const feedbacks = [];
  
  for (let i = 1; i <= numberOfFeedbacks; i++) {
    const seed = (userId * i * 7) % 100;
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    const rating = Math.max(1, Math.min(5, Math.floor(seed / 20) + 1));
    
    feedbacks.push({
      id: userId * 100 + i,
      date: date.toISOString().split('T')[0],
      reviewer: `Manager ${String.fromCharCode(65 + ((seed + i) % 26))}`,
      rating,
      comment: rating > 3 
        ? `Excellent work on the recent project. Consistently meets or exceeds expectations.`
        : `Shows potential but needs improvement in communication and meeting deadlines.`
    });
  }
  
  return feedbacks;
}

export function getDepartmentAnalytics(employees: Employee[]): DepartmentPerformance[] {
  const departmentMap: Record<string, { total: number; count: number }> = {};
  
  // Calculate totals per department
  employees.forEach(employee => {
    if (!departmentMap[employee.department]) {
      departmentMap[employee.department] = { total: 0, count: 0 };
    }
    departmentMap[employee.department].total += employee.performanceRating;
    departmentMap[employee.department].count += 1;
  });
  
  // Convert to array of department performances
  return Object.entries(departmentMap).map(([department, data]) => ({
    department,
    averageRating: parseFloat((data.total / data.count).toFixed(1)),
    employeeCount: data.count
  }));
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 3.5) return 'text-emerald-500';
  if (rating >= 2.5) return 'text-yellow-500';
  if (rating >= 1.5) return 'text-orange-500';
  return 'text-red-500';
}

export function getRatingBgColor(rating: number): string {
  if (rating >= 4.5) return 'bg-green-100 text-green-800';
  if (rating >= 3.5) return 'bg-emerald-100 text-emerald-800';
  if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800';
  if (rating >= 1.5) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}