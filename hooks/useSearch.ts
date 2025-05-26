"use client";

import { useState, useCallback } from 'react';
import { Employee } from '@/lib/types';

interface UseSearchOptions {
  initialSearchTerm?: string;
  initialDepartments?: string[];
  initialRatings?: number[];
}

export function useSearch({
  initialSearchTerm = '',
  initialDepartments = [],
  initialRatings = []
}: UseSearchOptions = {}) {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(initialDepartments);
  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialRatings);
  
  const filterEmployees = useCallback((employees: Employee[]): Employee[] => {
    return employees.filter(employee => {
      // Filter by search term
      const searchMatch = searchTerm === '' || 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by department
      const departmentMatch = selectedDepartments.length === 0 || 
        selectedDepartments.includes(employee.department);
      
      // Filter by rating
      const ratingMatch = selectedRatings.length === 0 || 
        selectedRatings.includes(employee.performanceRating);
      
      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [searchTerm, selectedDepartments, selectedRatings]);
  
  return {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filterEmployees
  };
}