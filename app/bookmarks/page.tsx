"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Employee } from '@/lib/types';
import { EmployeeCard } from '@/components/EmployeeCard';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { getEmployees } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarkedEmployees } = useBookmarks();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const allEmployees = await getEmployees();
        setEmployees(allEmployees);
        setError(null);
      } catch (err) {
        setError('Failed to load bookmarked employees');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  const bookmarkedEmployeesList = employees.filter(emp => 
    bookmarkedEmployees.includes(emp.id)
  );
  
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Bookmarked Employees</h1>
        <p className="text-muted-foreground">
          View and manage your bookmarked employees.
        </p>
      </section>
      
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-[100px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : bookmarkedEmployeesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedEmployeesList.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <p className="text-xl text-muted-foreground">You haven't bookmarked any employees yet.</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}