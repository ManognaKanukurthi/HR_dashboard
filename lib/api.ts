import { getDepartmentForUser, getRandomRating, generateMockProjects, generateMockFeedback } from './utils';
import { Employee } from './types';

export async function getEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=20');
    
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    
    const data = await response.json();
    
    // Enhance the data with our custom fields
    const enhancedUsers = data.users.map((user: any) => ({
      ...user,
      department: getDepartmentForUser(user.id),
      performanceRating: getRandomRating(user.id)
    }));
    
    return enhancedUsers;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export async function getEmployeeById(id: number): Promise<Employee | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with id ${id}`);
    }
    
    const user = await response.json();
    
    // Enhance with our custom fields
    const enhancedUser = {
      ...user,
      department: getDepartmentForUser(user.id),
      performanceRating: getRandomRating(user.id),
      projects: generateMockProjects(user.id),
      feedbacks: generateMockFeedback(user.id)
    };
    
    return enhancedUser;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    return null;
  }
}