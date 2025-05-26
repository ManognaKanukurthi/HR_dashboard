"use client";

import { useEffect, useState } from 'react';
import { EmployeeCard } from '@/components/EmployeeCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterDropdown } from '@/components/FilterDropdown';
import { Employee } from '@/lib/types';
import { getEmployees } from '@/lib/api';
import { useSearch } from '@/hooks/useSearch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    searchTerm,
    setSearchTerm, 
    selectedDepartments, 
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filterEmployees 
  } = useSearch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to load employees. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const filteredEmployees = filterEmployees(employees);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          className="flex-1" 
        />
        <FilterDropdown 
          selectedDepartments={selectedDepartments}
          onDepartmentChange={setSelectedDepartments}
          selectedRatings={selectedRatings}
          onRatingChange={setSelectedRatings}
        />
      </div>
      
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {isLoading 
              ? "Loading employees..." 
              : "No employees found matching your search criteria."}
          </p>
          {!isLoading && searchTerm && (
            <button
              className="mt-4 text-sm text-primary hover:underline"
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartments([]);
                setSelectedRatings([]);
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}